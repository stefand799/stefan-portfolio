export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  series?: string; // posts with the same value form a series, in date order
  draft?: boolean; // drafts are listed only in development
  lang?: "en" | "ro"; // language the post is written in (set by the loader)
}

export interface ResearchItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  status?: string; // e.g. "in progress", "proven"
  blog?: string; // slug of the blog post with the original hypothesis
  paper?: string; // link to the paper / PDF
  github?: string;
  draft?: boolean; // drafts are listed only in development
}

// One entry of a search index (blog or research), built at build time.
export interface SearchDoc {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  text: string; // plain text of the MDX body
}
