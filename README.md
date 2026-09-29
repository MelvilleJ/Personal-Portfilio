# 🌐 Personal Portfolio

This is my personal portfolio website built with **React.js** and styled with **Tailwind CSS**.  
It features smooth animations powered by **Framer Motion** and a small Node API that stores contact form messages in **PostgreSQL**.  

🚀 The goal of this project is to showcase my skills, experience, and projects in a modern, interactive, and automated way.

---

## ✨ Features

- ⚡ **React.js** – Component-based, fast, and scalable frontend.
- 🎨 **Framer Motion** – Smooth animations and transitions for an engaging user experience.
- 🗄️ **Contact API** – A tiny Node server saves form submissions to PostgreSQL.
- 📱 **Responsive Design** – Works seamlessly across desktop, tablet, and mobile.

---

## 🖼️ LIVE

Live Demo 👉 [me.mellylab.com](https://me.mellylab.com)

---

---

## 📬 Contact form API

The form posts to `/api/contact`, served by `server/index.js`, which writes to a `contact_messages` table (created automatically from `server/schema.sql`).

1. Copy `server/.env.example` to `server/.env` and fill in your Postgres connection (`PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`).
2. Run the API: `npm run server` (listens on `127.0.0.1:8787` by default).
3. Run the site: `npm run dev`. Vite proxies `/api` to the API.

In production, run `npm run server` on the web host and have the reverse proxy route `/api` to it (set `TRUST_PROXY=1` so the real client IP is recorded).

Read messages with:

```sql
SELECT created_at, name, email, message FROM contact_messages ORDER BY created_at DESC;
```
