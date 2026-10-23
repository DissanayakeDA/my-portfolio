"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { createContext, useContext, useEffect, useState } from "react";

const LoadedContext = createContext(false);

/** True once the intro preloader has finished and the page is revealed. */
export const useLoaded = () => useContext(LoadedContext);

const DURATION = 1600;

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : DURATION;
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const start = performance.now();
    const tick = (now: number) => {
      const t = duration ? Math.min((now - start) / duration, 1) : 1;
      const eased = 1 - Math.pow(1 - t, 4);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else timeout = setTimeout(() => setLoaded(true), reduced ? 0 : 200);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (loaded) lenis.start();
    else {
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
    }
  }, [lenis, loaded]);

  return (
    <LoadedContext.Provider value={loaded}>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[100] bg-background text-foreground flex flex-col justify-between p-[var(--gutter)]"
            initial={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex justify-between label text-foreground/50">
              <span>(Portfolio / ©{new Date().getFullYear()})</span>
              <span>(Loading)</span>
            </div>

            <div className="flex items-end justify-between gap-6">
              <span className="font-display type-condensed uppercase leading-[0.8] text-[22vw] md:text-[16vw] tabular-nums">
                {progress}
                <span className="text-primary">%</span>
              </span>
              <span className="label text-foreground/50 pb-3 hidden md:block">
                Dumindu <em className="font-display not-italic text-primary">/</em> Dissanayake
              </span>
            </div>

            <div className="absolute bottom-0 left-0 h-[3px] bg-primary" style={{ width: `${progress}%` }} />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </LoadedContext.Provider>
  );
}
