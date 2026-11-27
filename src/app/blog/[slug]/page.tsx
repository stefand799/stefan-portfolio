import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { getPostBySlug, getPosts, getSeries } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { blogReplyMailto } from "@/lib/site";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { TechTag } from "@/components/ui/TechTag";

interface Props {
  params: Promise<{ slug: string }>;
}

// Only posts that exist in content/blog/ are served; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getPostBySlug(slug);
    return { title: frontmatter.title };
  } catch {
    return { title: "Post not found" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }
  const { frontmatter, content } = post;

  // Series: position of this post and its neighbours, in reading order.
  const series = frontmatter.series ? getSeries(frontmatter.series) : [];
  const part = series.findIndex((p) => p.slug === slug);
  const prev = part > 0 ? series[part - 1] : null;
  const next = part >= 0 && part < series.length - 1 ? series[part + 1] : null;

  return (
    <article className="py-16 max-w-2xl">
      <header className="mb-12">
        <p className="mb-6">
          <Link href="/blog" className="font-mono text-sm hover:underline" style={{ color: "var(--color-muted)" }}>
            ← blog/
          </Link>
        </p>
        <h1
          className="font-mono text-3xl font-bold mb-4"
          style={{ color: "var(--color-fg)" }}
        >
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <time
            className="font-mono text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            {formatDate(frontmatter.date)}
          </time>
          {frontmatter.draft && (
            <span className="font-mono text-xs" style={{ color: "var(--color-prompt)" }}>
              [draft]
            </span>
          )}
          {part >= 0 && series.length > 1 && (
            <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
              {frontmatter.series} · part {part + 1} of {series.length}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags?.map((tag) => (
            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
              <TechTag label={tag} />
            </Link>
          ))}
        </div>
      </header>
      <div className="prose-terminal">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] },
          }}
        />
      </div>
      {(prev || next) && (
        <nav className="mt-16 grid grid-cols-2 gap-4 font-mono text-sm">
          <div>
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="hover:underline" style={{ color: "var(--color-muted)" }}>
                ← {prev.title}
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/blog/${next.slug}`} className="hover:underline" style={{ color: "var(--color-muted)" }}>
                {next.title} →
              </Link>
            )}
          </div>
        </nav>
      )}
      <footer
        className="mt-16 pt-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <p className="mb-3">
          <CommandPrompt>mail --reply {slug}</CommandPrompt>
        </p>
        <p className="leading-relaxed mb-4" style={{ color: "var(--color-muted)" }}>
          Thoughts, objections, or an even more absurd idea? Talk back.
        </p>
        <a
          href={blogReplyMailto(slug, frontmatter.title)}
          className="inline-block font-mono text-sm px-4 py-2 hover:underline"
          style={{
            border: "1px solid var(--color-fg)",
            color: "var(--color-fg)",
          }}
        >
          reply to this post →
        </a>
      </footer>
    </article>
  );
}
