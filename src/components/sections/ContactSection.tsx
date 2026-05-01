import { CommandPrompt } from "@/components/ui/CommandPrompt";

const socials = [
  {
    label: "email",
    href: "mailto:stefandinu.contact@yahoo.com",
    display: "stefandinu.contact@yahoo.com",
    download: false,
  },
  {
    label: "github",
    href: "https://github.com/stefand799",
    display: "github.com/stefand799",
    download: false,
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/ionel-%C8%99tefan-dinu-97b75131a/",
    display: "linkedin ↗",
    download: false,
  },
  {
    label: "twitter",
    href: "https://x.com/stefan_d799",
    display: "x.com/stefan_d799",
    download: false,
  },
  {
    label: "resume",
    href: "/cv-stefan-dinu.pdf",
    display: "cv-stefan-dinu.pdf ↓",
    download: true,
  },
];

export function ContactSection() {
  return (
    <section
      className="py-16"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="mb-8">
        <p className="mb-2">
          <CommandPrompt>cat contact.txt</CommandPrompt>
        </p>
        <h2
          className="font-mono text-2xl font-bold"
          style={{ color: "var(--color-fg)" }}
        >
          Contact
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p
            className="leading-relaxed mb-6"
            style={{ color: "var(--color-muted)" }}
          >
            I&apos;m open to new opportunities, collaborations, or just a good
            technical conversation. Feel free to reach out.
          </p>
          <a
            href="mailto:stefandinu.contact@yahoo.com"
            className="inline-block font-mono text-sm px-5 py-2.5 transition-colors"
            style={{
              border: "1px solid var(--color-fg)",
              backgroundColor: "var(--color-fg)",
              color: "var(--color-bg)",
            }}
          >
            say hello →
          </a>
        </div>
        <div className="space-y-3">
          {socials.map(({ label, href, display, download }) => (
            <div key={label} className="flex items-center gap-4">
              <span
                className="font-mono text-xs w-16"
                style={{ color: "var(--color-muted)" }}
              >
                {label}
              </span>
              <a
                href={href}
                target={download || href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                download={download ? true : undefined}
                className="font-mono text-sm hover:underline"
                style={{ color: "var(--color-fg)" }}
              >
                {display}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
