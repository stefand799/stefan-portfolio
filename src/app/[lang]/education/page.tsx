import type { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n";
import { CommandPrompt } from "@/components/ui/CommandPrompt";

export const metadata: Metadata = {
  title: "Education",
  alternates: languageAlternates("/education"),
};

type EducationLevel = "Highschool" | "Bachelor's Degree" | "Master's Degree";

type EducationEntry = {
  level: EducationLevel;
  institution: string;
  detail: string;
  program?: string;
  start: number;
  end: number;
  website: string;
};

// Add new entries anywhere; they are shown newest first (by end year).
const education: EducationEntry[] = [
  {
    level: "Master's Degree",
    institution: "University of Transilvania Brașov",
    detail: "Faculty of Electrical Engineering and Computer Science",
    program: "Advanced Systems in Automation and Information Technologies",
    start: 2026,
    end: 2028,
    website: "https://iesc.unitbv.ro/ro/",
  },
  {
    level: "Bachelor's Degree",
    institution: "University of Transilvania Brașov",
    detail: "Faculty of Mathematics and Computer Science",
    program: "Computer Science",
    start: 2023,
    end: 2026,
    website: "https://mateinfo.unitbv.ro/ro/",
  },
  {
    level: "Highschool",
    institution: '"Alexandru Marghiloman" Theoretical High School',
    detail: "Mathematics-Informatics Specialization",
    start: 2019,
    end: 2023,
    website: "https://www.licmarghilomanbz.ro/index.php/ro/",
  },
];

export default function EducationPage() {
  const entries = [...education].sort(
    (a, b) => b.end - a.end || b.start - a.start
  );

  return (
    <div className="py-16">
      <p className="mb-2">
        <CommandPrompt>cat education.log</CommandPrompt>
      </p>
      <h1
        className="font-mono text-3xl font-bold mb-12"
        style={{ color: "var(--color-fg)" }}
      >
        Education
      </h1>

      <div className="space-y-8">
        {entries.map((edu) => (
          <div key={`${edu.institution}-${edu.start}`} className="grid md:grid-cols-4 gap-4">
            <p
              className="font-mono text-xs"
              style={{ color: "var(--color-muted)" }}
            >
              {edu.start} – {edu.end}
            </p>
            <div className="md:col-span-3">
              <p
                className="font-mono text-xs uppercase tracking-widest mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                {edu.level}
              </p>
              {edu.program && (
                <p
                  className="text-sm mb-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  {edu.program}
                </p>
              )}
              <a
                href={edu.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-medium hover:underline"
                style={{ color: "var(--color-fg)" }}
              >
                {edu.institution}
              </a>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--color-muted)" }}
              >
                {edu.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
