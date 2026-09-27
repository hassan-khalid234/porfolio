export default function SheetFrame() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 hidden md:block"
      style={{ margin: 20, border: "1px solid var(--bp-line)" }}
    />
  );
}