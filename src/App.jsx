import GridBackground from "./components/primitives/GridBackground";
import DimensionLine from "./components/primitives/DimensionLine";
import TitleBlock from "./components/primitives/TitleBlock";

export default function App() {
  return (
    <div className="min-h-screen p-8" style={{ color: "var(--bp-text)" }}>
      <GridBackground />
      <DimensionLine label="EST. 2027 — FINAL YEAR, UMT LAHORE" length={280} />
      <div className="mt-12">
        <TitleBlock
          fields={[
            { label: "DRAFTED BY", value: "M. HASSAN" },
            { label: "DATE", value: "2026-09-25" },
            { label: "REV", value: "01" },
          ]}
        />
      </div>
    </div>
  );
}