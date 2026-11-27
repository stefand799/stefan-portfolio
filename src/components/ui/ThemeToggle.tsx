"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

export function ThemeToggle({ labels }: { labels: Dictionary["theme"] }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      setDark(true);
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      className="font-mono text-xs whitespace-nowrap transition-colors hover:underline"
      style={{ color: "var(--color-muted)" }}
      aria-label={labels.label}
    >
      {dark ? labels.light : labels.dark}
    </button>
  );
}
