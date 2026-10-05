const NAV_ITEMS = [
  { id: "hero", label: "HOME", icon: "home" },
  { id: "about", label: "ABOUT", icon: "about" },
  { id: "projects", label: "PROJECTS", icon: "projects" },
  { id: "skills", label: "SKILLS", icon: "skills" },
  { id: "contact", label: "CONTACT", icon: "contact" },
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
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex md:hidden gap-1 px-3 py-2 rounded-full border"
      style={{
        borderColor: "var(--bp-line)",
        backgroundColor: "rgba(10, 25, 41, 0.9)",
        backdropFilter: "blur(10px)",
      }}
    >
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-label={item.label}
          className="bottomnav-item flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{ color: "var(--bp-line-bright)" }}
        >
          <Icon name={item.icon} />
        </a>
      ))}
    </nav>
  );
}