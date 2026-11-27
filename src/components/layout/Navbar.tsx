"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";

const pages = ["about", "blog", "research", "projects", "experience", "education", "contact"] as const;

interface NavbarProps {
  lang: Locale;
  labels: Dictionary["nav"];
  theme: Dictionary["theme"];
  menu: Dictionary["menu"];
  switchTo: string;
}

export function Navbar({ lang, labels, theme, menu, switchTo }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = pages.map((p) => ({ href: localePath(lang, `/${p}`), label: labels[p] }));

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
      <nav className="max-w-3xl lg:max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link
          href={localePath(lang, "/")}
          className="font-mono text-sm font-medium whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          <span style={{ color: "var(--color-prompt)" }}>~/</span>
          <span style={{ color: "var(--color-fg)" }}>stefan</span>
        </Link>

        {/* Wide screens (≥1024px): one row of links */}
        <div className="hidden lg:flex items-center gap-5">
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
          <ThemeToggle labels={theme} />
          <LanguageSwitch lang={lang} title={switchTo} />
        </div>

        {/* Narrower screens: theme, language and a menu button */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggle labels={theme} />
          <LanguageSwitch lang={lang} title={switchTo} />
          <button
            onClick={() => setOpen((o) => !o)}
            className="font-mono text-xs whitespace-nowrap hover:underline"
            style={{ color: "var(--color-muted)" }}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? menu.close : menu.open}
          </button>
        </div>
      </nav>

      {/* Narrower screens: dropdown list */}
      {open && (
        <ul
          id="mobile-nav"
          className="lg:hidden max-w-3xl mx-auto px-6 pb-4 space-y-3"
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
