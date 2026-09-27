import GridBackground from "./components/primitives/GridBackground";
import SectionDivider from "./components/primitives/SectionDivider";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <div style={{ color: "var(--bp-text)" }}>
      <GridBackground />
      <Hero />
      <SectionDivider label="PROJECTS — SHEETS 01–04" />
      <Projects />
      <SectionDivider label="TITLE BLOCK" />
      <Contact />
    </div>
  );
}