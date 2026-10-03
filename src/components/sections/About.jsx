import TitleBlock from "../primitives/TitleBlock";

export default function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-16 flex justify-center scroll-mt-20">
      <div
        className="schematic-sheet border w-full max-w-3xl px-6 py-8 md:px-10 md:py-10"
        style={{ borderColor: "var(--bp-line)" }}
      >
        <div className="flex items-baseline justify-between mb-4 font-mono text-[11px]" style={{ color: "var(--bp-line-bright)" }}>
          <span>ABOUT</span>
          <span style={{ color: "var(--bp-line)" }}>SHEET 01 / 09</span>
        </div>

        <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-sans)", color: "var(--bp-text)" }}>
          Final-year IT student at the University of Management and Technology,
          Lahore, building toward a career as an AI/LLM Application Engineer.
          Hands-on experience spans retrieval-augmented generation pipelines,
          applied NLP, and end-to-end ML workflows — from a framework-free RAG
          system to a completed machine-learning internship with Big Brains
          Learning. Drawn to the engineering side of AI: not just training
          models, but shipping them as real, usable systems.
        </p>

        <TitleBlock
          bare
          fields={[
            { label: "LOCATION", value: "Lahore, Pakistan" },
            { label: "FOCUS", value: "AI / LLM Application Engineering" },
            { label: "STATUS", value: "Final-Year IT Student, UMT — graduating 2027" },
          ]}
        />
      </div>
    </section>
  );
}