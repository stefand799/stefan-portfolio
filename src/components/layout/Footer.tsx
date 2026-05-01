export function Footer() {
  return (
    <footer
      className="py-8 mt-24"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
          © {new Date().getFullYear()} Ionel-Ștefan Dinu
        </span>
        <div className="flex gap-4">
          {[
            { href: "https://github.com/stefand799", label: "github" },
            {
              href: "https://www.linkedin.com/in/ionel-%C8%99tefan-dinu-97b75131a/",
              label: "linkedin",
            },
            { href: "https://x.com/stefan_d799", label: "twitter" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors hover:underline"
              style={{ color: "var(--color-muted)" }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
