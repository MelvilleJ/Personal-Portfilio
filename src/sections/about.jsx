import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FloatingBlobs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const blobVariants = {
    hidden: { opacity: 0, scale: 0, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    x: [-5, 5, -5],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <div ref={ref} className="absolute inset-0 z-0">
      {/* Blob 1 */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        variants={blobVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.path
          d="M44.7,23.6C58.8,30.8,71.8,43.8,79.1,59.9C86.4,76,87.9,95.2,85.1,86.4C82.4,68,75.4,50.4,64.2,36.6C53,22.8,37.6,12.8,20.3,10.3C3,7.8,16.2,12.8,33.8,21.2C51.4,29.6,67.4,41.4,76.8,56.8C86.2,72.2,89,90.2,86.3,107.4C83.6,124.6,75.4,141,63.9,154.2C52.4,167.4,37.6,177.4,21.8,182.8C6,188.2,10.8,189,26.7,184.4C42.6,179.8,57.6,169.8,44.7,76.4Z"
          fill="rgba(59, 130, 246, 0.15)"
          animate={floatingAnimation}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50; 360 50 50"
            dur="30s"
            repeatCount="indefinite"
          />
        </motion.path>
      </motion.svg>

      {/* Blob 2 */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        variants={blobVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.5 }}
      >
        <motion.path
          d="M37.8,34.9C49.5,41.3,59.4,54.4,65.6,69.2C71.8,84,74.3,99.6,72.2,83.8C70.1,68,63.4,52.8,53.2,41.3C43,29.8,29.3,22,14.1,21.1C-1.1,20.2,17.8,26.2,32.4,35.1C47,44,59.5,55.8,66.8,70.3C74.1,84.8,76.2,101.9,73.4,118.2C70.6,134.5,62.9,150,51.4,157.6C39.9,165.2,24.6,164.9,9.8,167.1C-5,169.3,19.5,173.9,37.8,65.1Z"
          fill="rgba(6, 182, 212, 0.12)"
          animate={{
            y: [5, -5, 5],
            x: [3, -3, 3],
            transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="180 50 50; -180 50 50"
            dur="25s"
            repeatCount="indefinite"
          />
        </motion.path>
      </motion.svg>

      {/* Blob 3 */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        variants={blobVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 1.0 }}
      >
        <motion.path
          d="M25.7,55.2C33.2,60.8,38.7,70.6,42.1,81.2C45.5,91.8,46.8,103.2,44.8,86.1C42.8,75.4,37.5,65.4,29.9,58.6C22.3,51.8,12.4,48.2,1.8,50.8C-8.8,53.4,19.9,62.2,28.4,72.6C36.9,83,42.8,95,44.2,108.2C45.6,121.4,42.5,135.8,35.4,142.2C28.3,148.6,17.2,146.9,6.8,147.8C-3.6,148.7,18.2,152.2,25.7,55.2Z"
          fill="rgba(147, 51, 234, 0.1)"
          animate={{
            y: [-3, 3, -3],
            x: [-2, 2, -2],
            transition: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="90 50 50; 450 50 50"
            dur="40s"
            repeatCount="indefinite"
          />
        </motion.path>
      </motion.svg>
    </div>
  );
};

function ABOUT() {
  return (
    <section
      id="about"
      className="relative flex items-center justify-center w-full h-screen bg-gradient-to-br from-slate-950 to-blue-950 overflow-hidden text-left px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        className="relative z-10 max-w-4xl"
      >
        <h1 className="raleway-sub text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-green-400">
          Who am I?
        </h1>

        <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-white">
          Professional Problem Solver
        </h2>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-white">
          Thanks for stopping by :)
        </p>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-white leading-relaxed">
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
          well-rounded perspective, with roles as both a Junior Full Stack
          Developer and an IT Systems Administrator. I've worked on exciting
          projects, including developing a local AI agent and creating a human
          resources management system. I'm known for my adaptability and love
          for a challenge.
        </p>
      </motion.div>

      <FloatingBlobs />
    </section>
  );
}

export default ABOUT;
