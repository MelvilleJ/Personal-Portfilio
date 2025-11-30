import { motion } from "framer-motion";

const ProjectCard = ({
  title,
  description,
  category,
  image,
  color,
  delay = 0,
}) => {
  return (
    <motion.div
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
      {/* Image Section */}
      <div className="h-40 md:h-48 lg:h-56 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.05 }}
        />
      </div>

      {/* Content Section */}
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
          {description}
        </motion.p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
