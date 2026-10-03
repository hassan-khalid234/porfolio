const SKILL_GROUPS = [
  { category: "LANGUAGES", items: ["PYTHON", "SQL"] },
  { category: "ML / DATA", items: ["SCIKIT-LEARN", "PANDAS", "LINEAR REGRESSION", "LOGISTIC REGRESSION", "RANDOM FOREST", "KNN", "NAIVE BAYES"] },
  { category: "LLM / NLP", items: ["RAG PIPELINES", "GROQ API", "HUGGINGFACE", "CROSS-ENCODER RERANKING", "CHROMADB", "BM25"] },
  { category: "BACKEND", items: ["FASTAPI", "SQLITE", "N8N", "JINJA2"] },
  { category: "FRONTEND", items: ["REACT", "VITE", "TAILWIND CSS", "FRAMER MOTION"] },
  { category: "TOOLS / DEPLOY", items: ["GIT", "VERCEL", "RENDER", "STREAMLIT"] },
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-12 py-16 flex justify-center scroll-mt-20">
      <div
        className="schematic-sheet border w-full max-w-3xl px-6 py-8 md:px-10 md:py-10"
        style={{ borderColor: "var(--bp-line)" }}
      >
        <div className="flex items-baseline justify-between mb-5 font-mono text-[11px]" style={{ color: "var(--bp-line-bright)" }}>
          <span>BILL OF MATERIALS</span>
          <span style={{ color: "var(--bp-line)" }}>SHEET 06 / 09</span>
        </div>

        <div className="flex flex-col gap-5">
          {SKILL_GROUPS.map((g) => (
            <div key={g.category}>
              <div className="font-mono text-[10px] mb-2" style={{ color: "var(--bp-line)" }}>
                {g.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="border px-2 py-0.5 font-mono text-[10px]"
                    style={{ borderColor: "var(--bp-line)", color: "var(--bp-text)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}