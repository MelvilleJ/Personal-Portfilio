import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/projectcards.jsx";
import project1Img from "../assets/projectimages/project1.png";
import project2Img from "../assets/projectimages/project2.png";
import project3Img from "../assets/projectimages/project3.png";
import project4Img from "../assets/projectimages/project4.png";
import project5Img from "../assets/projectimages/project5.png";
import project6Img from "../assets/projectimages/project6.png";
const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "n8n Business Automations",
      description:
        "Docker Deployed Local n8n Instance and created multiple AI driven automations ranging from Auto Email Handling to Chatbot Integration.",
      category: "AI Automation",
      image: project2Img,
    },
    {
      id: 2,
      title: "Project: Leslie",
      description:
        "Personal AI assistant that can answer questions on data pertaining to myself and provide information on various topics.",

      category: "FULL STACK + Generative AI Engineering",
      image: project1Img,
    },
    {
      id: 3,
      title: "Local AI Chat Bot Coding Assistant",
      description:
        "Local Chatbox to server as a private and secure OPEN AI replacement for document generation and general AI tasks.",
      category: "Server Deployment + Generative AI Engineering",
      image: project3Img,
    },
    {
      id: 4,
      title: "POSINCO Lease Management System",
      description:
        "Full Web-based System to Store and Manage Leases for POSINCO.",
      category: "Full Stack",
      image: project4Img,
    },
    {
      id: 5,
      title: "PATT Physical TD4 Digitization System",
      description:
        "Full Web-based System to Digitize Physical TD4s for the Port Authorities' Human Resource Management System.",
      category: "Full Stack",
      image: project4Img,
    },
    {
      id: 6,
      title: "NAS and File Server Management System",
      description:
        "Full Web-based System for NAS and File Server Management. System uses various custom scripts to automate and validate backups.",
      category: "FULL STACK + Generative AI Engineering",
      image: project5Img,
    },
    {
      id: 7,
      title: "Project Patience",
      description:
        "Probation attachment to a HRMS. Sends email notifications, handles supervisor and manager remarks as well as employee onboarding.",
      category: "FULL STACK",
      image: project6Img,
    },
  ];

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
