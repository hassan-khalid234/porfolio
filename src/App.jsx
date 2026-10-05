import GridBackground from "./components/primitives/GridBackground";
import SheetFrame from "./components/primitives/SheetFrame";
import Header from "./components/primitives/Header";
import SectionDivider from "./components/primitives/SectionDivider";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Timeline from "./components/sections/Timeline";
import Contact from "./components/sections/Contact";
import BottomNav from "./components/primitives/BottomNav";

export default function App() {
  return (
    <div style={{ color: "var(--bp-text)" }}>
      <GridBackground />
      <SheetFrame />
      <Header />
      <BottomNav />
      <Hero />
      <SectionDivider label="ABOUT" />
      <About />
      <SectionDivider label="PROJECTS — SHEETS 02–05" />
      <Projects />
      <SectionDivider label="SKILLS & TIMELINE" />
      <Skills />
      <Timeline />
      <SectionDivider label="TITLE BLOCK" />
      <Contact />
    </div>
  );
}