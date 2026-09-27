function CornerBracket({ position }) {
  const positions = {
    "top-left": { top: 12, left: 12, transform: "rotate(0deg)" },
    "top-right": { top: 12, right: 12, transform: "rotate(90deg)" },
    "bottom-right": { bottom: 12, right: 12, transform: "rotate(180deg)" },
    "bottom-left": { bottom: 12, left: 12, transform: "rotate(270deg)" },
  };
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20"
      style={{ position: "fixed", zIndex: 40, ...positions[position] }}
      className="pointer-events-none"
    >
      <path d="M0 0 H12 M0 0 V12" stroke="var(--bp-line-bright)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export default function SheetFrame() {
  return (
    <>
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-right" />
      <CornerBracket position="bottom-left" />
    </>
  );
}