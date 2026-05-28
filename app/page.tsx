import { Nav } from "@/components/layout/nav";
import { Hero } from "@/components/sections/hero";
import { AboutSummary } from "@/components/sections/about-summary";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Achievements } from "@/components/sections/achievements";
import { Testimonials } from "@/components/sections/testimonials";
// import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AboutSummary />
      <Projects />
      <Experience />
      <Skills />
      <Achievements />
      <Testimonials />
      <Contact />
    </main>
  );
}
