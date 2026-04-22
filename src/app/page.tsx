"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import BentoGrid from "@/components/BentoGrid";
import ThreeCanvas from "@/components/ThreeCanvas";
import Navbar from "@/components/Navbar";
import Magnetic from "@/components/Magnetic";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import LiveProjects from "@/components/LiveProjects";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/50 text-white selection:bg-primary selection:text-black overflow-hidden relative">
      <Navbar />

      {/* 3D Background */}
      <ThreeCanvas />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col justify-center items-center px-4 text-center z-10 w-full overflow-hidden">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative"
        >
          <span className="block text-primary text-sm md:text-base font-mono mb-4 tracking-[0.2em] font-medium">
             FULL STACK DEVELOPER
          </span>
          <h1 className="text-5xl md:text-8xl font-black font-syncopate tracking-tighter leading-none mb-6">
            DUMINDU <br className="md:hidden"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">DISSANAYAKE</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-400 font-light mb-10 leading-relaxed">
            Building the future at <span className="text-white font-medium">HashBaze</span>.
          </p>
          
          <div className="flex justify-center gap-4">
             <Magnetic>
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                   className="bg-primary text-black px-8 py-3 rounded-full font-bold tracking-wide relative overflow-hidden group animate-glow cursor-pointer"
                 >
                   <span className="relative z-10">WORK WITH ME</span>
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                 </motion.button>
             </Magnetic>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="text-white/30" />
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 space-y-24 md:space-y-40 pb-20">

        <section id="skills">
            <Skills />
        </section>
        
        <section id="experience">
          <ExperienceTimeline />
        </section>
        
        <section id="live">
          <LiveProjects />
        </section>

        <section id="work">
          <BentoGrid />
        </section>

        <section id="contact">
          <Contact />
        </section>
        
        {/* Footer */}
        <footer className="py-12 border-t border-white/10 text-center text-white/30 text-sm font-mono">
           © {new Date().getFullYear()} Dumindu Dissanayake. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
