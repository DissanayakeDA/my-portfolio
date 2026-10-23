"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { useMotionPause } from "@/components/MotionPause";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Infinite marquee whose speed and direction follow scroll velocity.
export default function Marquee({
  children,
  baseVelocity = -2,
  className,
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);
  const { paused } = useMotionPause();

  useAnimationFrame((_, delta) => {
    if (paused) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className ?? ""}`}>
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
