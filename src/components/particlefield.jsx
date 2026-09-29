import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import earthUrl from "../assets/earth/earth-blue-marble.jpg";

// ─── tuning ────────────────────────────────────────────────────────────────
const STAR_COUNT = 700;
const ARC_COUNT = 14;
const ARC_SEGMENTS = 80;
const PLANET_DIAMETER_VH = 62; // planet diameter as % of viewport height
const GLOBE_OFFSET_VH = 0; // + moves the globe up from the viewport centre
const SPIN_SPEED = 0.05; // rad/s
const PARALLAX_X = 0.14;
const PARALLAX_Y = 0.1;
const LAND_STRIDE = 4; // map sampling step (2048x1024 map → ~44k land points)
const OCEAN_EVERY = 4; // 1 in N ocean cells becomes a dim particle
const TRAVEL_SECONDS = 2.0; // per-particle formation travel time
const ARC_SPEED = [0.18, 0.4]; // pulse laps per second (min, max)
const TRINIDAD = { lat: 10.45, lon: -61.25 };
const BACK_ALPHA = 0.06; // far-hemisphere visibility, keeps the globe from flickering as it spins

// Scroll morph: 0 = globe, 1 = city. Completes once the target section's top
// has travelled MORPH_SPAN viewport heights.
const MORPH_SPAN = 0.8;
const MORPH_STAGGER = 0.4; // spread of per-particle start times within the morph
const MORPH_SMOOTHING = 6; // higher = follows scroll more tightly
// The skyline doesn't hold up on narrow screens; keep in sync with the canvas's md:sticky.
const MORPH_MEDIA = "(min-width: 768px)";

// City skyline in normalised view coordinates (-1..1 on both axes).
// Ground sits just inside the bottom edge so the line's sprites aren't clipped.
const CITY_GROUND = -0.995;
const CITY_TOP = -0.25;
const WIN_COL = 0.014;
const WIN_ROW = 0.028;
const CITY_SEED = 1868;
const TEXT_AVOID_ALPHA = 0.1; // city visibility behind [data-particle-avoid] elements
const TEXT_AVOID_FEATHER = 40; // css px of soft edge around those elements

const BRAND = {
  land: new THREE.Color("#7ae582"),
  landAlt: new THREE.Color("#8fb0e8"),
  ocean: new THREE.Color("#5d84c4"),
  coreTint: new THREE.Color("#4a5d92"),
  arc: new THREE.Color("#7ae582"),
  star: new THREE.Color("#9fb6e4"),
  marker: new THREE.Color("#f5d76e"),
  window: new THREE.Color("#ffd36b"),
};

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const smoothstep = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Seeded so the skyline is the same on every visit.
function mulberry32(seed) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Soft circular sprite for all points.
function makeDotTexture(size = 10) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

function randomDir(out) {
  const u = Math.random() * 2 - 1;
  const t = Math.random() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  return out.set(s * Math.cos(t), u, s * Math.sin(t));
}

// Must match the projection used in sampleEarth.
function latLonToDir(latDeg, lonDeg) {
  const lat = THREE.MathUtils.degToRad(latDeg);
  const lon = THREE.MathUtils.degToRad(lonDeg);
  const cl = Math.cos(lat);
  return new THREE.Vector3(cl * Math.sin(lon), Math.sin(lat), cl * Math.cos(lon));
}

// Sample the equirectangular map: land pixels become bright particles,
// a sparse subset of ocean pixels become dim ones.
// Returns flat [x, y, z, ...] arrays of unit directions (north = +Y,
// Greenwich facing +Z so Africa/Europe are visible on load).
function sampleEarth(img) {
  const w = img.width;
  const h = img.height;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const px = ctx.getImageData(0, 0, w, h).data;

  const land = [];
  const ocean = [];
  for (let iy = 0, y = 0; y < h; y += LAND_STRIDE, iy++) {
    for (let ix = 0, x = 0; x < w; x += LAND_STRIDE, ix++) {
      const i = (y * w + x) * 4;
      const r = px[i];
      const g = px[i + 1];
      const b = px[i + 2];
      // Blue Marble: ocean is strongly blue-dominant; land is not.
      const isLand = r > b - 25 && g > b * 0.55;
      const lon = ((x / w) * 2 - 1) * Math.PI;
      const lat = (0.5 - y / h) * Math.PI;
      const cl = Math.cos(lat);
      const dx = cl * Math.sin(lon);
      const dy = Math.sin(lat);
      const dz = cl * Math.cos(lon);
      if (isLand) {
        land.push(dx, dy, dz);
      } else if ((ix * 7 + iy * 13) % OCEAN_EVERY === 0) {
        ocean.push(dx, dy, dz);
      }
    }
  }
  return { land, ocean };
}

// ─── city skyline ──────────────────────────────────────────────────────────
function buildSkyline(rand) {
  const span = CITY_TOP - CITY_GROUND;
  const layers = [
    { z: -0.35, dim: 0.45, h: [0.35, 1.0], w: [0.07, 0.14], gap: 0.01 },
    { z: 0, dim: 1, h: [0.15, 0.6], w: [0.05, 0.11], gap: 0.03 },
  ];
  const buildings = [];
  for (const L of layers) {
    let x = -1.08 + rand() * 0.05;
    while (x < 1.08) {
      const w = L.w[0] + rand() * (L.w[1] - L.w[0]);
      const h = (L.h[0] + rand() * (L.h[1] - L.h[0])) * span;
      const b = {
        x0: x,
        x1: x + w,
        y0: CITY_GROUND,
        y1: CITY_GROUND + h,
        z: L.z,
        dim: L.dim,
        spire: rand() < 0.2 ? h * 0.18 : 0,
        windows: [],
      };
      for (let wy = b.y0 + WIN_ROW; wy < b.y1 - WIN_ROW * 0.5; wy += WIN_ROW) {
        for (let wx = b.x0 + WIN_COL * 0.75; wx < b.x1 - WIN_COL * 0.5; wx += WIN_COL) {
          if (rand() < 0.7) b.windows.push(wx, wy, rand());
        }
      }
      buildings.push(b);
      x += w + L.gap * rand();
    }
  }
  return buildings;
}

function weightedPicker(items, weightOf, rand) {
  const cum = [];
  let total = 0;
  for (const it of items) {
    total += weightOf(it);
    cum.push(total);
  }
  return () => {
    const r = rand() * total;
    let lo = 0;
    let hi = cum.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] < r) lo = mid + 1;
      else hi = mid;
    }
    return items[lo];
  };
}

// Returns [x, y, z, brightness] per particle, plus a per-particle window seed
// (-1 when the particle isn't part of a window). "structure" (bright land particles)
// draws outlines, lit windows and the ground line; "fill" (dim ocean particles)
// shades building bodies and a low haze along the ground.
function sampleCity(buildings, n, kind, rand) {
  const out = new Float32Array(n * 4);
  const win = new Float32Array(n).fill(-1);
  const edgeLen = (b) => 2 * (b.y1 - b.y0) + (b.x1 - b.x0) + b.spire;
  const byEdge = weightedPicker(buildings, edgeLen, rand);
  const byWindows = weightedPicker(buildings, (b) => b.windows.length / 3, rand);
  const byArea = weightedPicker(buildings, (b) => (b.x1 - b.x0) * (b.y1 - b.y0), rand);
  const jitter = () => (rand() - 0.5) * 0.003;

  for (let i = 0; i < n; i++) {
    let x;
    let y;
    let z = 0;
    let bright;
    const r = rand();
    if (kind === "structure" && r < 0.5) {
      const b = byEdge();
      const h = b.y1 - b.y0;
      const w = b.x1 - b.x0;
      let d = rand() * edgeLen(b);
      if (d < h) {
        x = b.x0;
        y = b.y0 + d;
      } else if ((d -= h) < w) {
        x = b.x0 + d;
        y = b.y1;
      } else if ((d -= w) < h) {
        x = b.x1;
        y = b.y0 + d;
      } else {
        x = (b.x0 + b.x1) / 2;
        y = b.y1 + (d - h);
      }
      z = b.z;
      bright = 0.85 * b.dim;
    } else if (kind === "structure" && r < 0.9) {
      const b = byWindows();
      const k = ((rand() * b.windows.length) / 3) | 0;
      x = b.windows[k * 3];
      y = b.windows[k * 3 + 1];
      win[i] = b.windows[k * 3 + 2];
      z = b.z;
      bright = 0.8 * b.dim;
    } else if (kind === "structure") {
      x = rand() * 2.2 - 1.1;
      y = CITY_GROUND;
      bright = 0.7;
    } else if (r < 0.75) {
      const b = byArea();
      x = b.x0 + rand() * (b.x1 - b.x0);
      y = b.y0 + rand() * (b.y1 - b.y0);
      z = b.z;
      bright = 0.5 * b.dim;
    } else {
      x = rand() * 2.2 - 1.1;
      y = CITY_GROUND + rand() * rand() * 0.06;
      bright = 0.4;
    }
    out[i * 4] = x + jitter();
    out[i * 4 + 1] = y + jitter();
    out[i * 4 + 2] = z;
    out[i * 4 + 3] = bright;
  }
  return { city: out, win };
}

// ─── point cloud: formation intro + scroll morph to the city ───────────────
// Intro: each particle converges from a scattered shell onto the globe.
// Morph: a quadratic bezier from its globe position, through a random point
// filling the view, to its slot in the city.
const POINTS_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uDuration;
  uniform float uSize;
  uniform float uScale;
  uniform float uSpin;
  uniform float uMorph;
  uniform float uStagger;
  uniform float uBackAlpha;
  uniform vec2 uView;
  uniform vec3 uGlobe;
  uniform mat3 uTilt;
  uniform vec3 uWindowColor;
  attribute vec3 aStart;
  attribute vec3 aScatter;
  attribute vec4 aCity;
  attribute float aDelay;
  attribute float aSpin;
  attribute float aOrder;
  attribute float aWin;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vMorph;

  float hash(float n) {
    return fract(sin(n * 12.9898) * 43758.5453);
  }

  // Each window flips on/off at random on its own period, with a short fade.
  float windowLight(float seed, float time) {
    float period = 2.5 + seed * 8.0;
    float x = (time + seed * 37.0) / period;
    float cycle = floor(x);
    float prev = step(0.35, hash(cycle - 1.0 + seed * 113.0));
    float cur = step(0.35, hash(cycle + seed * 113.0));
    return mix(prev, cur, smoothstep(0.0, 0.06, fract(x)));
  }

  vec3 rotY(vec3 p, float a) {
    float c = cos(a);
    float s = sin(a);
    return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  }

  void main() {
    float t = clamp((uTime - aDelay) / uDuration, 0.0, 1.0);
    float e = 1.0 - pow(1.0 - t, 3.0);
    vec3 local = rotY(mix(aStart, position, e), (1.0 - e) * aSpin + uSpin);
    // Parallax tilt applies to the globe only; the scatter and city stay put.
    vec3 center = uTilt * uGlobe;
    vec3 sphere = uTilt * (local + uGlobe);
    float facing = dot(normalize(sphere - center), normalize(cameraPosition - sphere));
    float sphereAlpha = e * e * mix(uBackAlpha, 1.0, smoothstep(-0.1, 0.25, facing));

    float m = clamp((uMorph - aOrder * uStagger) / (1.0 - uStagger), 0.0, 1.0);
    m = m * m * (3.0 - 2.0 * m);
    vec3 scatter = vec3(aScatter.xy * uView, aScatter.z);
    vec3 city = vec3(aCity.xy * uView, aCity.z);
    float im = 1.0 - m;
    vec3 p = im * im * sphere + 2.0 * im * m * scatter + m * m * city;
    float isWindow = step(0.0, aWin);
    float lit = mix(1.0, mix(0.08, 1.0, windowLight(aWin, uTime)), isWindow);
    float yellow = isWindow * step(fract(aWin * 7.0), 0.75);
    vColor = mix(aColor, uWindowColor, yellow * m);
    vAlpha = mix(sphereAlpha, aCity.w * lit, m);
    vMorph = m;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * (uScale / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const POINTS_FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform vec4 uAvoid; // x0, y0, x1, y1 in framebuffer pixels
  uniform float uAvoidFeather;
  uniform float uAvoidAlpha;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vMorph;
  void main() {
    vec2 d = max(max(uAvoid.xy - gl_FragCoord.xy, gl_FragCoord.xy - uAvoid.zw), 0.0);
    float outside = smoothstep(0.0, uAvoidFeather, length(d));
    float avoid = mix(1.0, mix(uAvoidAlpha, 1.0, outside), vMorph);
    float a = texture2D(uMap, gl_PointCoord).a * uOpacity * vAlpha * avoid;
    if (a < 0.004) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

function buildPoints(coords, { city, win }, getCol, radius, size, opacity, [dMin, dMax], dotTex) {
  const n = coords.length / 3;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const start = new Float32Array(n * 3);
  const scatter = new Float32Array(n * 3);
  const delay = new Float32Array(n);
  const spin = new Float32Array(n);
  const order = new Float32Array(n);
  const dir = new THREE.Vector3();
  const c = new THREE.Color();
  for (let i = 0; i < n; i++) {
    pos[i * 3] = coords[i * 3] * radius;
    pos[i * 3 + 1] = coords[i * 3 + 1] * radius;
    pos[i * 3 + 2] = coords[i * 3 + 2] * radius;
    c.copy(getCol());
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
    randomDir(dir);
    const sr = 2.6 + 4.4 * Math.cbrt(Math.random());
    start[i * 3] = dir.x * sr;
    start[i * 3 + 1] = dir.y * sr;
    start[i * 3 + 2] = dir.z * sr;
    scatter[i * 3] = (Math.random() * 2 - 1) * 1.15;
    scatter[i * 3 + 1] = (Math.random() * 2 - 1) * 1.15;
    scatter[i * 3 + 2] = (Math.random() * 2 - 1) * 1.2;
    delay[i] = dMin + Math.random() * (dMax - dMin);
    spin[i] = (Math.random() - 0.5) * 1.6;
    order[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
  geo.setAttribute("aStart", new THREE.BufferAttribute(start, 3));
  geo.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
  geo.setAttribute("aCity", new THREE.BufferAttribute(city, 4));
  geo.setAttribute("aDelay", new THREE.BufferAttribute(delay, 1));
  geo.setAttribute("aSpin", new THREE.BufferAttribute(spin, 1));
  geo.setAttribute("aOrder", new THREE.BufferAttribute(order, 1));
  geo.setAttribute("aWin", new THREE.BufferAttribute(win, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uDuration: { value: TRAVEL_SECONDS },
      uSize: { value: size },
      uScale: { value: 1 },
      uOpacity: { value: opacity },
      uMap: { value: dotTex },
      uSpin: { value: 0 },
      uMorph: { value: 0 },
      uStagger: { value: MORPH_STAGGER },
      uBackAlpha: { value: BACK_ALPHA },
      uView: { value: new THREE.Vector2(1, 1) },
      uGlobe: { value: new THREE.Vector3() },
      uTilt: { value: new THREE.Matrix3() },
      uWindowColor: { value: BRAND.window },
      uAvoid: { value: new THREE.Vector4(-1e6, -1e6, -1e6, -1e6) },
      uAvoidFeather: { value: 1 },
      uAvoidAlpha: { value: TEXT_AVOID_ALPHA },
    },
    vertexShader: POINTS_VERT,
    fragmentShader: POINTS_FRAG,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  // Morphed positions leave the static bounding sphere.
  points.frustumCulled = false;
  return points;
}

// ─── arcs (animated pulses) between land points ────────────────────────────
const ARC_VERT = /* glsl */ `
  attribute float aT;
  varying float vT;
  varying float vFacing;
  void main() {
    vT = aT;
    vec3 world = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 center = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    vFacing = dot(normalize(world - center), normalize(cameraPosition - world));
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`;

const ARC_FRAG = /* glsl */ `
  uniform float uProgress;
  uniform float uOpacity;
  uniform float uBackAlpha;
  uniform vec3 uColor;
  varying float vT;
  varying float vFacing;
  void main() {
    float d = fract(uProgress - vT);
    float trail = exp(-d * 9.0);
    float ends = smoothstep(0.0, 0.05, vT) * (1.0 - smoothstep(0.95, 1.0, vT));
    float back = mix(uBackAlpha, 1.0, smoothstep(-0.1, 0.25, vFacing));
    gl_FragColor = vec4(uColor * (0.18 + trail * 1.6), (0.1 + trail * 0.9) * ends * back * uOpacity);
  }
`;

function buildArcs(count, segments, radius, color, landCoords, dotTex) {
  const group = new THREE.Group();
  const arcs = [];
  const epPositions = [];
  const nLand = landCoords.length / 3;
  const pick = () => {
    const i = (Math.random() * nLand) | 0;
    return new THREE.Vector3(landCoords[i * 3], landCoords[i * 3 + 1], landCoords[i * 3 + 2]).multiplyScalar(radius);
  };
  for (let i = 0; i < count; i++) {
    let a = pick();
    let b = pick();
    for (let tries = 0; tries < 8 && (a.angleTo(b) < 0.35 || a.angleTo(b) > Math.PI - 0.25); tries++) {
      b = pick();
    }
    const ang = a.angleTo(b);
    const mid = a.clone().add(b).normalize();
    const lift = 1 + 0.55 * (ang / Math.PI);
    const curve = new THREE.QuadraticBezierCurve3(a, mid.multiplyScalar(lift), b);
    const pts = curve.getPoints(segments);
    const tArr = new Float32Array(pts.length);
    for (let k = 0; k < pts.length; k++) tArr[k] = k / (pts.length - 1);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    geo.setAttribute("aT", new THREE.BufferAttribute(tArr, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: Math.random() },
        uOpacity: { value: 0 },
        uBackAlpha: { value: BACK_ALPHA },
        uColor: { value: color },
      },
      vertexShader: ARC_VERT,
      fragmentShader: ARC_FRAG,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const line = new THREE.Line(geo, mat);
    line.userData.speed = ARC_SPEED[0] + Math.random() * (ARC_SPEED[1] - ARC_SPEED[0]);
    arcs.push(line);
    group.add(line);
    epPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
  }
  const epGeo = new THREE.BufferGeometry();
  epGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(epPositions), 3));
  const epMat = new THREE.PointsMaterial({
    color: new THREE.Color("#7ae582"),
    size: 0.055,
    map: dotTex,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const endpoints = new THREE.Points(epGeo, epMat);
  group.add(endpoints);
  return { group, arcs, epMat };
}

// ─── location marker: bright dot with an expanding ring ────────────────────
function buildMarker(dir, radius, color, dotTex) {
  const group = new THREE.Group();
  group.position.copy(dir).multiplyScalar(radius);
  // Called before parenting, so lookAt's world space equals planet space.
  group.lookAt(dir.clone().multiplyScalar(radius * 2));

  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(3), 3));
  const dotMat = new THREE.PointsMaterial({
    color,
    size: 0.09,
    map: dotTex,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  group.add(new THREE.Points(dotGeo, dotMat));

  const ringMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.022, 0.03, 48), ringMat);
  group.add(ring);

  return { group, ring, dotMat, ringMat };
}

// ─── component ─────────────────────────────────────────────────────────────
function PARTICLEFIELD({ morphTargetId }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    let disposed = false;
    let raf = 0;
    let inView = true;
    let earthTex = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 60);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setClearColor(0x000000, 0);

    const dotTex = makeDotTexture();
    const view = new THREE.Vector2(1, 1); // half extents of the view at z = 0
    const globeCenter = new THREE.Vector3();

    const tilt = new THREE.Group(); // mouse parallax
    const planet = new THREE.Group(); // spin
    tilt.add(planet);
    scene.add(tilt);

    // Dark core with a faint dimmed Blue Marble texture underneath the particles.
    const coreMat = new THREE.MeshBasicMaterial({
      color: BRAND.coreTint,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 48), coreMat);
    core.scale.setScalar(0.0001);
    planet.add(core);

    // Ambient stars.
    const starPos = new Float32Array(STAR_COUNT * 3);
    const sd = new THREE.Vector3();
    for (let i = 0; i < STAR_COUNT; i++) {
      randomDir(sd);
      starPos[i * 3] = sd.x * (9 + Math.random() * 6);
      starPos[i * 3 + 1] = sd.y * (9 + Math.random() * 6);
      starPos[i * 3 + 2] = sd.z * (9 + Math.random() * 6);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: BRAND.star,
      size: 0.018,
      map: dotTex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // Filled in once the map is sampled.
    const intro = { ready: false, t0: 0, pointMats: [], arcs: [], epMat: null, marker: null };
    const morph = { current: 0, target: 0 };

    const colTmp = new THREE.Color();
    const landCol = () => {
      if (Math.random() < 0.62) colTmp.copy(BRAND.land).multiplyScalar(0.7 + Math.random() * 0.5);
      else colTmp.copy(BRAND.landAlt).multiplyScalar(0.55 + Math.random() * 0.5);
      return colTmp;
    };
    const oceanCol = () => colTmp.copy(BRAND.ocean);

    const applyView = () => {
      for (const mat of intro.pointMats) {
        mat.uniforms.uScale.value = renderer.domElement.height / 2;
        mat.uniforms.uView.value.copy(view);
        mat.uniforms.uGlobe.value.copy(globeCenter);
      }
    };

    // Load the map, build the Earth, kick off the formation animation.
    const img = new Image();
    img.onload = () => {
      if (disposed) return;
      const { land, ocean } = sampleEarth(img);

      earthTex = new THREE.Texture(img);
      earthTex.colorSpace = THREE.SRGBColorSpace;
      earthTex.wrapS = THREE.RepeatWrapping;
      earthTex.offset.x = 0.25; // align texture with particle longitudes
      earthTex.needsUpdate = true;
      coreMat.map = earthTex;
      coreMat.needsUpdate = true;

      const rand = mulberry32(CITY_SEED);
      const skyline = buildSkyline(rand);
      const landCity = sampleCity(skyline, land.length / 3, "structure", rand);
      const oceanCity = sampleCity(skyline, ocean.length / 3, "fill", rand);

      const landPoints = buildPoints(land, landCity, landCol, 1.012, 0.017, 0.9, [0, 1.0], dotTex);
      const oceanPoints = buildPoints(ocean, oceanCity, oceanCol, 1.0, 0.015, 0.4, [0.4, 1.6], dotTex);
      scene.add(landPoints, oceanPoints);
      const built = buildArcs(ARC_COUNT, ARC_SEGMENTS, 1.02, BRAND.arc, land, dotTex);
      planet.add(built.group);
      const marker = buildMarker(latLonToDir(TRINIDAD.lat, TRINIDAD.lon), 1.025, BRAND.marker, dotTex);
      planet.add(marker.group);

      intro.ready = true;
      intro.t0 = performance.now();
      intro.pointMats = [landPoints.material, oceanPoints.material];
      intro.arcs = built.arcs;
      intro.epMat = built.epMat;
      intro.marker = marker;
      applyView();

      if (reduceMotion) renderStatic();
    };
    img.src = earthUrl;

    // ── resize: keep the planet 62vh regardless of canvas size ──
    const updateSize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const targetPx = (PLANET_DIAMETER_VH / 100) * window.innerHeight;
      const worldHeight = (2 * h) / targetPx;
      camera.position.z = worldHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      camera.updateProjectionMatrix();
      view.set((worldHeight / 2) * camera.aspect, worldHeight / 2);
      globeCenter.set(0, (GLOBE_OFFSET_VH / 100) * worldHeight, 0);
      planet.position.copy(globeCenter);
      applyView();
      if (reduceMotion) renderStatic();
    };
    const ro = new ResizeObserver(updateSize);
    ro.observe(canvas);

    const morphTarget = morphTargetId ? document.getElementById(morphTargetId) : null;
    const morphMedia = window.matchMedia(MORPH_MEDIA);
    const readScroll = () => {
      if (!morphTarget) return;
      const vh = window.innerHeight;
      morph.target = morphMedia.matches
        ? clamp01((vh - morphTarget.getBoundingClientRect().top) / (vh * MORPH_SPAN))
        : 0;
      if (reduceMotion) {
        morph.current = morph.target < 0.5 ? 0 : 1;
        renderStatic();
      }
    };
    readScroll();
    morph.current = morph.target;
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    morphMedia.addEventListener("change", readScroll);

    // Pause rendering when the canvas is scrolled out of view.
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(container);

    // Mouse parallax.
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduceMotion) window.addEventListener("pointermove", onPointerMove);

    const avoidEls = Array.from(document.querySelectorAll("[data-particle-avoid]"));
    const avoidRect = new THREE.Vector4();
    const readAvoidRect = () => {
      if (!avoidEls.length) return avoidRect.set(-1e6, -1e6, -1e6, -1e6);
      let top = Infinity;
      let left = Infinity;
      let bottom = -Infinity;
      let right = -Infinity;
      for (const el of avoidEls) {
        const r = el.getBoundingClientRect();
        top = Math.min(top, r.top);
        left = Math.min(left, r.left);
        bottom = Math.max(bottom, r.bottom);
        right = Math.max(right, r.right);
      }
      const c = canvas.getBoundingClientRect();
      const dpr = renderer.getPixelRatio();
      // gl_FragCoord has its origin at the bottom-left.
      return avoidRect.set(
        (left - c.left) * dpr,
        (c.bottom - bottom) * dpr,
        (right - c.left) * dpr,
        (c.bottom - top) * dpr
      );
    };

    const markerPos = new THREE.Vector3();
    const markerNormal = new THREE.Vector3();
    const toCamera = new THREE.Vector3();

    const update = (t, dt) => {
      tilt.updateMatrix();
      if (morph.current > 0) readAvoidRect();
      const feather = TEXT_AVOID_FEATHER * renderer.getPixelRatio();
      for (const mat of intro.pointMats) {
        mat.uniforms.uTilt.value.setFromMatrix4(tilt.matrix);
        mat.uniforms.uAvoid.value.copy(avoidRect);
        mat.uniforms.uAvoidFeather.value = feather;
        mat.uniforms.uTime.value = t;
        mat.uniforms.uSpin.value = planet.rotation.y;
        mat.uniforms.uMorph.value = morph.current;
      }

      const globeFade = 1 - smoothstep(0, 0.25, morph.current);
      planet.visible = globeFade > 0;

      const kCore = easeOutCubic(clamp01((t - 0.3) / 1.2));
      core.scale.setScalar(Math.max(kCore, 0.0001));
      coreMat.opacity = 0.5 * kCore * globeFade;
      starMat.opacity = 0.5 * easeOutCubic(clamp01(t / 1.6));

      const kArc = easeOutCubic(clamp01((t - 2.7) / 1.2)) * globeFade;
      for (const arc of intro.arcs) {
        arc.material.uniforms.uOpacity.value = kArc;
        arc.material.uniforms.uProgress.value += arc.userData.speed * dt;
      }
      intro.epMat.opacity = 0.95 * kArc;

      // Points don't write depth, so hide the marker manually on the far side.
      const { group, ring, dotMat, ringMat } = intro.marker;
      group.getWorldPosition(markerPos);
      planet.getWorldPosition(markerNormal);
      markerNormal.subVectors(markerPos, markerNormal).normalize();
      toCamera.copy(camera.position).sub(markerPos).normalize();
      const facing = clamp01((markerNormal.dot(toCamera) + 0.05) / 0.3);
      const kMarker = easeOutCubic(clamp01((t - 3.0) / 1.0)) * facing * globeFade;
      const phase = reduceMotion ? 0.3 : (t * 0.6) % 1;
      ring.scale.setScalar(1 + phase * 2.5);
      ringMat.opacity = (1 - phase) * 0.8 * kMarker;
      dotMat.opacity = kMarker;
    };

    function renderStatic() {
      if (!intro.ready) return;
      update(1000, 0);
      renderer.render(scene, camera);
    }

    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!inView) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      planet.rotation.y += SPIN_SPEED * dt;
      const tx = pointer.x * PARALLAX_X;
      const ty = -pointer.y * PARALLAX_Y;
      tilt.rotation.y += (tx - tilt.rotation.y) * 0.05;
      tilt.rotation.x += (ty - tilt.rotation.x) * 0.05;
      morph.current += (morph.target - morph.current) * (1 - Math.exp(-dt * MORPH_SMOOTHING));

      if (intro.ready) update((performance.now() - intro.t0) / 1000, dt);
      renderer.render(scene, camera);
    };

    updateSize();
    if (!reduceMotion) tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      morphMedia.removeEventListener("change", readScroll);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      dotTex.dispose();
      if (earthTex) earthTex.dispose();
      renderer.dispose();
    };
  }, [morphTargetId]);

  return (
    <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="top-0 block h-screen w-full md:sticky" />
    </div>
  );
}

export default PARTICLEFIELD;
