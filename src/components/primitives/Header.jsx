const NAV_LINKS = [
  { label: "M.H.", href: "#hero", isBrand: true },
  { label: "ABOUT", href: "#about" },
  {
    label: "PROJECTS",
    href: "#projects",
    submenu: [
      { label: "RAG COPILOT", href: "#rag-copilot" },
      { label: "MOOD MIRROR", href: "#mood-mirror" },
      { label: "SUBSCRIPTION INTEL", href: "#subscription-intel" },
      { label: "MEDICAL INSURANCE", href: "#medical-insurance-prediction" },
    ],
  },
  { label: "SKILLS", href: "#skills" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "CONTACT", href: "#contact" },
];

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        borderColor: "var(--bp-line)",
        backgroundColor: "rgba(10, 25, 41, 0.85)",
        backdropFilter: "blur(6px)",
      }}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 py-3 font-mono text-xs">
        {NAV_LINKS.filter((l) => l.isBrand).map((l) => (
          <a key={l.label} href={l.href} style={{ color: "var(--bp-line-bright)" }}>
            {l.label}
          </a>
        ))}
        <ul className="flex gap-6">
          {NAV_LINKS.filter((l) => !l.isBrand).map((link) => (
            <li key={link.label} className="relative group">
              <a
                href={link.href}
                className="transition-colors"
                style={{ color: "var(--bp-text)", letterSpacing: "1px" }}
              >
                {link.label}
              </a>
              {link.submenu && (
                <ul
                  className="absolute left-0 top-full mt-2 hidden group-hover:flex flex-col border py-2 min-w-[200px]"
                  style={{ borderColor: "var(--bp-line)", backgroundColor: "var(--bp-bg)" }}
                >
                  {link.submenu.map((sub) => (
                    <li key={sub.label}>
                      <a
                        href={sub.href}
                        className="block px-4 py-1.5 whitespace-nowrap hover:opacity-80"
                        style={{ color: "var(--bp-text)" }}
                      >
                        {sub.label}
                      </a>
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