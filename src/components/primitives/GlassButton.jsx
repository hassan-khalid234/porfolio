import LiquidGlass from "liquid-glass-react";

export default function GlassButton({ onActivate, children, accent = false, size = "md" }) {
  const padding = size === "sm" ? "6px 12px" : "10px 22px";
  const fontSize = size === "sm" ? "10px" : "11px";

  return (
    <LiquidGlass
      cornerRadius={6}
      padding={padding}
      onClick={onActivate}
      className="cursor-pointer select-none"
      style={{
        color: accent ? "var(--bp-accent)" : "var(--bp-line-bright)",
        fontFamily: "var(--font-mono)",
        fontSize,
        letterSpacing: "0.5px",
      }}
    >
      <span
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onActivate();
          }
        }}
      >
        {children}
      </span>
    </LiquidGlass>
  );
}