import type { Metadata } from "next";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { TechTag } from "@/components/ui/TechTag";

export const metadata: Metadata = {
  title: "About — Ionel-Ștefan Dinu",
};

const education = [
  {
    institution: "University of Transilvania Brașov",
    detail: "Faculty of Mathematics and Computer Science",
    period: "2023 – 2026",
    website: "https://mateinfo.unitbv.ro/ro/",
  },
  {
    institution: '"Alexandru Marghiloman" Theoretical High School',
    detail: "Computer Science Specialization",
    period: "2019 – 2023",
    website: "https://www.licmarghilomanbz.ro/index.php/ro/",
  },
];

const softSkills = [
  "Problem Solving",
  "Analytical Thinking",
  "Continuous Learning",
  "Research",
  "Teaching",
  "Attention to Detail",
];

export default function AboutPage() {
  return (
    <div className="py-16">
      <p className="mb-2">
        <CommandPrompt>cat about.txt</CommandPrompt>
      </p>
      <h1
        className="font-mono text-3xl font-bold mb-12"
        style={{ color: "var(--color-fg)" }}
      >
        About
      </h1>

      <div className="space-y-16">
        <section>
          <div className="space-y-4 max-w-2xl">
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              I&apos;m a Computer Science student at the University of Transilvania
              Brașov, passionate about building software that makes a difference.
              My background spans front-end development, back-end systems, and
              cross-platform applications.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              I believe knowledge is both a tool for success and a responsibility,
              so I aim to use it wisely and creatively. I thrive on
              problem-solving, continuous learning, and building solutions from
              the ground up.
            </p>
          </div>
        </section>

        <section>
          <h2
            className="font-mono text-xl font-bold mb-6 pb-4"
            style={{
              color: "var(--color-fg)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            Research Interests
          </h2>
          <div className="space-y-4 max-w-2xl">
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Independent researcher with interest in discrete mathematics and
              AI architectures inspired by neuroscience.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              On the mathematics side, I work on discrete dynamical systems over
              integers — operators with emergent properties such as fixed points,
              cycles, attraction basins, and power-law distributions. I explore
              positional representations and associated polynomial structures,
              with a focus on iterative behavior and invariants that arise
              organically from elementary arithmetic.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              On the AI side, I&apos;m interested in architectures that move away
              from the classical gradient-based and probabilistic paradigm —
              systems that learn through deterministic addressing, associative
              memory, and sparse representations. Theoretical influences draw
              from computational neuroscience, particularly theories of
              hierarchical information processing in the cortex and the
              principle of a universal algorithm operating at different scales
              of abstraction.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              The connection between the two directions — how discrete
              mathematical structures can ground mechanisms of learning and
              generalization — is the central question that unites them.
            </p>
          </div>
        </section>

        <section>
          <h2
            className="font-mono text-xl font-bold mb-6 pb-4"
            style={{
              color: "var(--color-fg)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.institution} className="grid md:grid-cols-4 gap-4">
                <div>
                  <p
                    className="font-mono text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {edu.period}
                  </p>
                </div>
                <div className="md:col-span-3">
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
        </section>

        <section>
          <h2
            className="font-mono text-xl font-bold mb-6 pb-4"
            style={{
              color: "var(--color-fg)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            Soft Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((s) => (
              <TechTag key={s} label={s} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
