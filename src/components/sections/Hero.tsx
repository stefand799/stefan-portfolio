"use client";

import { useTypingEffect } from "@/hooks/useTypingEffect";
import { TerminalCursor } from "@/components/ui/TerminalCursor";
import { CommandPrompt } from "@/components/ui/CommandPrompt";

export function Hero() {
  const { displayed, done } = useTypingEffect("software developer.", 60);

  return (
    <section className="py-24 md:py-32">
      <div className="space-y-6">
        <p>
          <CommandPrompt>whoami</CommandPrompt>
        </p>
        <div>
          <h1
            className="font-mono text-4xl md:text-5xl font-bold mb-3"
            style={{ color: "var(--color-fg)" }}
          >
            Ștefan Dinu
          </h1>
          <div
            className="font-mono text-xl"
            style={{ color: "var(--color-muted)" }}
          >
            {displayed}
            {!done && <TerminalCursor />}
          </div>
        </div>
        <p
          className="max-w-xl leading-relaxed"
          style={{ color: "var(--color-muted)" }}
        >
          I believe knowledge is both a tool for success and a responsibility.
          I&apos;m skilled in software development, system improvement, and
          building solutions from the ground up.
        </p>
        <div className="flex gap-4 pt-2">
          <a
            href="https://github.com/stefand799"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-4 py-2 transition-colors"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-fg)",
            }}
          >
            github ↗
          </a>
          <a
            href="mailto:stefandinu.contact@yahoo.com"
            className="font-mono text-sm px-4 py-2 transition-colors"
            style={{
              border: "1px solid var(--color-fg)",
              backgroundColor: "var(--color-fg)",
              color: "var(--color-bg)",
            }}
          >
            contact me
          </a>
        </div>
      </div>
    </section>
  );
}
