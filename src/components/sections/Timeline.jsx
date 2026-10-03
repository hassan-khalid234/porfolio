const TIMELINE = [
  { rev: "01", date: "2023 — PRESENT", title: "B.S. Information Technology", desc: "University of Management and Technology (UMT), Lahore — final year, expected graduation 2027." },
  { rev: "02", date: "2026", title: "Applied Machine Learning Coursework", desc: "Supervised learning: regression, random forest, KNN, Naive Bayes — implemented in scikit-learn." },
  { rev: "03", date: "SEP 2026", title: "ML Internship — Big Brains Learning", desc: "Model training/evaluation, data cleaning and preprocessing, applied research. Certificate and letter of recommendation." },
  { rev: "04", date: "2026", title: "Project Deliverables", desc: "Shipped RAG Copilot, Mood Mirror, AI Subscription Intelligence System, and the Medical Insurance Cost Prediction pipeline." },
];

export default function Timeline() {
  return (
    <section id="timeline" className="px-6 md:px-12 py-16 flex justify-center scroll-mt-20">
      <div
        className="schematic-sheet border w-full max-w-3xl px-6 py-8 md:px-10 md:py-10"
        style={{ borderColor: "var(--bp-line)" }}
      >
        <div className="flex items-baseline justify-between mb-6 font-mono text-[11px]" style={{ color: "var(--bp-line-bright)" }}>
          <span>REVISION HISTORY</span>
          <span style={{ color: "var(--bp-line)" }}>SHEET 07 / 09</span>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-[7px] top-1 bottom-1 w-px" style={{ backgroundColor: "var(--bp-line)" }} />
          <div className="flex flex-col gap-7">
            {TIMELINE.map((t) => (
              <div key={t.rev} className="relative">
                <div
                  className="absolute -left-8 top-0.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center font-mono"
                  style={{ borderColor: "var(--bp-accent)", backgroundColor: "var(--bp-bg)", fontSize: "7px", color: "var(--bp-accent)" }}
                >
                  {t.rev}
                </div>
                <div className="font-mono text-[10px] mb-1" style={{ color: "var(--bp-line)" }}>
                  {t.date}
                </div>
                <div className="font-mono text-xs mb-1" style={{ color: "var(--bp-text)", fontWeight: 600 }}>
                  {t.title}
                </div>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-sans)", color: "var(--bp-text)" }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}