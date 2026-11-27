"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, otherLocale, type Locale } from "@/lib/i18n";

// "[ ro ]" on English pages, "[ en ]" on Romanian ones: opens the same page in
// the other language and remembers the choice for the next visit.
export function LanguageSwitch({ lang, title }: { lang: Locale; title: string }) {
  const pathname = usePathname();
  const target = otherLocale(lang);
  const href = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${target}`) || `/${target}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      title={title}
      aria-label={title}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
      className="font-mono text-xs whitespace-nowrap transition-colors hover:underline"
      style={{ color: "var(--color-muted)" }}
    >
      [ {target} ]
    </Link>
  );
}
