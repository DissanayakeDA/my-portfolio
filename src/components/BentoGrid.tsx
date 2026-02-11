"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Star, GitFork, Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const GITHUB_USERNAME = "DissanayakeDA";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  homepage: string | null;
  updated_at: string;
}

// Language-based gradient colors
const LANG_GRADIENTS: Record<string, string> = {
  TypeScript: "from-blue-500/20 to-cyan-500/5",
  JavaScript: "from-yellow-400/20 to-orange-400/5",
  "C#": "from-purple-500/20 to-violet-500/5",
  Java: "from-red-500/20 to-orange-600/5",
  Go: "from-cyan-400/20 to-blue-400/5",
  Python: "from-green-400/20 to-yellow-400/5",
  HTML: "from-orange-500/20 to-red-500/5",
  Shell: "from-emerald-500/20 to-green-500/5",
};

const LANG_DOTS: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  "C#": "bg-purple-500",
  Java: "bg-red-500",
  Go: "bg-cyan-400",
  Python: "bg-green-400",
  HTML: "bg-orange-500",
  Shell: "bg-emerald-500",
};

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

export default function BentoGrid() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        if (!res.ok) throw new Error("Failed to fetch repos");
        const data: GitHubRepo[] = await res.json();

        // Filter out profile readme repo and forks, sort by stars then recent update
        const filtered = data
          .filter(
            (r) =>
              r.name !== GITHUB_USERNAME &&
              !r.fork
          )
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
          );

        setRepos(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold font-syncopate mb-4">
          SELECTED <span className="text-primary">WORKS</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Live from my GitHub — real projects, real code.
        </p>
      </motion.div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-400">
          <p>Failed to load repositories.</p>
          <p className="text-sm text-gray-500 mt-2">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, i) => {
            const gradient =
              LANG_GRADIENTS[repo.language || ""] ||
              "from-white/10 to-white/5";
            const langDot =
              LANG_DOTS[repo.language || ""] || "bg-gray-400";

            return (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <TiltCard className="relative group rounded-3xl p-[1px] overflow-hidden glass-panel h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                  />

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="h-full w-full bg-black/40 backdrop-blur-sm rounded-3xl p-8 flex flex-col justify-between transition-colors group-hover:bg-black/20 min-h-[220px]">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                          <Github className="w-5 h-5 text-white/70" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </div>

                      {/* Body */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                          {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                          {repo.description || "No description provided."}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-white/40 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-4">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span
                                className={`w-2.5 h-2.5 rounded-full ${langDot}`}
                              />
                              {repo.language}
                            </span>
                          )}
                          {repo.stargazers_count > 0 && (
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5" />
                              {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="flex items-center gap-1">
                              <GitFork className="w-3.5 h-3.5" />
                              {repo.forks_count}
                            </span>
                          )}
                        </div>
                        <span>{timeAgo(repo.updated_at)}</span>
                      </div>
                    </div>
                  </a>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* View All on GitHub */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-medium group"
          >
            <Github className="w-5 h-5" />
            <span>View all on GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      )}
    </section>
  );
}
