import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { getPostBySlug, getPostSlugs, getSeries } from "@/lib/mdx";
import { formatDate, getDictionary, hasLocale, localePath } from "@/lib/i18n";
import { blogReplyMailto } from "@/lib/site";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { TechTag } from "@/components/ui/TechTag";

type Props = PageProps<"/[lang]/blog/[slug]">;

// Only posts that exist in content/blog/<lang>/ are served; anything else is a 404.
// Every post gets a page in both languages: if it isn't written in the page's
// language, the other version is shown with a note.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  try {
    const { frontmatter, languages } = getPostBySlug(slug, lang);
    return {
      title: frontmatter.title,
      description: frontmatter.description,
      // hreflang only for the languages the post is actually written in
      alternates: {
        languages: Object.fromEntries(languages.map((l) => [l, localePath(l, `/blog/${slug}`)])),
      },
      openGraph: { type: "article", title: frontmatter.title, description: frontmatter.description },
    };
  } catch {
    return { title: "Post not found" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  let post;
  try {
    post = getPostBySlug(slug, lang);
  } catch {
    notFound();
  }
  const { frontmatter, content } = post;
  const writtenIn = frontmatter.lang ?? lang;

  // Series: position of this post and its neighbours, in reading order.
  const series = frontmatter.series ? getSeries(frontmatter.series, lang) : [];
  const part = series.findIndex((p) => p.slug === slug);
  const prev = part > 0 ? series[part - 1] : null;
  const next = part >= 0 && part < series.length - 1 ? series[part + 1] : null;

  return (
    <article className="py-16 max-w-2xl" lang={writtenIn}>
      <header className="mb-12">
        <p className="mb-6">
          <Link href={localePath(lang, "/blog")} className="font-mono text-sm hover:underline" style={{ color: "var(--color-muted)" }}>
            {dict.blog.back}
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
            {formatDate(frontmatter.date, lang)}
          </time>
          {frontmatter.draft && (
            <span className="font-mono text-xs" style={{ color: "var(--color-prompt)" }}>
              [draft]
            </span>
          )}
          {part >= 0 && series.length > 1 && (
            <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
              {frontmatter.series} · {dict.blog.part(part + 1, series.length)}
            </span>
          )}
        </div>
        {writtenIn !== lang && (
          <p className="font-mono text-xs mb-4" style={{ color: "var(--color-prompt)" }}>
            {"// "}
            {dict.blog.onlyIn}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags?.map((tag) => (
            <Link key={tag} href={`${localePath(lang, "/blog")}?tag=${encodeURIComponent(tag)}`}>
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
              <Link href={localePath(lang, `/blog/${prev.slug}`)} className="hover:underline" style={{ color: "var(--color-muted)" }}>
                ← {prev.title}
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={localePath(lang, `/blog/${next.slug}`)} className="hover:underline" style={{ color: "var(--color-muted)" }}>
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
          {dict.blog.replyText}
        </p>
        <a
          href={blogReplyMailto(slug, frontmatter.title)}
          className="inline-block font-mono text-sm px-4 py-2 hover:underline"
          style={{
            border: "1px solid var(--color-fg)",
            color: "var(--color-fg)",
          }}
        >
          {dict.blog.replyButton}
        </a>
      </footer>
    </article>
  );
}
