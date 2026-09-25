import TitleBlock from "../primitives/TitleBlock";

function ContactLink({ href, children, external }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{ color: "var(--bp-text)" }}
    >
      {children}
    </a>
  );
}

export default function Contact() {
  const fields = [
    { label: "DRAFTED BY", value: "M. HASSAN" },
    { label: "DATE", value: "2026-09-25" },
    { label: "REV", value: "01" },
    {
      label: "CONTACT",
      value: (
        <ContactLink href="mailto:hasansheikhh987@gmail.com">
          hasansheikhh987@gmail.com
        </ContactLink>
      ),
    },
    {
      label: "GITHUB",
      value: (
        <ContactLink href="https://github.com/hassan-khalid234" external>
          hassan-khalid234
        </ContactLink>
      ),
    },
    {
      label: "LINKEDIN",
      value: (
        <ContactLink href="https://www.linkedin.com/in/hassan-khalid-4028842a1/" external>
          hassan-khalid
        </ContactLink>
      ),
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-6 px-6">
      <div className="font-mono text-xs" style={{ color: "var(--bp-line-bright)" }}>
        CONTACT
      </div>
      <TitleBlock fields={fields} />
    </section>
  );
}