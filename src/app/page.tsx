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
import { getProjects } from "@/lib/projects";

// Re-render at most hourly so GitHub repos stay fresh without hitting rate limits
export const revalidate = 3600;

const MARQUEE_WORDS = ["Build", "Motion", "Next.js", "Interfaces", "APIs", "Cloud", "Ship"];

export default async function Home() {
  const projects = await getProjects();

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

      <div id="work" className="scroll-mt-16">
        <SelectedWork projects={projects} />
      </div>

      <div id="about" className="scroll-mt-16">
        <About />
      </div>

      <div id="skills" className="scroll-mt-16">
        <Skills />
      </div>

      <div id="services" className="scroll-mt-16">
        <Services />
      </div>

      <div id="experience" className="scroll-mt-16">
        <ExperienceTimeline />
      </div>

      <div id="contact" className="scroll-mt-16">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
