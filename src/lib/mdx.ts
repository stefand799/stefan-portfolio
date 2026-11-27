import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, BlogPost, ResearchItem, SearchDoc } from "@/types";

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

export function getPosts(): BlogPost[] {
  return readFolder<BlogPost>("blog").map((e) => e.meta);
}

export function getResearch(): ResearchItem[] {
  return readFolder<ResearchItem>("research").map((e) => e.meta);
}

export function getPostBySlug(slug: string): { frontmatter: BlogPost; content: string } {
  return readOne<BlogPost>("blog", slug);
}

export function getResearchBySlug(slug: string): { frontmatter: ResearchItem; content: string } {
  return readOne<ResearchItem>("research", slug);
}

// Posts of a series, oldest first (reading order).
export function getSeries(series: string): BlogPost[] {
  return getPosts()
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

export function getSearchDocs(folder: "blog" | "research"): SearchDoc[] {
  return readFolder<BlogPost | ResearchItem>(folder).map(({ meta, content }) => ({
    slug: meta.slug,
    title: meta.title,
    description: meta.description ?? "",
    tags: meta.tags ?? [],
    text: toPlainText(content),
  }));
}
