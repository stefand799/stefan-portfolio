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
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}
