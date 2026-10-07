import { Link } from "react-router-dom";
import LiquidGlass from "liquid-glass-react";

const NAV_ITEMS = [
  { to: "/", label: "HOME", icon: "home" },
  { to: "/about", label: "ABOUT", icon: "about" },
  { to: "/projects", label: "PROJECTS", icon: "projects" },
  { to: "/skills", label: "SKILLS", icon: "skills" },
  { to: "/contact", label: "CONTACT", icon: "contact" },
];

function Icon({ name }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 20 20" width="20" height="20" {...common}>
          <path d="M4 10 L10 4.5 L16 10" />
          <path d="M6 9 V16 H14 V9" />
        </svg>
      );
    case "about":
      return (
        <svg viewBox="0 0 20 20" width="20" height="20" {...common}>
          <circle cx="10" cy="7" r="3" />
          <path d="M4 17c0-3.5 3-6 6-6s6 2.5 6 6" />
        </svg>
      );
    case "projects":
      return (
        <svg viewBox="0 0 20 20" width="20" height="20" {...common}>
          <rect x="3" y="3" width="6" height="6" />
          <rect x="11" y="3" width="6" height="6" />
          <rect x="3" y="11" width="6" height="6" />
          <rect x="11" y="11" width="6" height="6" />
        </svg>
      );
    case "skills":
      return (
        <svg viewBox="0 0 20 20" width="20" height="20" {...common}>
          <path d="M13.5 3.5a3 3 0 00-4 4L4 13v3h3l5.5-5.5a3 3 0 004-4l-2 2-1.5-1.5 2-2z" />
        </svg>
      );
    case "contact":
      return (
        <svg viewBox="0 0 20 20" width="20" height="20" {...common}>
          <rect x="2" y="4" width="16" height="12" rx="1" />
          <path d="M2 5l8 6 8-6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function BottomNav() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <LiquidGlass
        cornerRadius={999}
        padding="8px 12px"
        blurAmount={0.08}
        saturation={140}
        elasticity={0.1}
        className="flex gap-1"
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            aria-label={item.label}
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ color: "var(--bp-line-bright)" }}
          >
            <Icon name={item.icon} />
          </Link>
        ))}
      </LiquidGlass>
    </div>
  );
}