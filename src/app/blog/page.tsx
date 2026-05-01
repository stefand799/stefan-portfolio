import type { Metadata } from "next";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { BlogCard } from "@/components/ui/BlogCard";
import { getPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog — Ionel-Ștefan Dinu",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="py-16">
      <p className="mb-2">
        <CommandPrompt>ls blog/</CommandPrompt>
      </p>
      <h1
        className="font-mono text-3xl font-bold mb-12"
        style={{ color: "var(--color-fg)" }}
      >
        Blog
      </h1>
      {posts.length === 0 ? (
        <p className="font-mono" style={{ color: "var(--color-muted)" }}>
          No posts yet. Coming soon.
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
