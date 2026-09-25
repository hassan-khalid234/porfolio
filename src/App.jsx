import GridBackground from "./components/primitives/GridBackground";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <div style={{ color: "var(--bp-text)" }}>
      <GridBackground />
      <Hero />
      <Projects />
      <Contact />
    </div>
  );
}