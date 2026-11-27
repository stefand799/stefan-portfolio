import MiniSearch from "minisearch";
import type { SearchDoc } from "@/types";

// Lowercase and strip diacritics, so "stefan" finds "Ștefan".
// Works per character so positions in the normalized text match the original.
export function normalize(text: string): string {
  let out = "";
  for (const ch of text) {
    const base = ch.normalize("NFD").replace(/\p{M}/gu, "");
    out += (base[0] ?? ch).toLowerCase();
  }
  return out;
}

export function buildIndex(docs: SearchDoc[]): MiniSearch<SearchDoc> {
  const index = new MiniSearch<SearchDoc>({
    idField: "slug",
    fields: ["title", "tags", "description", "text"],
    extractField: (doc, field) => {
      const value = doc[field as keyof SearchDoc];
      return Array.isArray(value) ? value.join(" ") : (value as string);
    },
    processTerm: (term) => {
      const t = normalize(term);
      return t.length > 1 ? t : null; // ignore one-letter terms
    },
    searchOptions: {
      // A match in the title counts most, then tags, then description, then body.
      boost: { title: 3, tags: 2.5, description: 1.5 },
      prefix: true, // "disc" finds "discrete"
      fuzzy: 0.2, // tolerate small typos
    },
  });
  index.addAll(docs);
  return index;
}

// A short piece of text around the first matched term, split so the match can be highlighted.
export function snippet(
  text: string,
  terms: string[],
  radius = 80
): { before: string; match: string; after: string } | null {
  if (!text || terms.length === 0) return null;
  const norm = normalize(text);
  let at = -1;
  let len = 0;
  for (const term of terms) {
    const i = norm.indexOf(term);
    if (i !== -1 && (at === -1 || i < at)) {
      at = i;
      len = term.length;
    }
  }
  if (at === -1) return null;
  const start = Math.max(0, at - radius);
  const end = Math.min(text.length, at + len + radius);
  return {
    before: (start > 0 ? "…" : "") + text.slice(start, at),
    match: text.slice(at, at + len),
    after: text.slice(at + len, end) + (end < text.length ? "…" : ""),
  };
}
