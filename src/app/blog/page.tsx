import type { Metadata } from "next";
import { Suspense } from "react";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { BlogCard } from "@/components/ui/BlogCard";
import { ContentSearch } from "@/components/ui/ContentSearch";
import { getPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getPosts();

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
        {"// warning: may contain absurd ideas. some of them might even be right."}
      </p>
      {posts.length === 0 ? (
        <p className="font-mono" style={{ color: "var(--color-muted)" }}>
          No posts yet. Coming soon.
        </p>
      ) : (
        // The plain list is the fallback while the search box loads (and for no-JS readers).
        <Suspense
          fallback={
            <div className="space-y-4">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          }
        >
          <ContentSearch kind="blog" items={posts} />
        </Suspense>
      )}
    </div>
  );
}
