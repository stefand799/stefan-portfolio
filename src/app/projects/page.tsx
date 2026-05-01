import type { Metadata } from "next";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getProjects } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Projects — Ionel-Ștefan Dinu",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="py-16">
      <p className="mb-2">
        <CommandPrompt>ls projects/</CommandPrompt>
      </p>
      <h1
        className="font-mono text-3xl font-bold mb-12"
        style={{ color: "var(--color-fg)" }}
      >
        Projects
      </h1>
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
