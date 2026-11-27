import Link from "next/link";
import type { BlogPost } from "@/types";
import { formatDate, localePath, type Locale } from "@/lib/i18n";

interface BlogCardProps {
  post: BlogPost;
  lang: Locale; // language of the page the card is shown on
}

export function BlogCard({ post, lang }: BlogCardProps) {
  return (
    <Link
      href={localePath(lang, `/blog/${post.slug}`)}
      className="block p-6 transition-colors"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3
          className="font-mono font-medium hover:underline"
          style={{ color: "var(--color-fg)" }}
        >
          {post.title}
          {post.lang && post.lang !== lang && (
            <span className="ml-2 text-xs" style={{ color: "var(--color-muted)" }}>
              [{post.lang}]
            </span>
          )}
          {post.draft && (
            <span className="ml-2 text-xs" style={{ color: "var(--color-prompt)" }}>
              [draft]
            </span>
          )}
        </h3>
        <time
          className="font-mono text-xs shrink-0"
          style={{ color: "var(--color-muted)" }}
        >
          {formatDate(post.date, lang)}
        </time>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
        {post.description}
      </p>
    </Link>
  );
}
