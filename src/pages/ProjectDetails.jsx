import { useState} from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
export default function ProjectDetails() {
    const { id } = useParams();
    const project = projects.find((project) => project.id === Number(id));
  return (
    <>
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
          <span className="text-primary text-white">{project.title}</span>
        </motion.h2>

        <motion.p
          className="section-subtitle mt-5 text-green"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {project.description}
        </motion.p>
      </motion.div>
    </div>
    </>
  );
}
