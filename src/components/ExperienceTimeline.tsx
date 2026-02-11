"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EXPERIENCES = [
  {
    year: "Aug 2025 - Present",
    role: "Trainee Software Engineer",
    company: "HashBaze",
    description: "Developing robust web applications using Next.js and modern frontend technologies. Collaborating with senior engineers to deliver scalable code.",
    highlight: true,
  },
  {
    year: "Feb 2023 - Present",
    role: "Undergraduate",
    company: "SLIIT",
    description: "BSc (Hons) in Information Technology. Focusing on software engineering principles and full-stack development.",
    highlight: false,
  },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold font-syncopate text-center mb-24 text-white"
      >
        EXPERIENCE
      </motion.h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Central Line Background */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />
        
        {/* Glowing Progress Line */}
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent -translate-x-1/2 shadow-[0_0_15px_#FF6B00] z-0"
        />

        <div className="space-y-24">
          {EXPERIENCES.map((exp, index) => (
            <div 
              key={index}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 z-10 -translate-x-1/2 flex items-center justify-center
                  ${exp.highlight ? "bg-black border-primary shadow-[0_0_20px_#FF6B00]" : "bg-black border-white/50"}`}
              >
                {exp.highlight && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
              </motion.div>

              {/* Content Card */}
              <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 text-right"}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`p-8 rounded-2xl glass-panel border hover:border-primary/30 transition-all duration-300 group
                    ${exp.highlight ? "border-primary/20 shadow-[0_0_30px_-10px_rgba(255,107,0,0.15)]" : "border-white/5"}`}
                >
                  <span className="text-primary font-mono text-sm tracking-widest">{exp.year}</span>
                  <h3 className="text-2xl font-bold text-white mt-2 mb-1 font-syncopate">{exp.role}</h3>
                  <div className="text-white/60 font-medium mb-4">{exp.company}</div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
