import React from "react";
import { motion } from "framer-motion";

const PaperIllustration = () => (
  <svg
    viewBox="0 0 380 440"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Shadow papers behind - rotated for chaos effect */}
    <rect
      x="95"
      y="85"
      width="190"
      height="250"
      rx="6"
      fill="#bbf7d0"
      transform="rotate(-14 190 210)"
    />
    <rect
      x="95"
      y="85"
      width="190"
      height="250"
      rx="6"
      fill="#d1fae5"
      transform="rotate(9 190 210)"
    />
    <rect
      x="95"
      y="85"
      width="190"
      height="250"
      rx="6"
      fill="#f0fdf4"
      transform="rotate(-4 190 210)"
    />

    {/* Main front paper */}
    <rect
      x="90"
      y="80"
      width="200"
      height="265"
      rx="6"
      fill="white"
      stroke="#e5e7eb"
      strokeWidth="1.5"
    />

    {/* Top green header strip */}
    <rect x="90" y="80" width="200" height="36" rx="6" fill="#4ade80" />
    <rect x="90" y="102" width="200" height="14" fill="#4ade80" />

    {/* Header text lines */}
    <rect
      x="112"
      y="91"
      width="80"
      height="7"
      rx="3"
      fill="white"
      fillOpacity="0.6"
    />
    <rect
      x="200"
      y="91"
      width="40"
      height="7"
      rx="3"
      fill="white"
      fillOpacity="0.3"
    />

    {/* Body text lines */}
    <rect x="112" y="134" width="156" height="7" rx="3" fill="#d1d5db" />
    <rect x="112" y="150" width="130" height="7" rx="3" fill="#e5e7eb" />
    <rect x="112" y="166" width="148" height="7" rx="3" fill="#e5e7eb" />

    <rect x="112" y="192" width="156" height="7" rx="3" fill="#d1d5db" />
    <rect x="112" y="208" width="110" height="7" rx="3" fill="#e5e7eb" />
    <rect x="112" y="224" width="140" height="7" rx="3" fill="#e5e7eb" />
    <rect x="112" y="240" width="96" height="7" rx="3" fill="#e5e7eb" />

    {/* Signature line at bottom */}
    <rect x="112" y="290" width="80" height="4" rx="2" fill="#9ca3af" />
    <rect x="112" y="302" width="50" height="3" rx="2" fill="#d1d5db" />

    {/* Red OVERDUE stamp */}
    <rect
      x="196"
      y="268"
      width="74"
      height="36"
      rx="4"
      fill="none"
      stroke="#ef4444"
      strokeWidth="2.5"
      transform="rotate(-8 233 286)"
    />
    <text
      x="210"
      y="291"
      fontSize="12"
      fontWeight="800"
      fill="#ef4444"
      transform="rotate(-8 233 286)"
      fontFamily="monospace"
      letterSpacing="1"
    >
      OVERDUE
    </text>

    {/* Floating mini papers top-right */}
    <rect
      x="292"
      y="40"
      width="62"
      height="80"
      rx="4"
      fill="white"
      stroke="#e5e7eb"
      strokeWidth="1"
      transform="rotate(12 323 80)"
    />
    <rect
      x="298"
      y="54"
      width="44"
      height="5"
      rx="2"
      fill="#e5e7eb"
      transform="rotate(12 323 80)"
    />
    <rect
      x="298"
      y="64"
      width="36"
      height="5"
      rx="2"
      fill="#f3f4f6"
      transform="rotate(12 323 80)"
    />
    <rect
      x="298"
      y="74"
      width="40"
      height="5"
      rx="2"
      fill="#f3f4f6"
      transform="rotate(12 323 80)"
    />

    {/* Floating mini paper bottom-left */}
    <rect
      x="22"
      y="290"
      width="56"
      height="72"
      rx="4"
      fill="white"
      stroke="#e5e7eb"
      strokeWidth="1"
      transform="rotate(-10 50 326)"
    />
    <rect
      x="30"
      y="304"
      width="38"
      height="5"
      rx="2"
      fill="#e5e7eb"
      transform="rotate(-10 50 326)"
    />
    <rect
      x="30"
      y="314"
      width="28"
      height="5"
      rx="2"
      fill="#f3f4f6"
      transform="rotate(-10 50 326)"
    />
    <rect
      x="30"
      y="324"
      width="34"
      height="5"
      rx="2"
      fill="#f3f4f6"
      transform="rotate(-10 50 326)"
    />

    {/* Green checkmark circle - bottom right corner, "the solution" */}
    <circle cx="298" cy="358" r="32" fill="#22c55e" />
    <polyline
      points="285,358 295,369 314,348"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function MESSAGE() {
  return (
    <section className="min-h-screen bg-green-50 flex items-center justify-center px-8 md:px-16 lg:px-24 py-20 overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: text */}
        <div className="flex-1 min-w-0">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className="font-mono text-base md:text-lg tracking-widest text-green-600 uppercase"
          >
            why this matters
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="mt-4 text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
          >
            Paper is still
            <br />
            everywhere.
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            viewport={{ once: false, amount: 0.3 }}
            className="mt-6 h-[3px] w-20 bg-green-500 rounded-full"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
            className="mt-10 space-y-6 max-w-xl"
          >
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
              Working in IT, I've seen it firsthand - businesses running on
              printed invoices, physical sign-in sheets, and folders full of
              forms that nobody can ever find. Not because they don't care, but
              because nobody's built them something better yet.
            </p>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-semibold">
              That's the gap I want to fill. Software that cuts the manual work,
              reduces the waste, and actually makes people's jobs easier.
            </p>
          </motion.div>
        </div>

        {/* Right: illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full lg:w-[420px] shrink-0 max-w-sm lg:max-w-none"
        >
          <PaperIllustration />
        </motion.div>
      </div>
    </section>
  );
}

export default MESSAGE;
