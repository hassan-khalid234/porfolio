import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Projects from "../components/sections/Projects";

export default function ProjectsPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="pb-24 md:pb-0">
      <Projects />
    </div>
  );
}