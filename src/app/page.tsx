"use client";

import { Fragment } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const MARQUEE_WORDS = ["Build", "Motion", "Next.js", "Interfaces", "APIs", "Cloud", "Ship"];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />

      <Hero />

      <div className="border-y border-border py-5 md:py-7">
        <Marquee baseVelocity={-1.5}>
          {MARQUEE_WORDS.map((w) => (
            <Fragment key={w}>
              <span className="font-display italic font-light text-5xl md:text-8xl leading-none px-6 md:px-10">
                {w}
              </span>
              <span className="text-primary text-2xl md:text-4xl self-center" aria-hidden>
                ◆
              </span>
            </Fragment>
          ))}
        </Marquee>
      </div>

      <section id="work">
        <SelectedWork />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="experience">
        <ExperienceTimeline />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
