import type { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { TechTag } from "@/components/ui/TechTag";

export const metadata: Metadata = {
  title: "Experience",
  alternates: languageAlternates("/experience"),
};

type ExperienceEntry = {
  role: string;
  company: string;
  start: string; // "YYYY-MM"
  end?: string; // "YYYY-MM"; leave out while ongoing
  description?: string;
  skills?: string[];
};

// Add new entries anywhere; ongoing ones come first, then by end date, newest first.
const experience: ExperienceEntry[] = [
  {
    role: "Data Analyst & AI Internship",
    company: "Siemens",
    start: "2026-06",
    description:
      "Develop applications that integrate various AI algorithms and agents to boost user efficiency.",
    skills: ["Data Analysis", "AI Agents", "Machine Learning", "Automation"],
  },
  {
    role: "Java Internship",
    company: "GlobalLogic",
    start: "2025-11",
    end: "2026-01",
    description:
      "Developed full-stack applications using Spring Boot, RESTful APIs, and SQL databases.",
    skills: ["Java", "Spring Boot", "RESTful APIs", "SQL", "Client-Server"],
  },
  {
    role: "Mentor Volunteer",
    company: "Learning Refactored",
    start: "2024-11",
    description:
      "Teach programming fundamentals in various programming languages, like C++ and Python, to high school students.",
    skills: ["C++", "Python", "Teaching", "Mentoring"],
  },
];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatMonth(ym: string): string {
  const [year, month] = ym.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export default function ExperiencePage() {
  // Ongoing entries ("9999") sort above finished ones; ties go to the later start.
  const entries = [...experience].sort(
    (a, b) =>
      (b.end ?? "9999").localeCompare(a.end ?? "9999") ||
      b.start.localeCompare(a.start)
  );

  return (
    <div className="py-16">
      <p className="mb-2">
        <CommandPrompt>cat experience.log</CommandPrompt>
      </p>
      <h1
        className="font-mono text-3xl font-bold mb-12"
        style={{ color: "var(--color-fg)" }}
      >
        Experience
      </h1>

      <div className="space-y-10">
        {entries.map((exp) => (
          <div
            key={`${exp.company}-${exp.start}`}
            className="grid md:grid-cols-4 gap-4"
          >
            <p
              className="font-mono text-xs"
              style={{ color: "var(--color-muted)" }}
            >
              {formatMonth(exp.start)} – {exp.end ? formatMonth(exp.end) : "Present"}
            </p>
            <div className="md:col-span-3 space-y-3">
              <div>
                <p
                  className="font-mono font-medium"
                  style={{ color: "var(--color-fg)" }}
                >
                  {exp.role}
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
                  {exp.company}
                </p>
              </div>
              {exp.description && (
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  {exp.description}
                </p>
              )}
              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((s) => (
                    <TechTag key={s} label={s} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
