"use client";

import { motion } from "framer-motion";
import React from "react";

const SKILLS = [
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    color: "from-yellow-400/20 to-yellow-600/5",
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    color: "from-red-500/20 to-red-700/5",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "from-blue-400/20 to-yellow-400/5",
  },
  {
    name: ".NET",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg",
    color: "from-purple-500/20 to-purple-700/5",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "from-cyan-400/20 to-blue-500/5",
  },
  {
    name: "Angular",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
    color: "from-red-600/20 to-red-800/5",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    color: "from-blue-600/20 to-blue-800/5",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    color: "from-blue-500/20 to-cyan-500/5",
  },
  {
    name: "AWS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "from-orange-500/20 to-yellow-500/5",
  },
  {
    name: "Azure",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    color: "from-blue-600/20 to-indigo-600/5",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="space-y-12"
      >
        <div className="text-center">
          <motion.h2
            variants={item}
            className="text-4xl md:text-6xl font-bold font-syncopate mb-6"
          >
            TECHNICAL <span className="text-primary">SKILLS</span>
          </motion.h2>
          <motion.p
            variants={item}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            A curated list of technologies I use to build digital products.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`}
              />

              <div className="relative h-full bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-white/20 transition-colors">
                <div className="w-14 h-14 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain drop-shadow-lg"
                    loading="lazy"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {skill.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
