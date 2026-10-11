import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Quote } from "lucide-react";

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const TestimonialCard = ({ t }) => (
  <motion.figure
    whileHover={{ scale: 1.06 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className="relative z-0 flex h-56 w-72 shrink-0 flex-col overflow-hidden rounded-xl hover:z-10 sm:h-60 sm:w-80"
  >
    <blockquote
      title={t.quote}
      className="min-h-0 grow px-6 pt-6 pb-2"
    >
      <p className="line-clamp-5 text-sm leading-relaxed text-gray-600 italic">
        <Quote
          size={14}
          aria-hidden
          className="relative -top-1 mr-1 inline-block rotate-180 text-green-500/60"
        />
        {t.quote}
        <Quote
          size={14}
          aria-hidden
          className="relative -top-1 ml-1 inline-block text-green-500/60"
        />
      </p>
    </blockquote>

    <figcaption className="flex items-center gap-3 px-6 py-4">
      {t.avatar_url ? (
        <img
          src={t.avatar_url}
          alt={t.author}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300">
          <span className="text-sm font-bold text-gray-500">
            {initials(t.author) || "?"}
          </span>
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-xs font-bold tracking-wide text-gray-900 uppercase">
          {t.author}
        </p>
        {(t.role || t.company) && (
          <p className="truncate text-xs text-gray-400">
            {[t.role, t.company].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </figcaption>
  </motion.figure>
);

const SPEED_PX_PER_SEC = 45;

// Driven per frame instead of a keyframe animation so hover can pause and
// resume from the exact position. Wrapping by one measured set width keeps the
// loop seamless regardless of how many copies are rendered.
const Track = ({ items }) => {
  const x = useMotionValue(0);
  const setRef = useRef(null);
  const paused = useRef(false);
  const reduceMotion = useReducedMotion();
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const el = setRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (w) setCopies(Math.ceil(window.innerWidth / w) + 1);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [items]);

  useAnimationFrame((_, delta) => {
    const w = setRef.current?.offsetWidth;
    if (!w || paused.current || reduceMotion) return;
    let next = x.get() - (SPEED_PX_PER_SEC * delta) / 1000;
    if (next <= -w) next += w;
    x.set(next);
  });

  return (
    <motion.div
      className="flex w-max"
      style={{ x }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {Array.from({ length: copies }).map((_, copy) => (
        <div
          key={copy}
          ref={copy === 0 ? setRef : undefined}
          className="flex shrink-0 gap-6 pr-6"
          aria-hidden={copy > 0}
        >
          {/* Every card is followed by a line, including the last, so the
              boundary between repeated sets looks like any other gap. */}
          {items.map((t) => (
            <React.Fragment key={`${copy}-${t.id ?? t.author}`}>
              <TestimonialCard t={t} />
              <div aria-hidden className="my-8 w-px shrink-0 bg-gray-900/10" />
            </React.Fragment>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (!cancelled && Array.isArray(data.testimonials))
          setItems(data.testimonials);
      } catch {
        // API offline: section simply renders its empty state below.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-green-50 via-white to-green-50 py-20"
    >
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-14 px-6"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-mono text-base md:text-lg tracking-widest text-green-600 uppercase"
        >
          testimonials
        </motion.span>
        <motion.div
          className="mt-6 h-[3px] w-20 bg-green-500 rounded-full mx-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {loading ? (
        <div className="flex gap-6 overflow-hidden px-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-56 w-72 shrink-0 animate-pulse rounded-xl bg-white/40 sm:h-60 sm:w-80"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-400">
          No testimonials yet. Check back soon.
        </p>
      ) : (
        <div className="relative">
          {/* Edge fades so cards dissolve into the background */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-green-50 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-green-50 to-transparent sm:w-24" />

          <div className="overflow-x-hidden py-6">
            <Track items={items} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Testimonials;
