import Link from "next/link";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block p-6 transition-colors"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3
          className="font-mono font-medium hover:underline"
          style={{ color: "var(--color-fg)" }}
        >
          {post.title}
        </h3>
        <time
          className="font-mono text-xs shrink-0"
          style={{ color: "var(--color-muted)" }}
        >
          {formatDate(post.date)}
        </time>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
        {post.description}
      </p>
    </Link>
  );
}
