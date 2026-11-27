export function Footer() {
  return (
    <footer
      className="py-8 mt-24"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <p
        className="font-mono text-xs text-center"
        style={{ color: "var(--color-muted)" }}
      >
        © {new Date().getFullYear()} Ștefan D.
      </p>
    </footer>
  );
}
