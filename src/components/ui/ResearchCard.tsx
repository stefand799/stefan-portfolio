import Link from "next/link";
import { TechTag } from "./TechTag";
import type { ResearchItem } from "@/types";
import { localePath, type Locale } from "@/lib/i18n";

interface ResearchCardProps {
  item: ResearchItem;
  lang: Locale;
}

const linkClass = "font-mono text-xs transition-colors hover:underline";
const linkStyle = { color: "var(--color-muted)" };

export function ResearchCard({ item, lang }: ResearchCardProps) {
  return (
    <article
      className="p-6 transition-colors"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          {item.status && (
            <p
              className="font-mono text-xs uppercase tracking-widest mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              [{item.status}]
            </p>
          )}
          <h3
            className="font-mono font-medium"
            style={{ color: "var(--color-fg)" }}
          >
            <Link href={localePath(lang, `/research/${item.slug}`)} className="hover:underline">
              {item.title}
            </Link>
            {item.draft && (
              <span className="ml-2 text-xs" style={{ color: "var(--color-prompt)" }}>
                [draft]
              </span>
            )}
          </h3>
        </div>
        <div className="flex gap-3 shrink-0">
          {item.blog && (
            <Link href={localePath(lang, `/blog/${item.blog}`)} className={linkClass} style={linkStyle}>
              hypothesis →
            </Link>
          )}
          {item.paper && (
            <a
              href={item.paper}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={linkStyle}
            >
              paper ↗
            </a>
          )}
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={linkStyle}
            >
              github ↗
            </a>
          )}
        </div>
      </div>
      <p
        className="text-sm mb-4 leading-relaxed"
        style={{ color: "var(--color-muted)" }}
      >
        {item.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>
    </article>
  );
}
