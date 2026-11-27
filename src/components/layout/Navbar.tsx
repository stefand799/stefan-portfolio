"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
  { href: "/research", label: "research" },
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "experience" },
  { href: "/education", label: "education" },
  { href: "/contact", label: "contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const linkStyle = (href: string) => ({
    color: isActive(href) ? "var(--color-fg)" : "var(--color-muted)",
  });

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          <span style={{ color: "var(--color-prompt)" }}>~/</span>
          <span style={{ color: "var(--color-fg)" }}>stefan</span>
        </Link>

        {/* Desktop: one row of links */}
        <div className="hidden md:flex items-center gap-5">
          <ul className="flex gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-mono text-sm whitespace-nowrap transition-colors hover:underline"
                  style={linkStyle(href)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + menu button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className="font-mono text-xs whitespace-nowrap hover:underline"
            style={{ color: "var(--color-muted)" }}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "[ close ]" : "[ menu ]"}
          </button>
        </div>
      </nav>

      {/* Mobile: dropdown list */}
      {open && (
        <ul
          id="mobile-nav"
          className="md:hidden max-w-3xl mx-auto px-6 pb-4 space-y-3"
        >
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm"
                style={linkStyle(href)}
              >
                <span className="whitespace-pre" style={{ color: "var(--color-prompt)" }}>
                  {isActive(href) ? "> " : "  "}
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
