"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type MiniSearch from "minisearch";
import type { BlogPost, ResearchItem, SearchDoc } from "@/types";
import { buildIndex, snippet } from "@/lib/search";
import type { Dictionary, Locale } from "@/lib/i18n";
import { BlogCard } from "./BlogCard";
import { ResearchCard } from "./ResearchCard";

type Props = (
  | { kind: "blog"; items: BlogPost[] }
  | { kind: "research"; items: ResearchItem[] }
) & {
  lang: Locale;
  strings: Dictionary["search"];
};

type Hit = { slug: string; terms: string[] };

// Search box + topic filter for a list of blog posts or research items.
// State lives in the URL (?q=...&tag=...) so a search can be shared as a link.
export function ContentSearch(props: Props) {
  const { kind, items, lang, strings } = props;
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const tag = params.get("tag");

  const [index, setIndex] = useState<MiniSearch<SearchDoc> | null>(null);
  const [docs, setDocs] = useState<Map<string, SearchDoc>>(new Map());
  const loading = useRef(false);

  // Load the index only once someone actually searches.
  const loadIndex = () => {
    if (index || loading.current) return;
    loading.current = true;
    fetch(`/${lang}/${kind}/search-index.json`)
      .then((r) => r.json())
      .then((data: SearchDoc[]) => {
        setDocs(new Map(data.map((d) => [d.slug, d])));
        setIndex(buildIndex(data));
      })
      .catch(() => {
        loading.current = false;
      });
  };

  useEffect(() => {
    if (query.trim()) loadIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Keep the URL in step with the box (replace, so typing doesn't flood history).
  const setParam = (key: "q" | "tag", value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if ((params.get("q") ?? "") !== query.trim()) setParam("q", query.trim() || null);
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Topics with how many entries use each, most used first.
  const topics = useMemo(() => {
    const count = new Map<string, number>();
    for (const item of items) for (const t of item.tags ?? []) count.set(t, (count.get(t) ?? 0) + 1);
    return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [items]);

  const q = query.trim();
  const searching = q.length > 0;

  const hits: Hit[] | null = useMemo(() => {
    if (!searching) return items.map((i) => ({ slug: i.slug, terms: [] }));
    if (!index) return null; // index still loading
    return index.search(q).map((r) => ({ slug: r.id as string, terms: r.terms }));
  }, [searching, index, q, items]);

  const bySlug = useMemo(
    () => new Map<string, BlogPost | ResearchItem>(items.map((i) => [i.slug, i])),
    [items]
  );

  const results = (hits ?? []).filter((h) => {
    const item = bySlug.get(h.slug);
    return item && (!tag || item.tags?.includes(tag));
  });

  return (
    <div>
      <label
        className="flex items-center gap-2 font-mono text-sm px-3 py-2 mb-4"
        style={{ border: "1px solid var(--color-border)" }}
      >
        <span style={{ color: "var(--color-prompt)" }}>~/stefan</span>
        <span style={{ color: "var(--color-muted)" }}>$ grep</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={loadIndex}
          placeholder={strings.placeholder}
          aria-label={`Search ${kind}`}
          className="flex-1 bg-transparent outline-none min-w-0"
          style={{ color: "var(--color-fg)" }}
        />
      </label>

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {topics.map(([t, n]) => {
            const active = t === tag;
            return (
              <button
                key={t}
                onClick={() => setParam("tag", active ? null : t)}
                className="font-mono text-xs px-2 py-1 transition-colors"
                style={{
                  border: `1px solid ${active ? "var(--color-fg)" : "var(--color-border)"}`,
                  color: active ? "var(--color-bg)" : "var(--color-muted)",
                  backgroundColor: active ? "var(--color-fg)" : "transparent",
                }}
                aria-pressed={active}
              >
                {t} <span style={{ opacity: 0.6 }}>{n}</span>
              </button>
            );
          })}
        </div>
      )}

      {searching && hits === null ? (
        <p className="font-mono text-sm" style={{ color: "var(--color-muted)" }}>
          {strings.searching}
        </p>
      ) : results.length === 0 ? (
        <p className="font-mono text-sm" style={{ color: "var(--color-muted)" }}>
          {strings.noMatches}
          {q ? ` ${strings.forQuery} "${q}"` : ""}
          {tag ? ` ${strings.inTag} [${tag}]` : ""}.
        </p>
      ) : (
        <div className="space-y-4">
          {results.map(({ slug, terms }) => {
            const item = bySlug.get(slug)!;
            const doc = docs.get(slug);
            const piece = searching && doc ? snippet(doc.text, terms) : null;
            return (
              <div key={slug}>
                {kind === "blog" ? (
                  <BlogCard post={item as BlogPost} lang={lang} />
                ) : (
                  <ResearchCard item={item as ResearchItem} lang={lang} />
                )}
                {piece && (
                  <p
                    className="text-sm leading-relaxed px-6 pt-2"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {piece.before}
                    <mark
                      className="px-0.5"
                      style={{ backgroundColor: "var(--color-border)", color: "var(--color-fg)" }}
                    >
                      {piece.match}
                    </mark>
                    {piece.after}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
