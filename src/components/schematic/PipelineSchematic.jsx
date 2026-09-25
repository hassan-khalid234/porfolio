import { motion } from "framer-motion";
import { useDraw } from "../../hooks/useDraw";
import { useMemo } from "react";

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

function estimateWidth(text, fontSize) {
  return Math.max(90, text.length * fontSize * 0.62 + 24);
}

function Node({ node, lead }) {
  const labelSize = lead ? 12 : 10;
  const subSize = lead ? 8 : 7;
  const h = node.sub ? (lead ? 54 : 48) : (lead ? 46 : 40);
  const w = Math.max(
    estimateWidth(node.label, labelSize),
    node.sub ? estimateWidth(node.sub, subSize) : 0
  );

  return (
    <g
      className="schematic-node"
      transform={`translate(${node.x - w / 2}, ${node.y - h / 2})`}
    >
      <rect
        width={w} height={h}
        fill="var(--bp-bg)"
        stroke={node.accent ? "var(--bp-accent)" : "var(--bp-line)"}
        strokeWidth={lead ? 1.5 : 1}
      />
      <CornerTicks w={w} h={h} />
      <text
        x={w / 2} y={node.sub ? h / 2 - 3 : h / 2 + 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={labelSize}
        fontWeight={lead ? 600 : 400}
        fill="var(--bp-text)"
      >
        {node.label}
      </text>
      {node.sub && (
        <text
          x={w / 2} y={h / 2 + 14}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={subSize}
          fill="var(--bp-line)"
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
            x1={from.x} y1={from.y}
            x2={to.x} y2={to.y}
            stroke="var(--bp-line)"
            strokeWidth="1"
            style={{ pathLength }}
        />
    );
}

export default function PipelineSchematic({ project, mobile = false }) {
    const { ref, pathLength } = useDraw(
        mobile ? ["start 0.95", "start 0.55"] : ["start 0.8", "start 0.3"]
    );
    const nodes = useMemo(() => {
        return mobile
            ? project.nodesMobile.map((m) => ({
                ...project.nodes.find((n) => n.id === m.id),
                ...m,
            }))
            : project.nodes;
    }, [project, mobile]);

    const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
    const w = mobile ? Math.min(340, window.innerWidth - 32) : 800;
    const h = mobile ? 480 : 220;

    return (
        <div ref={ref} className="w-full overflow-x-auto">
            <div className="mb-1 font-mono text-xs" style={{ color: "var(--bp-line-bright)", fontSize: project.lead ? "13px" : "11px",letterSpacing: project.lead ? "1px" : "0px",}}>
                {project.title}
            </div>
            <p
                className="mb-4 max-w-xl text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-sans)", color: "var(--bp-text)" }}
            >
                {project.blurb}
            </p>
            <svg
                width={w} height={h} viewBox={`0 0 ${w} ${h}`}
                className="overflow-visible"
                role="img"
                aria-label={`Pipeline diagram for ${project.title}`}
            >
                {project.edges.map((e, i) => (
                    <Edge key={i} from={byId[e.from]} to={byId[e.to]} pathLength={pathLength} />
                ))}
                {nodes.map((n) => (
                    <Node key={n.id} node={n} lead={project.lead} />
                ))}
                {project.notes.map((note, i) => {
                    const n = byId[note.at];
                    if (!n) return null;
                    return (
                        <text
                            key={i}
                            x={n.x} y={n.y + 40}
                            textAnchor="middle"
                            fontFamily="var(--font-mono)"
                            fontSize="8"
                            fill="var(--bp-line)"
                        >
                            {note.text}
                        </text>
                    );
                })}
            </svg>
            <div className="mt-3 flex gap-4 font-mono text-xs">
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
        </div>
    );
}