"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const SKILLS = [
  { name: "TypeScript", area: "Language", logo: `${DEVICON}/typescript/typescript-original.svg` },
  { name: "React", area: "Frontend", logo: `${DEVICON}/react/react-original.svg` },
  { name: "Next.js", area: "Framework", logo: `${DEVICON}/nextjs/nextjs-original.svg`, invert: true },
  { name: "JavaScript", area: "Language", logo: `${DEVICON}/javascript/javascript-original.svg` },
  { name: "Angular", area: "Frontend", logo: `${DEVICON}/angular/angular-original.svg` },
  { name: "Java", area: "Backend", logo: `${DEVICON}/java/java-original.svg` },
  { name: ".NET", area: "Backend", logo: `${DEVICON}/dot-net/dot-net-original.svg` },
  { name: "Python", area: "Language", logo: `${DEVICON}/python/python-original.svg` },
  { name: "Docker", area: "DevOps", logo: `${DEVICON}/docker/docker-original.svg` },
  { name: "AWS", area: "Cloud", logo: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, invert: true },
  { name: "Azure", area: "Cloud", logo: `${DEVICON}/azure/azure-original.svg` },
];

// Horizontal "up close" gallery: drag it, or let scroll drift it sideways.
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 overflow-hidden">
      <div className="px-[var(--gutter)]">
        <SectionHeading
          index="03 / 06"
          label="Up close"
          title="The"
          accent="toolkit"
          aside="Languages, frameworks and platforms I reach for. Drag to explore."
        />
      </div>

      <div ref={trackRef} className="[perspective:1400px]">
        <motion.div style={{ x: drift }}>
          <motion.div
            drag="x"
            dragConstraints={trackRef}
            dragElastic={0.12}
            data-cursor="Drag"
            className="flex gap-5 md:gap-8 px-[var(--gutter)] w-max active:cursor-grabbing"
          >
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 60, rotateY: -25 }}
                whileInView={{ opacity: 1, y: 0, rotateY: i % 2 ? 6 : -6 }}
                whileHover={{ rotateY: 0, y: -10 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (i % 5) * 0.06 }}
                className={`group relative shrink-0 w-[62vw] sm:w-[40vw] md:w-[22vw] aspect-[3/4] bg-secondary border border-border flex flex-col justify-between p-5 md:p-6 select-none ${
                  i % 2 ? "md:mt-16" : ""
                }`}
              >
                <div className="flex justify-between label text-foreground/50">
                  <span>({String(i + 1).padStart(2, "0")})</span>
                  <span>{skill.area}</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  width={96}
                  height={96}
                  draggable={false}
                  loading="lazy"
                  className={`mx-auto h-20 w-20 md:h-24 md:w-24 object-contain grayscale group-hover:grayscale-0 transition-[filter] duration-500 ${
                    skill.invert ? "invert" : ""
                  }`}
                />
                <span className="font-display type-condensed uppercase text-4xl md:text-5xl leading-none group-hover:text-primary transition-colors duration-500">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
