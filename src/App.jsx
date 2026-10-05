import { HashRouter, Routes, Route } from "react-router-dom";
import GridBackground from "./components/primitives/GridBackground";
import SheetFrame from "./components/primitives/SheetFrame";
import Header from "./components/primitives/Header";
import BottomNav from "./components/primitives/BottomNav";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <HashRouter>
      <div style={{ color: "var(--bp-text)" }}>
        <GridBackground />
        <SheetFrame />
        <Header />
        <BottomNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}