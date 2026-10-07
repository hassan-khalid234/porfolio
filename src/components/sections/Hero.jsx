import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import DimensionLine from "../primitives/DimensionLine";
import { useNavigate } from "react-router-dom";
import GlassButton from "../primitives/GlassButton";

const RESUME_URL = "/resume.pdf";

export default function Hero() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const w = 520, h = 140;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div
        className="schematic-sheet border w-full max-w-2xl px-6 py-10 md:px-10 md:py-14 flex flex-col items-center gap-8"
        style={{ borderColor: "var(--bp-line)" }}
      >
        <div className="w-full flex items-baseline justify-between font-mono text-[10px]" style={{ color: "var(--bp-line)" }}>
          <span>COVER SHEET</span>
          <span>SHEET 00 / 09</span>
        </div>

        <h1 className="sr-only">
          Muhammad Hassan — AI/LLM Application Engineer
        </h1>

        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="overflow-visible w-full"
          style={{ maxWidth: 480, height: "auto" }}
          aria-hidden="true"
        >
          <motion.rect
            x={4} y={4} width={w - 8} height={h - 8}
            fill="none" stroke="var(--bp-line)" strokeWidth="1"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 1.4, ease: "easeInOut" }}
          />
          <motion.text
            x={w / 2} y={h / 2 - 6} textAnchor="middle"
            fontFamily="var(--font-sans)" fontWeight="700" fontSize="34"
            fill="var(--bp-text)"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduce ? { duration: 0 } : { delay: 1.1, duration: 0.6 }}
          >
            MUHAMMAD HASSAN
          </motion.text>
          <motion.text
            x={w / 2} y={h / 2 + 24} textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="13" letterSpacing="2"
            fill="var(--bp-line-bright)"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduce ? { duration: 0 } : { delay: 1.3, duration: 0.6 }}
          >
            AI/LLM APPLICATION ENGINEER
          </motion.text>
        </svg>

        <div className="w-full flex justify-center" style={{ maxWidth: 480 }}>
          <DimensionLine label="EST. 2027 — FINAL YEAR, UMT LAHORE" length={320} />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <GlassButton accent onActivate={() => navigate("/projects")}>
            VIEW PROJECTS
          </GlassButton>
          <GlassButton onActivate={() => window.open(RESUME_URL, "_blank", "noopener,noreferrer")}>
            VIEW RESUME / CV
          </GlassButton>
        </div>
      </div>
    </section>
  );
}