import { motion } from "framer-motion";
import { useDraw } from "../../hooks/useDraw";

function estimateWidth(text, fontSize) {
  return Math.max(90, text.length * fontSize * 0.62 + 24);
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

function Node({ node, lead }) {
  const labelSize = lead ? 12 : 10;
  const subSize = lead ? 8 : 7;
  const h = node.sub ? (lead ? 54 : 48) : (lead ? 46 : 40);
  const w = node._w;

  return (
    <g className="schematic-node" transform={`translate(${node.x - w / 2}, ${node.y - h / 2})`}>
      <rect
        width={w} height={h}
        fill="var(--bp-bg)"
        stroke={node.accent ? "var(--bp-accent)" : "var(--bp-line)"}
        strokeWidth={lead ? 1.5 : 1}
      />
      <CornerTicks w={w} h={h} />
      <text
        x={w / 2} y={node.sub ? h / 2 - 3 : h / 2 + 4} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize={labelSize} fontWeight={lead ? 600 : 400}
        fill="var(--bp-text)"
      >
        {node.label}
      </text>
      {node.sub && (
        <text
          x={w / 2} y={h / 2 + 14} textAnchor="middle"
          fontFamily="var(--font-mono)" fontSize={subSize} fill="var(--bp-line)"
        >
          {node.sub}
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

function Note({ note, node }) {
  const lines = wrapText(note.text, 42);
  return (
    <text x={node.x} y={node.y + 40} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--bp-line)">
      {lines.map((line, i) => (
        <tspan key={i} x={node.x} dy={i === 0 ? 0 : 11}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export default function PipelineSchematic({ project, mobile = false, sheetNumber, sheetTotal }) {
  const { ref, pathLength } = useDraw(
    mobile ? ["start 0.95", "start 0.55"] : ["start 0.8", "start 0.3"]
  );

  const rawNodes = mobile
    ? project.nodesMobile.map((m) => ({
        ...project.nodes.find((n) => n.id === m.id),
        ...m,
      }))
    : project.nodes;

  const labelSize = project.lead ? 12 : 10;
  const subSize = project.lead ? 8 : 7;
  const nodesWithWidth = rawNodes.map((n) => ({
    ...n,
    _w: Math.max(
      estimateWidth(n.label, labelSize),
      n.sub ? estimateWidth(n.sub, subSize) : 0
    ),
  }));
  const byId = Object.fromEntries(nodesWithWidth.map((n) => [n.id, n]));

  const hasNotes = project.notes && project.notes.length > 0;
  const margin = 40;
  const minX = Math.min(...nodesWithWidth.map((n) => n.x - n._w / 2)) - margin;
  const maxX = Math.max(...nodesWithWidth.map((n) => n.x + n._w / 2)) + margin;
  const minY = Math.min(...nodesWithWidth.map((n) => n.y)) - 60;
  const maxY = Math.max(...nodesWithWidth.map((n) => n.y)) + (hasNotes ? 90 : 50);
  const vbW = maxX - minX;
  const vbH = maxY - minY;

  return (
    <div ref={ref} className="w-full">
      <div
        className="schematic-sheet border px-4 pt-4 pb-5 md:px-8 md:pt-6 md:pb-6"
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

        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
            className="overflow-visible block mx-auto"
            style={{ width: "100%", maxWidth: mobile ? 340 : 900, height: "auto" }}
            role="img"
            aria-label={`Pipeline diagram for ${project.title}`}
          >
            {project.edges.map((e, i) => (
              <Edge key={i} from={byId[e.from]} to={byId[e.to]} pathLength={pathLength} />
            ))}
            {nodesWithWidth.map((n) => (
              <Node key={n.id} node={n} lead={project.lead} />
            ))}
            {project.notes.map((note, i) => {
              const n = byId[note.at];
              return n ? <Note key={i} note={note} node={n} /> : null;
            })}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" style={{ color: "var(--bp-line-bright)" }}>
              LIVE
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noreferrer" style={{ color: "var(--bp-line-bright)" }}>
              REPO
            </a>
          )}
        </div>

        {project.stack && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border px-2 py-0.5 font-mono text-[10px]"
                style={{ borderColor: "var(--bp-line)", color: "var(--bp-line-bright)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}