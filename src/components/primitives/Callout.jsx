export default function Callout({ text, x = 0, y = 0, labelOffset = 60 }) {
    return (
        <g>
            <line
                x1={x} y1={y}
                x2={x + labelOffset} y2={y - 20}
                stroke="var(--bp-line)" strokeWidth="1"
            />
            <circle cx={x} cy={y} r="2.5" fill="var(--bp-line-bright)" />
            <text
                x={x + labelOffset + 4} y={y - 17}
                fontFamily="var(--font-mono)"
                fontSize="10"
                fill="var(--bp-text)"
            >
                {text}
            </text>
        </g>
    );
}