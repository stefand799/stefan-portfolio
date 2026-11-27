import type { Metadata } from "next";
import { Suspense } from "react";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { BlogCard } from "@/components/ui/BlogCard";
import { ContentSearch } from "@/components/ui/ContentSearch";
import { getPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog",
  alternates: languageAlternates("/blog"),
};

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const posts = getPosts(lang);

  return (
    <div className="py-16">
      <p className="mb-2">
        <CommandPrompt>ls blog/</CommandPrompt>
      </p>
      <h1
        className="font-mono text-3xl font-bold mb-3"
        style={{ color: "var(--color-fg)" }}
      >
        Blog
      </h1>
      <p
        className="font-mono text-xs mb-12"
        style={{ color: "var(--color-muted)" }}
      >
        {dict.blog.disclaimer}
      </p>
      {posts.length === 0 ? (
        <p className="font-mono" style={{ color: "var(--color-muted)" }}>
          {dict.blog.empty}
        </p>
      ) : (
        // The plain list is the fallback while the search box loads (and for no-JS readers).
        <Suspense
          fallback={
            <div className="space-y-4">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} lang={lang} />
              ))}
            </div>
          }
        >
          <ContentSearch kind="blog" items={posts} lang={lang} strings={dict.search} />
        </Suspense>
      )}
    </div>
  );
}
