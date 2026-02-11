"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function InteractiveRoles() {
  return (
    <section className="py-20 w-full max-w-7xl mx-auto px-4 md:px-8 flex justify-center">
      {/* Card: Trainee Engineer */}
      <motion.div 
        className="glass-panel p-10 rounded-3xl min-h-[400px] w-full max-w-2xl flex flex-col justify-between relative overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 transition-colors"
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="z-10">
          <h3 className="text-3xl md:text-4xl font-bold font-syncopate leading-tight text-white mb-2">
            TRAINEE <br/> ENGINEER
          </h3>
          <p className="text-white/60 text-lg font-light tracking-wide">@ HashBaze</p>
        </div>

        <div className="flex justify-between items-end z-10">
           <span className="text-white/40 text-sm">LEARNING & BUILDING</span>
           <motion.div 
             className="bg-white/10 p-3 rounded-full"
             whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.2)" }}
           >
             <MoveRight className="text-white w-6 h-6" />
           </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
