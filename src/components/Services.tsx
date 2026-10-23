"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import SectionHeading from "@/components/SectionHeading";

const SERVICES = [
  {
    title: "Frontend",
    body: "Fast, accessible interfaces in React, Next.js and Angular — with motion that serves the content.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Backend",
    body: "APIs and services in Java, .NET and Node that are typed, tested and easy to change.",
    tags: ["Java", ".NET", "REST"],
  },
  {
    title: "Cloud",
    body: "Containerised deployments on AWS and Azure, with CI/CD that keeps shipping boring.",
    tags: ["Docker", "AWS", "Azure"],
  },
  {
    title: "Product",
    body: "From idea to live product — scoping, building and iterating with real users, like OnlinePhysics.lk.",
    tags: ["MVPs", "E-Learning", "SEO"],
  },
];

export default function Services() {
  const lenis = useLenis();
  const goContact = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.6 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="px-[var(--gutter)] py-24 md:py-36">
      <SectionHeading index="04 / 06" label="Services" title="What I" accent="do" />

      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
        {SERVICES.map((s, i) => (
          <motion.button
            key={s.title}
            onClick={goContact}
            data-cursor="Open"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.12 }}
            className="group relative text-left border-r border-b border-border p-6 md:p-10 min-h-[320px] md:min-h-[420px] flex flex-col justify-between overflow-hidden"
          >
            {/* Blue fill wipes up on hover */}
            <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

            <div className="relative flex justify-between items-start label text-foreground/50 group-hover:text-background transition-colors duration-500">
              <span>({String(i + 1).padStart(2, "0")})</span>
              <span className="relative block h-6 w-6 overflow-hidden text-xl leading-none text-foreground group-hover:text-background">
                <span className="absolute inset-0 transition-transform duration-500 group-hover:translate-x-full group-hover:-translate-y-full">
                  ↗
                </span>
                <span className="absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0">
                  →
                </span>
              </span>
            </div>

            <div className="relative">
              <h3 className="font-display type-condensed uppercase leading-[0.85] text-[16vw] md:text-[7vw] text-foreground group-hover:text-background transition-colors duration-500">
                {s.title}
              </h3>
              <p className="mt-4 max-w-md text-foreground/60 group-hover:text-background/80 transition-colors duration-500">
                {s.body}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="label border border-border group-hover:border-background/30 text-foreground/60 group-hover:text-background rounded-full px-3 py-1 transition-colors duration-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
