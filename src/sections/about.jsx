import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const buildVariants = (reduceMotion) => ({
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.2 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  rule: {
    hidden: { scaleX: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0.2 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
});

function ABOUT() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const variants = buildVariants(reduceMotion);

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
    >
      <motion.div
        ref={ref}
        variants={variants.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="raleway-sub relative z-10 mx-auto w-full max-w-6xl grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-5">
          <motion.p
            variants={variants.item}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400/80"
          >
            About
          </motion.p>

          <motion.h2
            variants={variants.item}
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white"
          >
            Who am I?
          </motion.h2>

          <motion.div
            variants={variants.rule}
            style={{ originX: 0 }}
            className="mt-6 h-px w-20 bg-neongreen"
          />

          <motion.p
            variants={variants.item}
            className="mt-6 text-lg sm:text-xl font-medium text-green"
          >
            Professional Problem Solver
          </motion.p>

          <motion.p
            variants={variants.item}
            className="mt-2 text-sm sm:text-base text-slate-400"
          >
            Thanks for stopping by.
          </motion.p>
        </div>

        <div className="lg:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-slate-300">
          <motion.p variants={variants.item}>
            Hi, I'm{" "}
            <span className="font-semibold text-green">Joshua Melville</span>,
            and I'm a passionate Computer Science graduate from Trinidad. I'm
            driven by my love for all things tech, from building computers and
            managing the infrastructure behind them to crafting code for
            websites and applications.
          </motion.p>

          <motion.p variants={variants.item}>
            I'm a detail-oriented problem-solver who enjoys working with others
            to bring projects to life. My professional experience has given me a
            well-rounded perspective, with roles as both a Full Stack Developer
            and an IT Systems Administrator. Having worked on a variety of
            projects, I've gained valuable experience in both software
            development and IT operations, allowing me to approach challenges
            with a holistic mindset.
          </motion.p>

          <motion.p variants={variants.item}>
            I'm always eager to learn and grow, and I'm excited to continue my
            journey in the tech world. Whether it's developing innovative
            solutions or optimizing IT systems, I'm ready to take on new
            challenges and make a positive impact.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

export default ABOUT;
