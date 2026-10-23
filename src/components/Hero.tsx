"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRef } from "react";
import Magnetic from "@/components/Magnetic";
import ProximityText from "@/components/ProximityText";
import RevealText from "@/components/RevealText";
import { useLoaded } from "@/components/Preloader";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const loaded = useLoaded();
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: loaded ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE_OUT, delay },
  });

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-between px-[var(--gutter)] pt-24 md:pt-28 pb-8 overflow-hidden"
    >
      <motion.div {...fadeIn(0.5)} className="flex justify-between label text-foreground/50">
        <span>(Full stack developer)</span>
        <span>(Based in Colombo, LK)</span>
      </motion.div>

      <motion.h1 style={{ y, opacity }} className="font-display uppercase leading-[0.82] text-[15vw] md:text-[15.5vw] whitespace-nowrap my-10">
        <RevealText
          onLoad
          stagger={0.12}
          lines={[
            <ProximityText key="1" text="Dumindu" />,
            <span key="2" className="block text-right">
              <ProximityText text="Dissanayake" />
            </span>,
          ]}
        />
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        <motion.p {...fadeIn(0.8)} className="max-w-sm text-foreground/70 text-base md:text-lg leading-snug">
          Full stack developer at <span className="text-foreground">HashBaze</span>, building web products
          that <em className="italic text-primary">move, respond</em> and scale — from interface to
          infrastructure.
        </motion.p>

        <motion.div {...fadeIn(0.9)} className="hidden md:flex flex-col items-center gap-3 label text-foreground/50">
          <span>(Scroll)</span>
          <span className="relative h-12 w-px bg-border overflow-hidden">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-primary"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: EASE_OUT }}
            />
          </span>
        </motion.div>

        <motion.div {...fadeIn(1)} className="flex md:justify-end items-center gap-5">
          <span className="label text-foreground/50 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Available for work
          </span>
          <Magnetic>
            <button
              data-cursor="Let's go"
              onClick={() => {
                const el = document.getElementById("contact");
                if (!el) return;
                if (lenis) lenis.scrollTo(el, { duration: 1.6 });
                else el.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-24 w-24 rounded-full bg-primary text-background label font-bold flex items-center justify-center text-center leading-tight hover:scale-105 transition-transform duration-500"
            >
              Work
              <br />
              with me
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
