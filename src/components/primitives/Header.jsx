import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "M.H.", to: "/", isBrand: true },
  { label: "ABOUT", to: "/about" },
  {
    label: "PROJECTS",
    to: "/projects",
    submenu: [
      { label: "RAG COPILOT", to: "/projects#rag-copilot" },
      { label: "MOOD MIRROR", to: "/projects#mood-mirror" },
      { label: "SUBSCRIPTION INTEL", to: "/projects#subscription-intel" },
      { label: "MEDICAL INSURANCE", to: "/projects#medical-insurance-prediction" },
    ],
  },
  { label: "SKILLS", to: "/skills" },
  { label: "CONTACT", to: "/contact" },
];

export default function Header() {
  return (
    <header
      className="hidden md:block fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        borderColor: "var(--bp-line)",
        backgroundColor: "rgba(10, 25, 41, 0.85)",
        backdropFilter: "blur(6px)",
      }}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 py-3 font-mono text-xs">
        {NAV_LINKS.filter((l) => l.isBrand).map((l) => (
          <Link key={l.label} to={l.to} style={{ color: "var(--bp-line-bright)" }}>
            {l.label}
          </Link>
        ))}
        <ul className="flex gap-6">
          {NAV_LINKS.filter((l) => !l.isBrand).map((link) => (
            <li key={link.label} className="relative group">
              <Link
                to={link.to}
                className="transition-colors"
                style={{ color: "var(--bp-text)", letterSpacing: "1px" }}
              >
                {link.label}
              </Link>
              {link.submenu && (
                <ul
                  className="absolute left-0 top-full mt-2 hidden group-hover:flex flex-col border py-2 min-w-[200px]"
                  style={{ borderColor: "var(--bp-line)", backgroundColor: "var(--bp-bg)" }}
                >
                  {link.submenu.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        to={sub.to}
                        className="block px-4 py-1.5 whitespace-nowrap hover:opacity-80"
                        style={{ color: "var(--bp-text)" }}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}