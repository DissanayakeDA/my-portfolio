"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";

interface LiveProject {
  name: string;
  description: string;
  url: string;
  displayUrl: string;
  tags: string[];
  gradient: string;
}

const LIVE_PROJECTS: LiveProject[] = [
  {
    name: "OnlinePhysics.lk",
    description:
      "A comprehensive online physics learning platform for Sri Lankan students, offering interactive lessons, practice problems, and resources aligned with the local curriculum.",
    url: "https://onlinephysics.lk",
    displayUrl: "onlinephysics.lk",
    tags: ["Education", "Physics", "Sri Lanka", "E-Learning"],
    gradient: "from-blue-500/30 to-cyan-500/10",
  },
];

export default function LiveProjects() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold font-syncopate mb-4">
          LIVE <span className="text-primary">PROJECTS</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Real products, live in production and serving real users.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {LIVE_PROJECTS.map((project, i) => (
          <motion.div
            key={project.url}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative group rounded-3xl p-[1px] overflow-hidden glass-panel"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
            />

            <div className="h-full w-full bg-black/40 backdrop-blur-sm rounded-3xl overflow-hidden">
              {/* Browser mockup bar */}
              <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 bg-white/5 rounded-md px-3 py-1 text-xs text-white/40 font-mono flex items-center gap-2">
                  <Globe className="w-3 h-3 shrink-0" />
                  <span className="truncate">{project.displayUrl}</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  LIVE
                </span>
              </div>

              {/* Card content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-full text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-black px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:bg-white transition-colors group/link"
                >
                  Visit Site
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
