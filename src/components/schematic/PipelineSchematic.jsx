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

function Node({ pos, def, labelSize, subSize, subH, plainH, strokeW, patternId }) {
  const w = pos.w;
  const h = def.sub ? subH : plainH;
  return (
    <g className="schematic-node" transform={`translate(${pos.x - w / 2}, ${pos.y - h / 2})`}>
      <rect
        width={w} height={h}
        fill={def.accent ? `url(#${patternId})` : "var(--bp-bg)"}
        stroke={def.accent ? "var(--bp-accent)" : "var(--bp-line)"}
        strokeWidth={strokeW}
      />
      <CornerTicks w={w} h={h} />
      <text x={w / 2} y={def.sub ? h / 2 - 3 : h / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={labelSize} fontWeight={def.accent ? 600 : 400} fill="var(--bp-text)">
        {def.label}
      </text>
      {def.sub && (
        <text x={w / 2} y={h / 2 + 13} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={subSize} fill="var(--bp-line)">
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

function Note({ note, pos, offset = 45 }) {
  const lines = wrapText(note.text, 42);
  return (
    <text x={pos.x} y={pos.y + offset} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--bp-line)">
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

// Mobile: single node per column stays centered in its own row.
// A two-node column (a branch) sits side by side WITHIN one row,
// so query → {dense, sparse} still visually diverges and converges —
// just rotated to fit a narrow screen instead of going fully linear.
function layoutMobile(project, labelSize, subSize) {
  const ROW_H = 58;
  const BRANCH_GAP = 14;
  const notedIds = new Set((project.notes || []).map((n) => n.at));
  const positions = {};
  let cursorY = 0;

  project.columns.forEach((col) => {
    const y = cursorY;
    if (col.length === 1) {
      const w = Math.min(nodeWidth(project.nodeDefs[col[0]], labelSize, subSize), 150);
      positions[col[0]] = { x: 0, y, w };
    } else {
      const widths = col.map((id) => Math.min(nodeWidth(project.nodeDefs[id], labelSize, subSize), 128));
      const totalW = widths[0] + widths[1] + BRANCH_GAP;
      let cursor = -totalW / 2;
      col.forEach((id, i) => {
        const w = widths[i];
        positions[id] = { x: cursor + w / 2, y, w };
        cursor += w + BRANCH_GAP;
      });
    }

    const notesHere = (project.notes || []).filter((n) => col.includes(n.at));
    const noteExtra = notesHere.length
      ? Math.max(...notesHere.map((n) => wrapText(n.text, 42).length)) * 11 + 16
      : 0;

    cursorY += ROW_H + noteExtra;
  });

  return positions;
}

export default function PipelineSchematic({ project, mobile = false, sheetNumber, sheetTotal }) {
  const { ref, pathLength } = useDraw(
    mobile ? ["start 0.9", "start 0.4"] : ["start 0.8", "start 0.3"]
  );

  const desktopLabelSize = project.lead ? 12 : 10;
  const desktopSubSize = project.lead ? 8 : 7;
  const mobileLabelSize = 9;
  const mobileSubSize = 6.5;

  const labelSize = mobile ? mobileLabelSize : desktopLabelSize;
  const subSize = mobile ? mobileSubSize : desktopSubSize;
  const subH = mobile ? 34 : (project.lead ? 54 : 48);
  const plainH = mobile ? 28 : (project.lead ? 46 : 40);
  const strokeW = mobile ? 1 : (project.lead ? 1.5 : 1);

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
    <div className="w-full">
      <div
        className="schematic-sheet border relative px-4 pt-4 pb-16 md:px-8 md:pt-6 md:pb-16"
        style={{ borderColor: "var(--bp-line)" }}
      >
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

        {/* ref moved here — scroll tracking now matches the diagram itself,
            not the whole panel including title/blurb, so the draw animation
            actually triggers as the boxes come into view */}
        <div ref={ref} className="w-full overflow-x-auto">
          <svg
            viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
            className="overflow-visible block mx-auto"
            style={{
              width: mobile ? Math.min(vbW, 300) : "100%",
              maxWidth: mobile ? 300 : 900,
              height: "auto",
            }}
            role="img"
            aria-label={`Pipeline diagram for ${project.title}`}
          >
            <defs>
              <pattern id={`hatch-${project.id}`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <rect width="6" height="6" fill="var(--bp-bg)" />
                <line x1="0" y1="0" x2="0" y2="6" stroke="var(--bp-accent)" strokeWidth="1" opacity="0.3" />
              </pattern>
            </defs>
            {project.edges.map((e, i) => (
              <Edge key={i} from={positions[e.from]} to={positions[e.to]} pathLength={pathLength} />
            ))}
            {ids.map((id) => (
              <Node
                key={id}
                pos={positions[id]}
                def={project.nodeDefs[id]}
                labelSize={labelSize}
              subSize={subSize}
                subH={subH}
                plainH={plainH}
                strokeW={strokeW}
                patternId={`hatch-${project.id}`}
              />
            ))}
            {/* notes stay below, see Step 17 */}
          </svg>
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

        <div className="absolute bottom-3 right-3 flex gap-2">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="schematic-btn">
              LIVE
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noreferrer" className="schematic-btn">
              REPO
            </a>
          )}
        </div>
      </div>
    </div>
  );
}