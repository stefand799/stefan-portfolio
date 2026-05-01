"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-medium">
          <span style={{ color: "var(--color-prompt)" }}>~/</span>
          <span style={{ color: "var(--color-fg)" }}>stefan</span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-mono text-sm transition-colors"
                  style={{
                    color:
                      pathname === href
                        ? "var(--color-fg)"
                        : "var(--color-muted)",
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
