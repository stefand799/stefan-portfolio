import type { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  alternates: languageAlternates("/contact"),
};

const socials = [
  {
    label: "email",
    href: `mailto:${CONTACT_EMAIL}`,
    display: CONTACT_EMAIL,
  },
  {
    label: "github",
    href: "https://github.com/stefand799",
    display: "github.com/stefand799",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/ionel-%C8%99tefan-dinu-97b75131a/",
    display: "linkedin ↗",
  },
  {
    label: "twitter",
    href: "https://x.com/stefan_d799",
    display: "x.com/stefan_d799",
  },
  {
    label: "instagram",
    href: "https://www.instagram.com/stefan_d799/",
    display: "instagram.com/stefan_d799",
  },
  {
    label: "stackoverflow",
    href: "https://stackoverflow.com/users/30213000/stefan-d799",
    display: "stackoverflow ↗",
  },
  {
    label: "resume",
    href: "/cv-stefan-dinu.pdf",
    display: "cv-stefan-dinu.pdf ↓",
    download: true,
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 max-w-xl">
      <p className="mb-2">
        <CommandPrompt>cat contact.txt</CommandPrompt>
      </p>
      <h1
        className="font-mono text-3xl font-bold mb-4"
        style={{ color: "var(--color-fg)" }}
      >
        Contact
      </h1>
      <p className="leading-relaxed mb-12" style={{ color: "var(--color-muted)" }}>
        If I&apos;m still a thought in your head, you might as well talk back.
        Opportunities, collaborations, or just a good conversation about absurd
        ideas. Pick any channel below.
      </p>
      <div className="space-y-0">
        {socials.map(({ label, href, display, download }) => (
          <div
            key={label}
            className="flex items-center gap-6 py-4"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <span
              className="font-mono text-xs w-24"
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
  );
}
