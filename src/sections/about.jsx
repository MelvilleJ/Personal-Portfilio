import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FloatingBlobs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const blobVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      {/* Blob 1 — top right, blue */}
      <motion.svg
        className="absolute -top-24 -right-24 w-[480px] h-[480px]"
        viewBox="-100 -100 200 200"
        variants={blobVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.path
          d="M48,-60C58.5,-50.8,62,-33.8,67.2,-18.2C72.4,-2.6,79.3,11.6,76.5,23.8C73.7,36,61.2,46.2,48.5,56.3C35.8,66.4,22.9,76.4,8.9,77.5C-5.1,78.6,-20.2,70.8,-34.2,61.4C-48.2,52,-61.1,41,-67.8,27C-74.5,13,-75,-3.8,-69.8,-18.2C-64.6,-32.6,-53.7,-44.6,-41.5,-54.2C-29.3,-63.8,-15.7,-71,0.3,-71.4C16.3,-71.8,37.5,-69.2,48,-60Z"
          fill="rgba(59, 130, 246, 0.18)"
          animate={{ y: [-15, 15, -15], x: [-8, 8, -8], rotate: [0, 360] }}
          transition={{
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
        />
      </motion.svg>

      {/* Blob 2 — bottom left, cyan */}
      <motion.svg
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px]"
        viewBox="-100 -100 200 200"
        variants={blobVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.5 }}
      >
        <motion.path
          d="M42.7,-52.4C54.9,-42.7,63.5,-27.6,67.8,-10.7C72.1,6.2,72.1,24.9,64.3,40.5C56.5,56.1,41,68.6,23.3,74.8C5.6,81,-14.3,80.9,-30.7,73.7C-47.1,66.5,-60,52.2,-66.4,35.6C-72.8,19,-72.7,0.1,-67.4,-16.7C-62.1,-33.5,-51.6,-48.2,-38.2,-57.9C-24.8,-67.6,-8.6,-72.3,6.7,-70C22,-67.7,30.5,-62.1,42.7,-52.4Z"
          fill="rgba(6, 182, 212, 0.14)"
          animate={{ y: [10, -10, 10], x: [6, -6, 6], rotate: [0, -360] }}
          transition={{
            y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
        />
      </motion.svg>

      {/* Blob 3 — mid left, purple */}
      <motion.svg
        className="absolute top-1/3 -left-20 w-72 h-72"
        viewBox="-100 -100 200 200"
        variants={blobVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 1.0 }}
      >
        <motion.path
          d="M38.5,-48.7C51.4,-38.9,64.7,-28.8,69.2,-15.4C73.7,-2,69.4,14.7,61.5,29.5C53.6,44.3,42.1,57.2,28,64.8C13.9,72.4,-2.8,74.7,-18.3,70.6C-33.8,66.5,-48.1,56,-56.9,42.1C-65.7,28.2,-69,10.9,-67.8,-5.8C-66.6,-22.5,-61,-38.6,-50.4,-48.9C-39.8,-59.2,-24.2,-63.7,-9.1,-65.5C6,-67.3,20.4,-66.4,38.5,-48.7Z"
          fill="rgba(147, 51, 234, 0.12)"
          animate={{ y: [-8, 8, -8], x: [-4, 4, -4], rotate: [0, 360] }}
          transition={{
            y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 13, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          }}
        />
      </motion.svg>

      {/* Blob 4 — top left, emerald */}
      <motion.svg
        className="absolute -top-16 -left-16 w-56 h-56"
        viewBox="-100 -100 200 200"
        variants={blobVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.3 }}
      >
        <motion.path
          d="M44.3,-56.8C57.1,-46.3,67.1,-31.6,70.8,-15.3C74.5,1,71.9,18.9,64.5,34.4C57.1,49.9,44.9,63,30.2,69.3C15.5,75.6,-1.7,75.1,-17.8,69.7C-33.9,64.3,-48.9,54,-58.1,40C-67.3,26,-70.7,8.3,-68.1,-8.5C-65.5,-25.3,-56.9,-41.2,-44.5,-51.7C-32.1,-62.2,-16,-67.3,0.7,-68.1C17.4,-68.9,31.5,-67.3,44.3,-56.8Z"
          fill="rgba(16, 185, 129, 0.13)"
          animate={{ y: [6, -6, 6], x: [-10, 10, -10], rotate: [0, -360] }}
          transition={{
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
          }}
        />
      </motion.svg>

      {/* Blob 5 — center right, rose */}
      <motion.svg
        className="absolute top-1/2 -right-16 w-60 h-60"
        viewBox="-100 -100 200 200"
        variants={blobVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.8 }}
      >
        <motion.path
          d="M46.5,-58.2C59.3,-47.4,67.9,-31.3,71.2,-14.2C74.5,2.9,72.5,21,64.8,36.4C57.1,51.8,43.7,64.5,28.2,71.2C12.7,77.9,-4.9,78.6,-21.4,73.5C-37.9,68.4,-53.3,57.5,-62.5,43C-71.7,28.5,-74.7,10.4,-72.2,-6.8C-69.7,-24,-61.7,-40.3,-49.6,-51.4C-37.5,-62.5,-21.3,-68.4,-3.8,-68.5C13.7,-68.6,33.7,-69,46.5,-58.2Z"
          fill="rgba(244, 63, 94, 0.1)"
          animate={{ y: [-12, 12, -12], x: [5, -5, 5], rotate: [0, 360] }}
          transition={{
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
          }}
        />
      </motion.svg>

      {/* Blob 6 — bottom center, indigo, small */}
      <motion.svg
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-44 h-44"
        viewBox="-100 -100 200 200"
        variants={blobVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 1.3 }}
      >
        <motion.path
          d="M35.2,-44.1C45.4,-35.2,53.6,-23.3,57.1,-9.8C60.6,3.7,59.4,18.8,53,31.8C46.6,44.8,35,55.7,21.4,61.3C7.8,66.9,-7.8,67.2,-22.1,62.2C-36.4,57.2,-49.4,46.9,-57.1,33.4C-64.8,19.9,-67.2,3.2,-64.2,-12.4C-61.2,-28,-52.8,-42.5,-41,-51.3C-29.2,-60.1,-14.6,-63.2,-0.5,-62.6C13.6,-62,25,-53,35.2,-44.1Z"
          fill="rgba(99, 102, 241, 0.11)"
          animate={{ y: [8, -8, 8], x: [-6, 6, -6], rotate: [0, -360] }}
          transition={{
            y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          }}
        />
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
