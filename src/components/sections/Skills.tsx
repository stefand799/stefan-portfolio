import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { TechTag } from "@/components/ui/TechTag";

const skillGroups = [
  {
    label: "Languages",
    skills: ["C++", "C#", "Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    label: "Web",
    skills: ["Angular", "Next.js", "React", "HTML5", "CSS3"],
  },
  {
    label: "Tools",
    skills: ["Git", "Docker", "Linux", "SQLite", "PostgreSQL", "REST API"],
  },
];

export function Skills() {
  return (
    <section
      className="py-16"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="mb-8">
        <p className="mb-2">
          <CommandPrompt>cat skills.json</CommandPrompt>
        </p>
        <h2
          className="font-mono text-2xl font-bold"
          style={{ color: "var(--color-fg)" }}
        >
          Skills
        </h2>
      </div>
      <div className="space-y-5">
        {skillGroups.map(({ label, skills }) => (
          <div key={label} className="grid md:grid-cols-4 gap-4 items-start">
            <span
              className="font-mono text-xs uppercase tracking-widest pt-0.5"
              style={{ color: "var(--color-muted)" }}
            >
              {label}
            </span>
            <div className="md:col-span-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <TechTag key={s} label={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
