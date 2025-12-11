import React from "react";
import { motion } from "framer-motion";

function MESSAGE() {
  return (
    <section className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-5xl w-full mx-auto relative overflow-hidden"
      >
        <div className="relative z-10 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Saving the planet
            </h1>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl md:text-4xl lg:text-5xl font-light text-green-600">
                with code
              </span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed md:leading-loose font-medium">
              A lot of large businesses and corporations today are still mainly
              <span className="text-red-500 font-semibold">
                {" "}
                paper-based
              </span>{" "}
              which is very
              <span className="text-red-500 font-semibold">
                {" "}
                inefficient
              </span>{" "}
              and also extremely
              <span className="text-red-500 font-semibold"> harmful</span> to
              our ecosystem.
            </p>
          </div>

          <div className="pt-6">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">
                Let's build a greener future together
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600">
                🌱
              </div>
              <p className="text-sm text-gray-600 mt-1">Eco-Friendly</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">
                💻
              </div>
              <p className="text-sm text-gray-600 mt-1">Digital Solutions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">
                🚀
              </div>
              <p className="text-sm text-gray-600 mt-1">Innovation</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default MESSAGE;
