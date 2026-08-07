import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import ProjectCard, { ProjectRow } from "../components/projectcards.jsx";
import { projects } from "../data/projects.jsx";

const VIEWS = [
  { id: "grid", label: "Grid", Icon: LayoutGrid },
  { id: "list", label: "List", Icon: List },
];

const ProjectsSection = () => {
  const [view, setView] = useState("grid");

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

      <div className="max-w-6xl mx-auto px-4 mb-8 flex justify-end">
        <div
          role="group"
          aria-label="Project layout"
          className="inline-flex gap-1 rounded-lg border border-white/15 bg-white/5 p-1"
        >
          {VIEWS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              aria-pressed={view === id}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                view === id
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <div
          key="grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} delay={index * 0.1} />
          ))}
        </div>
      ) : (
        <div
          key="list"
          className="flex flex-col gap-4 max-w-6xl mx-auto px-4"
        >
          {projects.map((project, index) => (
            <ProjectRow
              key={project.title}
              {...project}
              delay={Math.min(index, 6) * 0.05}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
