"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";
import RollText from "@/components/RollText";
import LocalTime from "@/components/LocalTime";
import { useLoaded } from "@/components/Preloader";

const navLinks = [
  { name: "Work", href: "work" },
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Services", href: "services" },
  { name: "Experience", href: "experience" },
  { name: "Contact", href: "contact" },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export function Logo() {
  return (
    <span className="inline-flex items-baseline gap-1 text-lg md:text-xl leading-none">
      <span className="font-display type-condensed uppercase tracking-tight">Dumindu</span>
      <span className="font-display italic font-light">
        <span className="bg-primary text-background px-[3px] not-italic font-medium">d</span>issanayake
      </span>
    </span>
  );
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const loaded = useLoaded();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 200);
    setScrolled(latest > 50);
  });

  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [lenis, menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    // Wait a tick so Lenis is restarted after the menu closes
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(el, { duration: 1.6 });
      else el.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: "-100%" }}
        animate={{ y: !loaded || (hidden && !menuOpen) ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className={`fixed top-0 inset-x-0 z-[60] transition-[background-color,border-color] duration-500 border-b ${
          scrolled && !menuOpen
            ? "bg-background/80 backdrop-blur-md border-border"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="px-[var(--gutter)] h-16 md:h-20 grid grid-cols-2 md:grid-cols-3 items-center">
          <Magnetic>
            <button
              onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
              className="text-foreground"
              aria-label="Back to top"
            >
              <Logo />
            </button>
          </Magnetic>

          <span className="hidden md:block text-center label text-foreground/50">
            (Portfolio / ©{new Date().getFullYear()})
          </span>

          <div className="flex items-center justify-end gap-6">
            <span className="hidden lg:inline label text-foreground/50">
              Colombo — <LocalTime />
            </span>
            <Magnetic>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                className="group label text-foreground"
              >
                (<RollText>{menuOpen ? "Close" : "Menu"}</RollText>)
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: EASE_IN_OUT }}
            className="fixed inset-0 z-50 bg-background flex flex-col justify-between px-[var(--gutter)] pt-24 md:pt-28 pb-8"
          >
            <ul className="border-t border-border">
              {navLinks.map((link, i) => (
                <li key={link.name} className="border-b border-border overflow-hidden">
                  <motion.button
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 + i * 0.06 }}
                    onClick={() => scrollTo(link.href)}
                    className="group w-full flex items-center justify-between py-1 md:py-0 text-left"
                  >
                    <span
                      className="font-display uppercase leading-[0.95] text-[13vw] md:text-[7.2vw] text-foreground group-hover:text-primary transition-[font-variation-settings,color] duration-700 [font-variation-settings:'wdth'_68,'wght'_850] group-hover:[font-variation-settings:'wdth'_125,'wght'_150]"
                    >
                      {link.name}
                    </span>
                    <span className="label text-foreground/40 group-hover:text-primary transition-colors">
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="flex flex-col md:flex-row md:justify-between gap-2 label text-foreground/50"
            >
              <a href="mailto:dumindudissanayake2k01@gmail.com" className="hover:text-primary transition-colors">
                dumindudissanayake2k01@gmail.com
              </a>
              <span>
                Colombo — <LocalTime />
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
