"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { useMotionPause } from "@/components/MotionPause";
import { GITHUB_USERNAME, type Project } from "@/lib/projects";

const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

function Preview({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);

  if (project.image && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={`${project.title} preview`}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  // Typographic poster: live projects get the accent fill, repos a muted one
  const domain = new URL(project.href).hostname;
  return (
    <div
      className={`@container absolute inset-0 flex flex-col justify-between p-6 ${
        project.live ? "bg-primary text-background" : "bg-secondary text-foreground"
      }`}
    >
      <div className="flex items-center justify-between label">
        <span>({domain})</span>
        {project.live && (
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" /> Live
          </span>
        )}
      </div>
      <span className="font-display type-wide uppercase leading-[0.9] text-[7.5cqw]">
        {project.title}
      </span>
    </div>
  );
}

function WorkRow({
  project,
  index,
  total,
  active,
  onActive,
}: {
  project: Project;
  index: number;
  total: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Open"
      className="group block border-t border-border py-8 lg:py-0 lg:min-h-[42vh] lg:flex lg:flex-col lg:justify-center"
    >
      <div className="flex justify-between label text-foreground/50 mb-3">
        <span>
          ({String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}) — {project.category}
        </span>
        <span className="flex items-center gap-2">
          {project.live && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
          {project.year}
        </span>
      </div>
      <h3
        className={`font-display type-condensed uppercase leading-[0.88] text-[12vw] lg:text-[5.4vw] break-words origin-left transition-[opacity,transform,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-primary ${
          active ? "lg:opacity-100 lg:scale-100" : "lg:opacity-25 lg:scale-[0.92]"
        }`}
      >
        {project.title}
        <ArrowUpRight className="inline-block ml-2 h-[0.45em] w-[0.45em] align-top mt-[0.1em] text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
      </h3>

      {/* Inline preview on small screens; large screens use the sticky panel */}
      <div className="lg:hidden mt-6">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          <Preview project={project} />
        </div>
        <p className="mt-4 text-foreground/60 text-sm leading-relaxed">{project.description}</p>
      </div>
    </a>
  );
}

export default function SelectedWork({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const { paused, toggle } = useMotionPause();

  const current = projects[Math.min(active, projects.length - 1)];
  const total = projects.length;

  return (
    <section className="px-[var(--gutter)] py-24 md:py-36">
      <SectionHeading
        index="01 / 06"
        label="Selected work"
        title="Selected"
        accent="work"
        aside="Live products and open-source code — real projects, shipped and maintained."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 border-b border-border">
          {projects.map((p, i) => (
            <WorkRow key={p.key} project={p} index={i} total={total} active={i === active} onActive={setActive} />
          ))}
        </div>

        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-28 flex flex-col gap-5">
            <div className="flex justify-between label text-foreground/50">
              <span className="tabular-nums">
                ({String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")})
              </span>
              <button onClick={toggle} className="label hover:text-primary transition-colors" aria-pressed={paused}>
                ({paused ? "Play motion" : "Pause motion"})
              </button>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.key}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
                  animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.4 } }}
                  transition={{ duration: 0.9, ease: EASE_IN_OUT }}
                >
                  <Preview project={current} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="h-[2px] w-full bg-border">
              <motion.div
                className="h-full bg-primary origin-left"
                animate={{ scaleX: (active + 1) / total }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-foreground/70 leading-relaxed">{current.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {current.tags.map((t) => (
                    <span key={t} className="label text-foreground/60 border border-border rounded-full px-3 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <a
        href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 mt-10 label text-foreground hover:text-primary transition-colors"
      >
        (View all on GitHub)
        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </section>
  );
}
