export default function DimensionLine({ label, length = 200 }) {
  const h = 24;
  return (
    <svg
      viewBox={`0 0 ${length} ${h}`}
      className="overflow-visible w-full"
      style={{ maxWidth: length, height: "auto" }}
    >
      <line x1={0} y1={h / 2} x2={length} y2={h / 2} stroke="var(--bp-line)" strokeWidth="1" />
      <line x1={0} y1={h / 2 - 6} x2={0} y2={h / 2 + 6} stroke="var(--bp-line)" strokeWidth="1" />
      <line x1={length} y1={h / 2 - 6} x2={length} y2={h / 2 + 6} stroke="var(--bp-line)" strokeWidth="1" />
      <text x={length / 2} y={h - 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--bp-text)">
        {label}
      </text>
    </svg>
  );
}