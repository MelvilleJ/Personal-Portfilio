import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const CELL = 44;

const SNAKES_CONFIG = [
  {
    length: 22,
    interval: 160,
    color: "74,222,128",
    glow: "74,222,128",
    startDir: { x: 1, y: 0 },
    offset: { x: 0, y: 0 },
  },
  {
    length: 18,
    interval: 200,
    color: "99,102,241",
    glow: "99,102,241",
    startDir: { x: 0, y: 1 },
    offset: { x: 0.6, y: 0.3 },
  },
  {
    length: 15,
    interval: 240,
    color: "56,189,248",
    glow: "56,189,248",
    startDir: { x: -1, y: 0 },
    offset: { x: 0.3, y: 0.7 },
  },
];

const makeSnake = (cfg, cols, rows) => ({
  segments: Array.from({ length: cfg.length }, (_, i) => ({
    x: Math.floor(cols * cfg.offset.x + cols * 0.2) - i * cfg.startDir.x,
    y: Math.floor(rows * cfg.offset.y + rows * 0.2) - i * cfg.startDir.y,
  })),
  dir: { ...cfg.startDir },
  lastMove: 0,
  ...cfg,
});

const steerSnake = (snake, cols, rows) => {
  const head = snake.segments[0];
  const ahead = { x: head.x + snake.dir.x, y: head.y + snake.dir.y };
  const hitWall =
    ahead.x < 0 || ahead.x >= cols || ahead.y < 0 || ahead.y >= rows;

  if (hitWall || Math.random() < 0.04) {
    const candidates = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ].filter((d) => {
      if (d.x === -snake.dir.x && d.y === -snake.dir.y) return false;
      const nx = head.x + d.x;
      const ny = head.y + d.y;
      return nx >= 0 && nx < cols && ny >= 0 && ny < rows;
    });
    if (candidates.length) {
      snake.dir = candidates[Math.floor(Math.random() * candidates.length)];
    }
  }
};

const moveSnake = (snake, cols, rows) => {
  steerSnake(snake, cols, rows);
  const newHead = {
    x: snake.segments[0].x + snake.dir.x,
    y: snake.segments[0].y + snake.dir.y,
  };
  snake.segments.unshift(newHead);
  if (snake.segments.length > snake.length) snake.segments.pop();
};

const drawSnake = (ctx, snake) => {
  snake.segments.forEach((seg, i) => {
    const t = 1 - i / snake.segments.length;
    const alpha = t * 0.52;
    const size = (i === 0 ? 10 : 7) * t + 3;
    const px = seg.x * CELL - size / 2;
    const py = seg.y * CELL - size / 2;

    ctx.save();
    if (i === 0) {
      ctx.shadowBlur = 14;
      ctx.shadowColor = `rgba(${snake.glow},0.7)`;
    }
    ctx.fillStyle = `rgba(${snake.color},${alpha})`;
    ctx.beginPath();
    ctx.roundRect(px, py, size, size, 2);
    ctx.fill();
    ctx.restore();
  });
};

const SnakeGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let cols, rows;
    let snakes = [];
    let frameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.floor(canvas.width / CELL);
      rows = Math.floor(canvas.height / CELL);
      snakes = SNAKES_CONFIG.map((cfg) => makeSnake(cfg, cols, rows));
    };

    const draw = (timestamp) => {
      frameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dot grid
      ctx.fillStyle = "rgba(148,163,184,0.12)";
      for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
          ctx.beginPath();
          ctx.arc(x * CELL, y * CELL, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      snakes.forEach((snake) => {
        if (timestamp - snake.lastMove > snake.interval) {
          moveSnake(snake, cols, rows);
          snake.lastMove = timestamp;
        }
        drawSnake(ctx, snake);
      });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ opacity: 0.9 }}
    />
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 },
  },
};

function ABOUT() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      id="about"
      className="relative flex items-center justify-center w-full h-screen bg-gradient-to-br from-slate-950 to-blue-950 overflow-hidden text-left px-6"
    >
      <SnakeGrid />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl"
      >
        <motion.div variants={itemVariants}>
          <h1 className="raleway-sub text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-green-400">
            Who am I?
          </h1>
          <motion.div
            variants={lineVariants}
            className="mt-3 h-[2px] w-24 bg-green-400 rounded-full"
          />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="mt-5 text-xl sm:text-2xl md:text-3xl font-bold text-white"
        >
          Professional Problem Solver
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-3 text-base sm:text-lg md:text-xl text-slate-400"
        >
          Thanks for stopping by.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed"
        >
          Hi, I'm{" "}
          <span className="font-semibold text-green-400">Joshua Melville</span>,
          and I'm a passionate Computer Science graduate from Trinidad. I'm
          driven by my love for all things tech, from building computers and
          managing the infrastructure behind them to crafting code for websites
          and applications.
          <br />
          <br />
          I'm a detail-oriented problem-solver who enjoys working with others to
          bring projects to life. My professional experience has given me a
          well-rounded perspective, with roles as both a Full Stack Developer
          and an IT Systems Administrator. Having worked on a variety of
          projects, I've gained valuable experience in both software development
          and IT operations, allowing me to approach challenges with a holistic
          mindset.
          <br />
          <br />
          I'm always eager to learn and grow, and I'm excited to continue my
          journey in the tech world. Whether it's developing innovative
          solutions or optimizing IT systems, I'm ready to take on new
          challenges and make a positive impact.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default ABOUT;
