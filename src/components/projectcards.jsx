import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ProjectCard = ({
  title,
  id,
  summary,
  category,
  image,
  color,
  delay = 0,
}) => {
  return (
    <motion.a
      href={`/projectdetails/${id}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 12,
      }}
      viewport={{ once: true }}
      className={`project-card project-card-${color} group cursor-pointer 
        rounded-2xl overflow-hidden relative bg-black/20`}
    >
      <div className="h-40 md:h-48 lg:h-56 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.05 }}
        />
      </div>

      <div className="p-6 space-y-3">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="text-xs uppercase tracking-wider text-white/80 font-semibold"
        >
          {category}
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.3 }}
          className="text-xl md:text-2xl font-bold text-white leading-tight"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.4 }}
          className="text-white/90 text-sm leading-relaxed line-clamp-3"
        >
          {summary}
        </motion.p>
      </div>

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent" />
      </div>
    </motion.a>
  );
};

export const ProjectRow = ({
  title,
  id,
  summary,
  category,
  image,
  delay = 0,
}) => {
  return (
    <motion.a
      href={`/projectdetails/${id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ x: 6 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="project-row group cursor-pointer flex items-center gap-4 sm:gap-6 rounded-2xl overflow-hidden bg-black/20 p-4"
    >
      <div className="h-20 w-28 sm:h-24 sm:w-40 shrink-0 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-wider text-white/80 font-semibold line-clamp-1">
          {category}
        </div>

        <h3 className="mt-1 text-lg md:text-xl font-bold text-white leading-tight line-clamp-1">
          {title}
        </h3>

        <p className="mt-1 text-white/90 text-sm leading-relaxed line-clamp-2">
          {summary}
        </p>
      </div>

      <ChevronRight
        size={20}
        className="hidden sm:block shrink-0 text-white/40 group-hover:text-white transition-colors duration-300"
      />
    </motion.a>
  );
};

export default ProjectCard;
