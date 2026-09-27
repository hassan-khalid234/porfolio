export default function TitleBlock({ fields }) {
  return (
    <div
      className="schematic-sheet border px-6 py-5 font-mono text-xs inline-block"
      style={{ borderColor: "var(--bp-line)", color: "var(--bp-text)", minWidth: 280 }}
    >
      {fields.map(({ label, value }, i) => (
        <div
          key={label}
          className="flex gap-6 py-1.5"
          style={{ borderTop: i === 0 ? "none" : "1px solid rgba(127, 184, 209, 0.15)" }}
        >
          <span
            className="w-28 shrink-0 uppercase"
            style={{ color: "var(--bp-line-bright)", fontWeight: 600, letterSpacing: "0.5px" }}
          >
            {label}
          </span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}