import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, BlogPost, ResearchItem, SearchDoc } from "@/types";
import { locales, otherLocale, type Locale } from "@/lib/i18n";

const contentDir = path.join(process.cwd(), "content");

// Drafts (`draft: true` in frontmatter) are visible while developing, hidden in production.
const showDrafts = process.env.NODE_ENV !== "production";

type Entry<T> = { meta: T; content: string };

// Reads every .mdx file of a content folder, newest first.
function readFolder<T extends { date: string; draft?: boolean }>(
  folder: string
): Entry<T & { slug: string }>[] {
  const dir = path.join(contentDir, folder);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf-8"));
      return { meta: { slug, ...data } as T & { slug: string }, content };
    })
    .filter(({ meta }) => showDrafts || !meta.draft)
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

// Reads one entry by slug; throws if it does not exist or is a hidden draft.
function readOne<T extends { draft?: boolean }>(folder: string, slug: string) {
  const { data, content } = matter(
    fs.readFileSync(path.join(contentDir, folder, `${slug}.mdx`), "utf-8")
  );
  const frontmatter = { slug, ...data } as T & { slug: string };
  if (!showDrafts && frontmatter.draft) throw new Error(`${folder}/${slug} is a draft`);
  return { frontmatter, content };
}

export function getProjects(): Project[] {
  return readFolder<Project>("projects").map((e) => e.meta);
}

// Blog posts live in content/blog/<lang>/<slug>.mdx. A post can exist in one
// language or both; on a page in `lang`, a post written only in the other
// language is still listed, in its own language (post.lang tells which).
function readBlog(lang: Locale): Entry<BlogPost>[] {
  const own = readFolder<BlogPost>(`blog/${lang}`).map((e) => ({
    ...e,
    meta: { ...e.meta, lang },
  }));
  const ownSlugs = new Set(own.map((e) => e.meta.slug));
  const other = otherLocale(lang);
  const fallback = readFolder<BlogPost>(`blog/${other}`)
    .filter((e) => !ownSlugs.has(e.meta.slug))
    .map((e) => ({ ...e, meta: { ...e.meta, lang: other } }));
  return [...own, ...fallback].sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
}

export function getPosts(lang: Locale): BlogPost[] {
  return readBlog(lang).map((e) => e.meta);
}

// Every slug that exists in any language (for static generation).
export function getPostSlugs(): string[] {
  const slugs = new Set<string>();
  for (const lang of locales) for (const e of readFolder<BlogPost>(`blog/${lang}`)) slugs.add(e.meta.slug);
  return [...slugs];
}

export function getResearch(): ResearchItem[] {
  return readFolder<ResearchItem>("research").map((e) => e.meta);
}

// The post in `lang` if it exists, otherwise in the other language.
// `languages` lists every language the post is written in.
export function getPostBySlug(
  slug: string,
  lang: Locale
): { frontmatter: BlogPost; content: string; languages: Locale[] } {
  const languages = locales.filter((l) => {
    try {
      readOne<BlogPost>(`blog/${l}`, slug);
      return true;
    } catch {
      return false;
    }
  });
  if (languages.length === 0) throw new Error(`blog/${slug} not found`);
  const shown = languages.includes(lang) ? lang : languages[0];
  const { frontmatter, content } = readOne<BlogPost>(`blog/${shown}`, slug);
  return { frontmatter: { ...frontmatter, lang: shown }, content, languages };
}

export function getResearchBySlug(slug: string): { frontmatter: ResearchItem; content: string } {
  return readOne<ResearchItem>("research", slug);
}

// Posts of a series, oldest first (reading order).
export function getSeries(series: string, lang: Locale): BlogPost[] {
  return getPosts(lang)
    .filter((p) => p.series === series)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// MDX body -> plain text for the search index (drops code, math, JSX, markdown syntax).
function toPlainText(mdx: string): string {
  return mdx
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/\$\$[\s\S]*?\$\$/g, " ") // display math
    .replace(/\$[^$\n]+\$/g, " ") // inline math
    .replace(/^\s*(import|export)\s.*$/gm, " ") // MDX import/export lines
    .replace(/<[^>]+>/g, " ") // JSX / HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> their text
    .replace(/[#>*_~`|-]+/g, " ") // markdown symbols
    .replace(/\s+/g, " ")
    .trim();
}

export function getSearchDocs(folder: "blog" | "research", lang: Locale): SearchDoc[] {
  const entries: Entry<BlogPost | ResearchItem>[] =
    folder === "blog" ? readBlog(lang) : readFolder<ResearchItem>("research");
  return entries.map(({ meta, content }) => ({
    slug: meta.slug,
    title: meta.title,
    description: meta.description ?? "",
    tags: meta.tags ?? [],
    text: toPlainText(content),
  }));
}
