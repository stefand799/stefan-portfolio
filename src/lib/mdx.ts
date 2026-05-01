import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, BlogPost } from "@/types";

const contentDir = path.join(process.cwd(), "content");

export function getProjects(): Project[] {
  const dir = path.join(contentDir, "projects");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return { slug, ...data } as Project;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPosts(): BlogPost[] {
  const dir = path.join(contentDir, "blog");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return { slug, ...data } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): {
  frontmatter: BlogPost;
  content: string;
} {
  const filePath = path.join(contentDir, "blog", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as BlogPost, content };
}
