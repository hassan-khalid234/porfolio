import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import DimensionLine from "../primitives/DimensionLine";

const RESUME_URL = "/resume.pdf";

export default function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { delay, duration: 0.6, ease: "easeOut" },
  });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center px-4 pt-20 pb-16 gap-6 text-center"
    >
      <motion.h1
        {...fadeUp(0.1)}
        className="font-bold"
        style={{ fontFamily: "var(--font-sans)", color: "var(--bp-text)", fontSize: "clamp(2rem, 6vw, 3rem)" }}
      >
        MUHAMMAD HASSAN
      </motion.h1>

      <motion.p
        {...fadeUp(0.3)}
        className="font-mono text-sm tracking-widest"
        style={{ color: "var(--bp-line-bright)" }}
      >
        AI/LLM APPLICATION ENGINEER
      </motion.p>

      <motion.div {...fadeUp(0.45)}>
        <DimensionLine label="EST. 2027 — FINAL YEAR, UMT LAHORE" length={320} />
      </motion.div>

      <motion.p
        {...fadeUp(0.6)}
        className="max-w-xl text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-sans)", color: "var(--bp-text)" }}
      >
        Final-year IT student building toward a career as an AI/LLM
        Application Engineer. Hands-on with retrieval-augmented generation
        pipelines, applied NLP, and end-to-end ML workflows — from a
        framework-free RAG system to a completed machine-learning
        internship.
      </motion.p>

      <motion.div {...fadeUp(0.75)} className="flex flex-wrap justify-center gap-3 mt-2">
        <Link to="/projects" className="cta-btn cta-btn-primary">VIEW PROJECTS</Link>
        <a href={RESUME_URL} target="_blank" rel="noreferrer" className="cta-btn">VIEW RESUME / CV</a>
      </motion.div>
    </section>
  );
}