import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/projectcards.jsx";
import { projects } from "../data/projects.jsx";
const ProjectsSection = () => {
  return (
    <div
      id="projects"
      className="min-h-screen px-6 py-20 bg-gradient-to-bl from-blue-950 to-slate-950"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.h2
          className="section-title text-2xl sm:text-3xl lg:text-7xl text-green"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Featured <span className="text-primary text-white">Projects</span>
        </motion.h2>

        <motion.p
          className="section-subtitle mt-5 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          A showcase of innovative solutions and creative implementations across
          various domains
        </motion.p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
