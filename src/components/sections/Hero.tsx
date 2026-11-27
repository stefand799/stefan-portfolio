"use client";

import { useEffect, useState } from "react";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { TerminalCursor } from "@/components/ui/TerminalCursor";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import type { Locale } from "@/lib/i18n";

// Subtitle typed under the name, per language.
const subtitle: Record<Locale, string> = {
  en: "systems engineer.",
  ro: "inginer de sisteme.",
};

// Quotes shown under the name, per language. With more than one, they rotate every few seconds.
const quotesByLang: Record<Locale, { text: string; source: string }[]> = {
  en: [
    {
      text: "There is nothing that even science cannot explain. Searching for a rule to explain that which you can't understand... the tireless effort that walks that straight, steady path... that is what we call science!",
      source: "Senku Ishigami, Dr. Stone",
    },
  ],
  ro: [
    {
      text: "Nu există nimic pe care știința să nu-l poată explica. Să cauți o regulă care să explice ceea ce nu înțelegi... efortul neobosit de a merge pe acel drum drept și constant... asta numim noi știință!",
      source: "Senku Ishigami, Dr. Stone",
    },
  ],
};

const QUOTE_INTERVAL_MS = 10000;

export function Hero({ lang }: { lang: Locale }) {
  const quotes = quotesByLang[lang];
  const { displayed, done } = useTypingEffect(subtitle[lang], 60);
  // Start on the first quote so server and client render the same HTML.
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (quotes.length < 2) return;
    const timer = setInterval(
      () => setQuoteIndex((i) => (i + 1) % quotes.length),
      QUOTE_INTERVAL_MS
    );
    return () => clearInterval(timer);
  }, [quotes.length]);

  const quote = quotes[quoteIndex];

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
            Ștefan D.
          </h1>
          <div
            className="font-mono text-xl"
            style={{ color: "var(--color-muted)" }}
          >
            {displayed}
            {!done && <TerminalCursor />}
          </div>
        </div>
        <figure
          key={quoteIndex}
          className="max-w-xl pl-4"
          style={{ borderLeft: "2px solid var(--color-border)" }}
        >
          <blockquote
            className="italic leading-relaxed"
            style={{ color: "var(--color-fg)" }}
          >
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <figcaption
            className="font-mono text-xs mt-2"
            style={{ color: "var(--color-muted)" }}
          >
            — {quote.source}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
