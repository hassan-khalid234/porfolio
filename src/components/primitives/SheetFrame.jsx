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

function ZoneRefTop() {
  const zones = ["A", "B", "C", "D", "E"];
  return (
    <div
      className="fixed left-0 right-0 z-30 hidden md:flex justify-between px-8 pointer-events-none font-mono text-[9px]"
      style={{ top: 54, color: "var(--bp-line)" }}
    >
      {zones.map((z) => <span key={z}>{z}</span>)}
    </div>
  );
}

function ZoneRefSide() {
  const nums = ["1", "2", "3", "4", "5"];
  return (
    <div
      className="fixed bottom-6 left-2 z-30 hidden md:flex flex-col justify-between pointer-events-none font-mono text-[9px]"
      style={{ top: 70, color: "var(--bp-line)" }}
    >
      {nums.map((n) => <span key={n}>{n}</span>)}
    </div>
  );
}

export default function SheetFrame() {
  return (
    <>
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-right" />
      <CornerBracket position="bottom-left" />
      <ZoneRefTop />
      <ZoneRefSide />
    </>
  );
}