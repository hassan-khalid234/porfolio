import GridBackground from "./components/primitives/GridBackground";
import Hero from "./components/sections/Hero";

export default function App() {
  return (
    <div style={{ color: "var(--bp-text)" }}>
      <GridBackground />
      <Hero />
      <div style={{ height: "150vh" }} /> {/* scroll room to test */}
    </div>
  );
}