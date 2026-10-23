"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Magnetic from "@/components/Magnetic";
import LocalTime from "@/components/LocalTime";
import RollText from "@/components/RollText";
import RevealText from "@/components/RevealText";

const SECTIONS = ["Work", "About", "Skills", "Services", "Experience", "Contact"];

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/DissanayakeDA" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/dumindu-dissanayake-24168b31a/" },
  { name: "Email", href: "mailto:dumindudissanayake2k01@gmail.com" },
];

export default function Footer() {
  const lenis = useLenis();

  return (
    <footer className="relative px-[var(--gutter)] pt-20 pb-8 border-t border-border overflow-hidden">
      <div className="flex justify-between label text-foreground/50 mb-10">
        <span>(Got a project?)</span>
        <span>(Say hello)</span>
      </div>

      <Magnetic>
        <a
          href="mailto:dumindudissanayake2k01@gmail.com"
          data-cursor="Let's go"
          className="block font-display uppercase leading-[0.8] text-primary text-[24vw] md:text-[19vw] whitespace-nowrap transition-[font-variation-settings] duration-700 [font-variation-settings:'wdth'_68,'wght'_850] hover:[font-variation-settings:'wdth'_80,'wght'_500]"
        >
          <RevealText lines={["Let's talk"]} />
        </a>
      </Magnetic>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-8 label text-foreground/50"
      >
        <div className="space-y-2">
          <p>(Local time)</p>
          <p className="text-foreground">
            <LocalTime />
          </p>
        </div>
        <nav aria-label="Sections" className="space-y-2">
          <p>(Index)</p>
          <ul className="space-y-1">
            {SECTIONS.map((s) => (
              <li key={s}>
                <a
                  href={`#${s.toLowerCase()}`}
                  onClick={(e) => {
                    const el = document.getElementById(s.toLowerCase());
                    if (!el || !lenis) return;
                    e.preventDefault();
                    lenis.scrollTo(el, { duration: 1.6 });
                  }}
                  className="group text-foreground hover:text-primary transition-colors"
                >
                  <RollText>{s}</RollText>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2">
          <p>(Socials)</p>
          <ul className="space-y-1">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group text-foreground hover:text-primary transition-colors"
                >
                  <RollText>{s.name}</RollText>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <p>(Version)</p>
          <p className="text-foreground">©{new Date().getFullYear()} Dumindu Dissanayake</p>
        </div>
        <div className="md:text-right">
          <button
            onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
            className="group label text-foreground hover:text-primary transition-colors"
          >
            (<RollText>Back to top</RollText>) ↑
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
