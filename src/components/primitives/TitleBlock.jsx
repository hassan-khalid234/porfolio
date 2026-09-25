export default function TitleBlock({ fields }) {
    return (
        <div
            className="inline-block border p-4 font-mono text-xs"
            style={{ borderColor: "var(--bp-line)", color: "var(--bp-text)" }}
        >
            {fields.map(({ label, value }) => (
                <div key={label} className="flex gap-4 py-0.5">
                    <span className="w-24 shrink-0" style={{ color: "var(--bp-line)" }}>
                        {label}:
                    </span>
                    <span>{value}</span>
                </div>
            ))}
        </div>
    );
}