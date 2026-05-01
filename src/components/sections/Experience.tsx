import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { TechTag } from "@/components/ui/TechTag";

const experiences = [
  {
    role: "Volunteer C++ Workshop Instructor",
    company: "Learning Refactored",
    period: "Nov 2024 – Present",
    description:
      "Teach programming fundamentals (C++) to students aged 15–17.",
    skills: ["C++", "Teaching", "Mentoring"],
  },
  {
    role: "Java Internship",
    company: "GlobalLogic",
    period: "Nov 2025 – Jan 2026",
    description:
      "Developed full-stack applications using Spring Boot, RESTful APIs, and SQL databases.",
    skills: ["Java", "Spring Boot", "RESTful APIs", "SQL", "Client-Server"],
  },
];

export function Experience() {
  return (
    <section
      className="py-16"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="mb-8">
        <p className="mb-2">
          <CommandPrompt>ls experience/</CommandPrompt>
        </p>
        <h2
          className="font-mono text-2xl font-bold"
          style={{ color: "var(--color-fg)" }}
        >
          Experience
        </h2>
      </div>
      <div className="space-y-10">
        {experiences.map((exp, i) => (
          <div key={i} className="grid md:grid-cols-4 gap-4 md:gap-8">
            <div>
              <p
                className="font-mono text-xs"
                style={{ color: "var(--color-muted)" }}
              >
                {exp.period}
              </p>
            </div>
            <div className="md:col-span-3 space-y-3">
              <div>
                <h3
                  className="font-mono font-medium"
                  style={{ color: "var(--color-fg)" }}
                >
                  {exp.role}
                </h3>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  {exp.company}
                </p>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((s) => (
                  <TechTag key={s} label={s} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
