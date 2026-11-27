import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { getResearch, getResearchBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { TechTag } from "@/components/ui/TechTag";

interface Props {
  params: Promise<{ slug: string }>;
}

// Only slugs that exist in content/research/ are served; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getResearch().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getResearchBySlug(slug);
    return { title: frontmatter.title };
  } catch {
    return { title: "Research not found" };
  }
}

const linkClass = "font-mono text-sm hover:underline";
const linkStyle = { color: "var(--color-muted)" };

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;

  let item;
  try {
    item = getResearchBySlug(slug);
  } catch {
    notFound();
  }
  const { frontmatter, content } = item;

  return (
    <article className="py-16 max-w-2xl">
      <header className="mb-12">
        <p className="mb-6">
          <Link href="/research" className={linkClass} style={linkStyle}>
            ← research/
          </Link>
        </p>
        {frontmatter.status && (
          <p
            className="font-mono text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--color-muted)" }}
          >
            [{frontmatter.status}]
          </p>
        )}
        <h1
          className="font-mono text-3xl font-bold mb-4"
          style={{ color: "var(--color-fg)" }}
        >
          {frontmatter.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <time
            className="font-mono text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            {formatDate(frontmatter.date)}
          </time>
          {frontmatter.blog && (
            <Link
              href={`/blog/${frontmatter.blog}`}
              className={linkClass}
              style={linkStyle}
            >
              hypothesis →
            </Link>
          )}
          {frontmatter.paper && (
            <a
              href={frontmatter.paper}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={linkStyle}
            >
              paper ↗
            </a>
          )}
          {frontmatter.github && (
            <a
              href={frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={linkStyle}
            >
              github ↗
            </a>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags?.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
      </header>
      <div className="prose-terminal">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </div>
    </article>
  );
}
