"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, useState } from "react";

const MotionPauseContext = createContext<{ paused: boolean; toggle: () => void }>({
  paused: false,
  toggle: () => {},
});

/** Global "(PAUSE MOTION)" switch: stops ambient loops and makes transitions instant. */
export const useMotionPause = () => useContext(MotionPauseContext);

export default function MotionPauseProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <MotionPauseContext.Provider value={{ paused, toggle: () => setPaused((p) => !p) }}>
      <MotionConfig reducedMotion={paused ? "always" : "user"}>{children}</MotionConfig>
    </MotionPauseContext.Provider>
  );
}
