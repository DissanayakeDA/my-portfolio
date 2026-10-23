"use client";

import { motion } from "framer-motion";
import { useLoaded } from "@/components/Preloader";

type Props = {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount (after the preloader) instead of when scrolled into view */
  onLoad?: boolean;
};

// Each line slides up from behind a clipping mask, Awwwards-style.
export default function RevealText({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  onLoad = false,
}: Props) {
  const loaded = useLoaded();

  return (
    <span className={className}>
      {lines.map((line, i) => {
        const transition = {
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1] as const,
          delay: delay + i * stagger,
        };
        return (
          <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className={`block will-change-transform ${lineClassName ?? ""}`}
              initial={{ y: "110%", rotate: 3 }}
              {...(onLoad
                ? { animate: loaded ? { y: "0%", rotate: 0 } : undefined }
                : {
                    whileInView: { y: "0%", rotate: 0 },
                    viewport: { once: true, margin: "-10% 0px" },
                  })}
              transition={transition}
            >
              {line}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
