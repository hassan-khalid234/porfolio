export default function GridBackground() {
    return (
        <div
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{
                backgroundImage: `
          linear-gradient(to right, var(--bp-grid) 1px, transparent 1px),
          linear-gradient(to bottom, var(--bp-grid) 1px, transparent 1px)
        `,
                backgroundSize: "32px 32px", // 4 x --bp-unit
            }}
        />
    );
}