"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";

// Bracketed caption row "(02 / 06) ——— (SELECTED WORK)" above a giant condensed title.
export default function SectionHeading({
  index,
  label,
  title,
  accent,
  aside,
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="flex items-center gap-4 label text-foreground/50 mb-6">
        <span>({index})</span>
        <motion.span
          className="h-px bg-border flex-1 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <span>({label})</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <h2 className="font-display type-condensed uppercase leading-[0.85] text-[17vw] md:text-[10vw] xl:text-[9rem]">
          <RevealText
            lines={[
              title,
              ...(accent
                ? [
                    <span key="a" className="type-wide italic text-primary normal-case">
                      {accent}
                    </span>,
                  ]
                : []),
            ]}
          />
        </h2>
        {aside && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs text-foreground/55 text-sm md:text-base leading-relaxed md:pb-3"
          >
            {aside}
          </motion.div>
        )}
      </div>
    </div>
  );
}
