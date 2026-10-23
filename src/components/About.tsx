"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type Word = { text: string; style?: "italic" | "accent" };

// "*word*" → italic, "#word" → accent colour
const COPY =
  "I'm Dumindu — a full stack developer based in #Colombo. I design and build web products that *move,* *respond* and hold up in production. At HashBaze I ship Next.js interfaces and the services behind them, while studying the engineering underneath at SLIIT.";

const WORDS: Word[] = COPY.split(" ").map((raw) => {
  if (raw.startsWith("*") && raw.includes("*", 1)) return { text: raw.replace(/\*/g, ""), style: "italic" };
  if (raw.startsWith("#")) return { text: raw.slice(1), style: "accent" };
  return { text: raw };
});

function ScrubWord({
  word,
  progress,
  range,
}: {
  word: Word;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const cls =
    word.style === "italic"
      ? "italic type-wide text-[0.92em]"
      : word.style === "accent"
        ? "text-primary"
        : "";
  return (
    <motion.span style={{ opacity }} className={`inline-block mr-[0.25em] ${cls}`}>
      {word.text}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  return (
    <section className="px-[var(--gutter)] py-24 md:py-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3 label text-foreground/50 flex md:flex-col gap-4 md:gap-2">
          <span>(02 / 06)</span>
          <span>(Hello)</span>
        </div>
        <p
          ref={ref}
          className="md:col-span-9 font-display font-medium text-[7.5vw] md:text-[4.2vw] leading-[1.08] tracking-[-0.02em]"
        >
          {WORDS.map((w, i) => (
            <ScrubWord
              key={i}
              word={w}
              progress={scrollYProgress}
              range={[i / WORDS.length, (i + 1) / WORDS.length]}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
