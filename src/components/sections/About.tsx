import { CommandPrompt } from "@/components/ui/CommandPrompt";

export function About() {
  return (
    <section
      className="py-16"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="mb-8">
        <p className="mb-2">
          <CommandPrompt>cat about.txt</CommandPrompt>
        </p>
        <h2
          className="font-mono text-2xl font-bold"
          style={{ color: "var(--color-fg)" }}
        >
          About
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-4">
          <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
            I&apos;m a Computer Science student at the University of Transilvania
            Brașov, Faculty of Mathematics and Computer Science (2023–2026).
            I graduated from &quot;Alexandru Marghiloman&quot; Theoretical High School
            with a computer science specialization.
          </p>
          <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
            I believe knowledge is both a tool for success and a responsibility,
            so I aim to use it wisely and creatively. I thrive on
            problem-solving, continuous learning, and building solutions from
            the ground up.
          </p>
          <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Outside of engineering, I conduct independent research at the
            intersection of discrete mathematics and neuroscience-inspired AI
            architectures — exploring how discrete dynamical systems over
            integers connect to fundamental mechanisms of learning and
            generalization.
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--color-muted)" }}
            >
              Education
            </h3>
            <ul className="space-y-3">
              <li>
                <p
                  className="font-mono text-sm font-medium"
                  style={{ color: "var(--color-fg)" }}
                >
                  Univ. Transilvania Brașov
                </p>
                <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                  2023 – 2026 · CS
                </p>
              </li>
              <li>
                <p
                  className="font-mono text-sm font-medium"
                  style={{ color: "var(--color-fg)" }}
                >
                  Al. Marghiloman H.S.
                </p>
                <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                  2019 – 2023 · Informatics
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--color-muted)" }}
            >
              Location
            </h3>
            <p
              className="font-mono text-sm"
              style={{ color: "var(--color-fg)" }}
            >
              Brașov, România
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
