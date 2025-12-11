import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projectdetails";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Clock,
  Zap,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((project) => project.id === Number(id));
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-bl from-blue-950 to-slate-950">
      <div className="relative h-96 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/30">
                {project.category}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <Calendar size={16} />
                {project.year}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <Clock size={16} />
                {project.duration}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {project.title}
            </h1>

            <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
              {project.summary}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-6 mb-12 border-b border-white/10 overflow-x-auto"
        >
          {["overview", "features", "challenges", "technologies"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 capitalize transition-colors whitespace-nowrap font-medium ${
                activeTab === tab
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-10"
        >
          {activeTab === "overview" && (
            <>
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-emerald-400 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-white">
                    Project Overview
                  </h2>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-emerald-400 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-white">
                    Project Outcome
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/20">
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      className="text-emerald-400 flex-shrink-0 mt-1"
                      size={28}
                    />
                    <p className="text-gray-200 text-lg leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeTab === "features" && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-emerald-400 rounded-full"></div>
                <h2 className="text-3xl font-bold text-white">Key Features</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold flex-shrink-0 group-hover:bg-emerald-500/30 transition-colors">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-gray-200 font-medium text-lg">
                          {feature}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "challenges" && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-amber-400 rounded-full"></div>
                <h2 className="text-3xl font-bold text-white">
                  Technical Challenges
                </h2>
              </div>
              <div className="space-y-6">
                {project.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <AlertCircle
                        className="text-amber-400 flex-shrink-0 mt-1"
                        size={24}
                      />
                      <p className="text-gray-300 leading-relaxed">
                        {challenge}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "technologies" && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-emerald-400 rounded-full"></div>
                <h2 className="text-3xl font-bold text-white">
                  Technologies & Tools
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {project.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 }}
                    className="group px-8 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300 cursor-default"
                  >
                    <span className="text-gray-200 font-semibold text-lg flex items-center gap-3">
                      <Zap
                        size={20}
                        className="text-emerald-400 group-hover:scale-110 transition-transform"
                      />
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
}
