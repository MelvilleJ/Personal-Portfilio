import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const SPRING = { stiffness: 60, damping: 24, mass: 0.6 };

function GLOWFIELD({ children, className = "" }) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const visible = useMotionValue(0);

  const smoothX = useSpring(pointerX, SPRING);
  const smoothY = useSpring(pointerY, SPRING);
  const smoothOpacity = useSpring(visible, { stiffness: 40, damping: 20 });

  const handlePointerMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
    visible.set(1);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => visible.set(0)}
      className={`relative ${className}`}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-[620px] w-[620px] rounded-full"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: smoothOpacity,
            background:
              "radial-gradient(circle, rgba(37,99,235,0.22), rgba(37,99,235,0.08) 45%, transparent 70%)",
          }}
        />
      )}
      {children}
    </div>
  );
}

export default GLOWFIELD;
