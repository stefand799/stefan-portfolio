import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { TechTag } from "@/components/ui/TechTag";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getPostBySlug(slug);
    return { title: `${frontmatter.title} — Ionel-Ștefan Dinu` };
  } catch {
    return { title: "Post not found" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  try {
    const { frontmatter, content } = getPostBySlug(slug);

    return (
      <article className="py-16 max-w-2xl">
        <header className="mb-12">
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
          </div>
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags?.map((tag) => (
              <TechTag key={tag} label={tag} />
            ))}
          </div>
        </header>
        <div className="prose-terminal">
          <MDXRemote source={content} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
