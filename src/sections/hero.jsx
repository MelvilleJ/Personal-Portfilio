import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import { motion, useMotionValue, useSpring } from "framer-motion";

function HERO() {
  const typedRef = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    typedInstance.current = new Typed(typedRef.current, {
      strings: ["Let’s Talk Solutions"],
      typeSpeed: 60,
      backSpeed: 30,
      loop: false,
      smartBackspace: true,
      backDelay: 1500,
      showCursor: true,
    });
    return () => {
      typedInstance.current.destroy();
    };
  }, []);
  const boxRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      {
        y: -200,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "fade.in",
      }
    );
  }, []);
  const containerRef = useRef(null);

  // Track raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the motion with spring physics
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-gradient-to-bl from-blue-950 to-slate-950  section-home h-full "
    >
      <motion.div
        className="pointer-events-none absolute w-100 h-100 rounded-full bg-blue-950 opacity-25 blur-[100px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <div
        ref={boxRef}
        className="raleway-sub my-50 mx-auto flex flex-col justify-center items-center h-full"
      >
        <h1 className="text-center text-3xl sm:text-2xl md:text-7xl  text-white">
          Hi, I'm
        </h1>
        <h1 className="text-center text-5xl md:text-8xl  text-white font-bold">
          Joshua Melville,
        </h1>
        <div className="text-center text-6xl lg:text-9xl md:text-9xl text-green font-bold">
          <span ref={typedRef}></span>
        </div>
      </div>
    </section>
  );
}

export default HERO;
