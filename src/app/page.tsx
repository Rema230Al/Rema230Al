import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Beyond from "@/components/sections/Beyond";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Beyond />
      {/* clips Contact's planet horizon, which can sink into the footer and below the page bottom */}
      <div className="relative overflow-hidden">
        <Contact />
        <Footer />
      </div>
    </>
  );
}
