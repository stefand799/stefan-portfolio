import Link from "next/link";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getProjects } from "@/lib/mdx";

export function FeaturedProjects() {
  const projects = getProjects()
    .filter((p) => p.featured)
    .slice(0, 3);

  return (
    <section
      className="py-16"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2">
            <CommandPrompt>ls projects/ --featured</CommandPrompt>
          </p>
          <h2
            className="font-mono text-2xl font-bold"
            style={{ color: "var(--color-fg)" }}
          >
            Projects
          </h2>
        </div>
        <Link
          href="/projects"
          className="font-mono text-sm transition-colors hover:underline"
          style={{ color: "var(--color-muted)" }}
        >
          all projects →
        </Link>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
