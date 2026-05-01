import { TechTag } from "./TechTag";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="p-6 transition-colors group"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3
          className="font-mono font-medium"
          style={{ color: "var(--color-fg)" }}
        >
          {project.title}
        </h3>
        <div className="flex gap-3 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors hover:underline"
              style={{ color: "var(--color-muted)" }}
            >
              github ↗
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors hover:underline"
              style={{ color: "var(--color-muted)" }}
            >
              live ↗
            </a>
          )}
        </div>
      </div>
      <p
        className="text-sm mb-4 leading-relaxed"
        style={{ color: "var(--color-muted)" }}
      >
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>
    </article>
  );
}
