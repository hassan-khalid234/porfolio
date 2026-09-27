export default function TitleBlock({ fields }) {
  return (
    <div
      className="schematic-sheet border px-5 py-5 sm:px-6 font-mono text-xs w-full max-w-[360px]"
      style={{ borderColor: "var(--bp-line)", color: "var(--bp-text)" }}
    >
      {fields.map(({ label, value }, i) => (
        <div
          key={label}
          className="flex flex-col gap-0.5 sm:flex-row sm:gap-6 py-1.5"
          style={{ borderTop: i === 0 ? "none" : "1px solid rgba(127, 184, 209, 0.15)" }}
        >
          <span
            className="sm:w-28 shrink-0 uppercase"
            style={{ color: "var(--bp-line-bright)", fontWeight: 600, letterSpacing: "0.5px" }}
          >
            {label}
          </span>
          <span className="min-w-0 break-all">{value}</span>
        </div>
      ))}
    </div>
  );
}