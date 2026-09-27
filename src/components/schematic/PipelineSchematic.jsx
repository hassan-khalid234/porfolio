import { motion } from "framer-motion";
import { useDraw } from "../../hooks/useDraw";

let _canvas;
function measureText(text, fontSize, weight = 400) {
  if (typeof document === "undefined") return text.length * fontSize * 0.6;
  if (!_canvas) _canvas = document.createElement("canvas");
  const ctx = _canvas.getContext("2d");
  ctx.font = `${weight} ${fontSize}px "IBM Plex Mono", monospace`;
  return ctx.measureText(text).width;
}

function nodeWidth(def, labelSize, subSize) {
  const lw = measureText(def.label, labelSize, def.accent ? 600 : 400);
  const sw = def.sub ? measureText(def.sub, subSize) : 0;
  return Math.max(lw, sw, 90) + 32;
}

function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  words.forEach((word) => {
    if ((current + " " + word).trim().length > maxChars) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  });
  if (current) lines.push(current);
  return lines;
}

function CornerTicks({ w, h, size = 6 }) {
  const corners = [
    { x: 0, y: 0, dx: 1, dy: 1 },
    { x: w, y: 0, dx: -1, dy: 1 },
    { x: 0, y: h, dx: 1, dy: -1 },
    { x: w, y: h, dx: -1, dy: -1 },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <g key={i}>
          <line x1={c.x} y1={c.y} x2={c.x + c.dx * size} y2={c.y} stroke="var(--bp-line)" strokeWidth="1" />
          <line x1={c.x} y1={c.y} x2={c.x} y2={c.y + c.dy * size} stroke="var(--bp-line)" strokeWidth="1" />
        </g>
      ))}
    </>
  );
}

function Node({ pos, def, lead }) {
  const labelSize = lead ? 12 : 10;
  const subSize = lead ? 8 : 7;
  const h = def.sub ? (lead ? 54 : 48) : (lead ? 46 : 40);
  const w = pos.w;

  return (
    <g className="schematic-node" transform={`translate(${pos.x - w / 2}, ${pos.y - h / 2})`}>
      <rect
        width={w} height={h}
        fill="var(--bp-bg)"
        stroke={def.accent ? "var(--bp-accent)" : "var(--bp-line)"}
        strokeWidth={lead ? 1.5 : 1}
      />
      <CornerTicks w={w} h={h} />
      <text x={w / 2} y={def.sub ? h / 2 - 3 : h / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={labelSize} fontWeight={lead ? 600 : 400} fill="var(--bp-text)">
        {def.label}
      </text>
      {def.sub && (
        <text x={w / 2} y={h / 2 + 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={subSize} fill="var(--bp-line)">
          {def.sub}
        </text>
      )}
    </g>
  );
}

function Edge({ from, to, pathLength }) {
  return (
    <motion.line
      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
      stroke="var(--bp-line)" strokeWidth="1"
      style={{ pathLength }}
    />
  );
}

function Note({ note, pos }) {
  const lines = wrapText(note.text, 42);
  return (
    <text x={pos.x} y={pos.y + 45} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--bp-line)">
      {lines.map((line, i) => (
        <tspan key={i} x={pos.x} dy={i === 0 ? 0 : 11}>{line}</tspan>
      ))}
    </text>
  );
}

function layoutDesktop(project, labelSize, subSize) {
  const GAP = 50;
  const STACK_OFFSET = 45;
  const positions = {};
  let cursorX = 0;

  project.columns.forEach((col) => {
    const colWidth = Math.max(...col.map((id) => nodeWidth(project.nodeDefs[id], labelSize, subSize)));
    const x = cursorX + colWidth / 2;
    if (col.length === 1) {
      positions[col[0]] = { x, y: 0, w: colWidth };
    } else {
      positions[col[0]] = { x, y: -STACK_OFFSET, w: colWidth };
      positions[col[1]] = { x, y: STACK_OFFSET, w: colWidth };
    }
    cursorX += colWidth + GAP;
  });

  return positions;
}

function layoutMobile(project, labelSize, subSize) {
  const ROW_H = 68;
  const positions = {};
  let row = 0;
  project.columns.forEach((col) => {
    col.forEach((id) => {
      const w = Math.min(nodeWidth(project.nodeDefs[id], labelSize, subSize), 260);
      positions[id] = { x: 0, y: row * ROW_H, w };
      row += 1;
    });
  });
  return positions;
}

export default function PipelineSchematic({ project, mobile = false, sheetNumber, sheetTotal }) {
  const { ref, pathLength } = useDraw(
    mobile ? ["start 0.95", "start 0.55"] : ["start 0.8", "start 0.3"]
  );

  const labelSize = project.lead ? 12 : 10;
  const subSize = project.lead ? 8 : 7;
  const positions = mobile
    ? layoutMobile(project, labelSize, subSize)
    : layoutDesktop(project, labelSize, subSize);

  const ids = Object.keys(positions);
  const hasNotes = project.notes && project.notes.length > 0;
  const margin = 40;
  const minX = Math.min(...ids.map((id) => positions[id].x - positions[id].w / 2)) - margin;
  const maxX = Math.max(...ids.map((id) => positions[id].x + positions[id].w / 2)) + margin;
  const minY = Math.min(...ids.map((id) => positions[id].y)) - 60;
  const maxY = Math.max(...ids.map((id) => positions[id].y)) + (hasNotes ? 90 : 55);
  const vbW = maxX - minX;
  const vbH = maxY - minY;

  return (
    <div ref={ref} className="w-full">
      <div className="schematic-sheet border px-4 pt-4 pb-5 md:px-8 md:pt-6 md:pb-6" style={{ borderColor: "var(--bp-line)" }}>
        <div className="flex items-baseline justify-between mb-1 font-mono" style={{ color: "var(--bp-line-bright)" }}>
          <span style={{ fontSize: project.lead ? "13px" : "11px", letterSpacing: project.lead ? "1px" : "0px" }}>
            {project.title}
          </span>
          {sheetNumber && (
            <span className="text-[10px]" style={{ color: "var(--bp-line)" }}>
              SHEET {String(sheetNumber).padStart(2, "0")} / {String(sheetTotal).padStart(2, "0")}
            </span>
          )}
        </div>

        <p className="mb-4 max-w-xl text-sm leading-relaxed" style={{ fontFamily: "var(--font-sans)", color: "var(--bp-text)" }}>
          {project.blurb}
        </p>

        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
            className="overflow-visible block mx-auto"
            style={{ width: "100%", maxWidth: mobile ? 320 : 900, height: "auto" }}
            role="img"
            aria-label={`Pipeline diagram for ${project.title}`}
          >
            {project.edges.map((e, i) => (
              <Edge key={i} from={positions[e.from]} to={positions[e.to]} pathLength={pathLength} />
            ))}
            {ids.map((id) => (
              <Node key={id} pos={positions[id]} def={project.nodeDefs[id]} lead={project.lead} />
            ))}
            {project.notes.map((note, i) => {
              const pos = positions[note.at];
              return pos ? <Note key={i} note={note} pos={pos} /> : null;
            })}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" style={{ color: "var(--bp-line-bright)" }}>LIVE</a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noreferrer" style={{ color: "var(--bp-line-bright)" }}>REPO</a>
          )}
        </div>

        {project.stack && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="border px-2 py-0.5 font-mono text-[10px]" style={{ borderColor: "var(--bp-line)", color: "var(--bp-line-bright)" }}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}