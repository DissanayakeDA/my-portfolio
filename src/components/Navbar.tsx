"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Link } from "react-scroll"; 
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "hero" },
  { name: "Skills", href: "skills" },
  { name: "Experience", href: "experience" },
  { name: "Live", href: "live" },
  { name: "Work", href: "work" },
  { name: "Contact", href: "contact" },
];

import Magnetic from "@/components/Magnetic";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/50 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Magnetic>
            <a href="#" className="text-xl md:text-2xl font-bold font-syncopate tracking-tighter text-white inline-block">
              DD<span className="text-primary">.</span>
            </a>
          </Magnetic>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Magnetic key={link.name}>
                <Link
                  to={link.href}
                  smooth={true}
                  duration={500}
                  className="text-sm font-light tracking-widest text-white/70 hover:text-primary transition-colors uppercase cursor-pointer block px-2"
                >
                  {link.name}
                </Link>
              </Magnetic>
            ))}
            <Magnetic>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 cursor-pointer"
              >
                Let&apos;s Talk
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center gap-8"
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            smooth={true}
            duration={500}
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-syncopate font-bold text-white hover:text-primary transition-colors cursor-pointer"
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="contact"
          smooth={true}
          duration={500}
          onClick={() => setMobileMenuOpen(false)}
          className="mt-8 bg-primary text-black px-8 py-3 rounded-full font-bold tracking-widest uppercase cursor-pointer"
        >
          Let&apos;s Talk
        </Link>
      </motion.div>
    </>
  );
}
