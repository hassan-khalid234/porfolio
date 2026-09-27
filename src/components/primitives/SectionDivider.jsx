export default function SectionDivider({ label }) {
  return (
    <div className="w-full flex items-center gap-4 px-6 md:px-12 py-6">
      <div className="flex-1 h-px" style={{ backgroundColor: "var(--bp-line)" }} />
      <span
        className="font-mono text-[10px] tracking-widest whitespace-nowrap"
        style={{ color: "var(--bp-line-bright)" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: "var(--bp-line)" }} />
    </div>
  );
}