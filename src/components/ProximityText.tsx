"use client";

import { useEffect, useRef } from "react";
import { useMotionPause } from "@/components/MotionPause";

const BASE = { wdth: 68, wght: 850 };
const PEAK = { wdth: 112, wght: 300 };
const RADIUS = 320;

// Splits text into letters whose variable-font width/weight swell as the cursor approaches.
export default function ProximityText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { paused } = useMotionPause();

  useEffect(() => {
    const root = ref.current;
    if (!root || paused) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-letter]"));
    const current = letters.map(() => ({ ...BASE }));
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let running = false;

    const frame = () => {
      let moving = false;
      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const dx = mouse.x - (r.left + r.width / 2);
        const dy = mouse.y - (r.top + r.height / 2);
        const t = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
        const eased = t * t * (3 - 2 * t);
        const target = {
          wdth: BASE.wdth + (PEAK.wdth - BASE.wdth) * eased,
          wght: BASE.wght + (PEAK.wght - BASE.wght) * eased,
        };
        const c = current[i];
        c.wdth += (target.wdth - c.wdth) * 0.15;
        c.wght += (target.wght - c.wght) * 0.15;
        if (Math.abs(target.wdth - c.wdth) > 0.1 || Math.abs(target.wght - c.wght) > 0.5) moving = true;
        el.style.fontVariationSettings = `"wdth" ${c.wdth.toFixed(1)}, "wght" ${c.wght.toFixed(0)}`;
      });
      if (moving) raf = requestAnimationFrame(frame);
      else running = false;
    };

    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      kick();
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
      kick();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", kick, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", kick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      letters.forEach((el) => (el.style.fontVariationSettings = ""));
    };
  }, [paused]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} data-letter aria-hidden className="inline-block type-condensed">
          {ch}
        </span>
      ))}
    </span>
  );
}
