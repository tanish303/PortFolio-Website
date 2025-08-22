import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { Education } from "@/components/sections/education"
import { Guestbook } from "@/components/sections/guestbook"
import { Contact } from "@/components/sections/contact"
import { Navigation } from "@/components/navigation"
import { FixedButtons } from "@/components/fixed-buttons"

export default function Portfolio() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Fixed Action Buttons */}
      <FixedButtons />

      {/* Page Sections */}
      <div className="relative">
        <section id="home">
          <Hero />
        </section>

        <div className="section-divider" />

        <section id="projects">
          <Projects />
        </section>

        <div className="section-divider" />

        <section id="skills">
          <Skills />
        </section>

        <div className="section-divider" />

        <section id="experience">
          <Experience />
        </section>

        <div className="section-divider" />

        <section id="education">
          <Education />
        </section>

        <div className="section-divider" />

        <section id="guestbook">
          <Guestbook />
        </section>

        <div className="section-divider" />

        <section id="contact">
          <Contact />
        </section>
      </div>
    </main>
  )
}
