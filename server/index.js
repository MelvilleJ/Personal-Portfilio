import http from "node:http";
import { readFile } from "node:fs/promises";
import pg from "pg";

const PORT = Number(process.env.PORT ?? 8787);
const HOST = process.env.HOST ?? "127.0.0.1";
// Only trust X-Forwarded-For when a reverse proxy sets it; otherwise clients could spoof their IP.
const TRUST_PROXY = process.env.TRUST_PROXY === "1";

const MAX_BODY_BYTES = 16 * 1024;
const LIMITS = { name: 120, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

// Connection settings come from the standard PGHOST/PGPORT/PGDATABASE/PGUSER/PGPASSWORD env vars.
const pool = new pg.Pool();

const schema = await readFile(new URL("./schema.sql", import.meta.url), "utf8");
await pool.query(schema);

const hits = new Map();
const rateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
};
setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) {
    if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(ip);
  }
}, RATE_WINDOW_MS).unref();

const send = (res, status, body) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
};

const readJson = (req) =>
  new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error("Body too large"), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(Object.assign(new Error("Invalid JSON"), { status: 400 }));
      }
    });
    req.on("error", reject);
  });

const clientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (TRUST_PROXY && typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket.remoteAddress ?? null;
};

function validate(body) {
  const fields = {};
  for (const key of Object.keys(LIMITS)) {
    const value = typeof body?.[key] === "string" ? body[key].trim() : "";
    if (!value) return { error: "Please fill out all fields." };
    if (value.length > LIMITS[key]) return { error: `Your ${key} is too long.` };
    fields[key] = value;
  }
  if (!EMAIL_RE.test(fields.email)) return { error: "Please enter a valid email address." };
  return { fields };
}

async function handleContact(req, res) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return send(res, 429, { error: "Too many messages. Please try again later." });
  }

  const body = await readJson(req);
  // Honeypot: real visitors never see this field, bots fill it in. Pretend it worked.
  if (body?.company) return send(res, 200, { ok: true });

  const { fields, error } = validate(body);
  if (error) return send(res, 400, { error });

  await pool.query(
    "INSERT INTO contact_messages (name, email, message, ip, user_agent) VALUES ($1, $2, $3, $4, $5)",
    [fields.name, fields.email, fields.message, ip, req.headers["user-agent"] ?? null]
  );
  send(res, 201, { ok: true });
}

const server = http.createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, "http://localhost");
    if (req.method === "POST" && pathname === "/api/contact") return await handleContact(req, res);
    if (req.method === "GET" && pathname === "/api/health") {
      await pool.query("SELECT 1");
      return send(res, 200, { ok: true });
    }
    send(res, 404, { error: "Not found" });
  } catch (err) {
    if (err.status) return send(res, err.status, { error: err.message });
    console.error(err);
    send(res, 500, { error: "Something went wrong. Please try again later." });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Contact API listening on http://${HOST}:${PORT}`);
});

const shutdown = () => server.close(() => pool.end().then(() => process.exit(0)));
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
