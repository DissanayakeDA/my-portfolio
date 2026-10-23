"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const EXPERIENCES = [
  {
    year: "Aug 2025 — Now",
    role: "Trainee Software Engineer",
    company: "HashBaze",
    description:
      "Developing robust web applications using Next.js and modern frontend technologies. Collaborating with senior engineers to deliver scalable code.",
    current: true,
  },
  {
    year: "Feb 2023 — Now",
    role: "BSc (Hons) Information Technology",
    company: "SLIIT",
    description:
      "Undergraduate focusing on software engineering principles and full-stack development.",
    current: false,
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="px-[var(--gutter)] py-24 md:py-36">
      <SectionHeading index="05 / 06" label="Experience" title="Track" accent="record" />

      <ul className="border-t border-border">
        {EXPERIENCES.map((exp, i) => (
          <motion.li
            key={exp.role}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-b border-border py-8 md:py-12"
          >
            <span className="absolute left-0 bottom-[-1px] h-px w-full bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

            <div className="md:col-span-3 label text-foreground/50 flex items-center gap-2">
              {exp.current && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}({exp.year})
            </div>
            <div className="md:col-span-6">
              <h3 className="font-display type-condensed uppercase leading-[0.9] text-4xl md:text-6xl group-hover:text-primary transition-colors duration-500">
                {exp.role}
              </h3>
              <p className="mt-4 text-foreground/60 max-w-xl leading-relaxed">{exp.description}</p>
            </div>
            <div className="md:col-span-3 md:text-right">
              <span className="font-display italic font-light text-2xl md:text-3xl">@{exp.company}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
