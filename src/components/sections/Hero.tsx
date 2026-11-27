"use client";

import { useEffect, useState } from "react";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { TerminalCursor } from "@/components/ui/TerminalCursor";
import { CommandPrompt } from "@/components/ui/CommandPrompt";

// Quotes shown under the name. With more than one, they rotate every few seconds.
const quotes = [
  {
    text: "There is nothing that even science cannot explain. Searching for a rule to explain that which you can't understand... the tireless effort that walks that straight, steady path... that is what we call science!",
    source: "Senku Ishigami, Dr. Stone",
  },
];

const QUOTE_INTERVAL_MS = 10000;

export function Hero() {
  const { displayed, done } = useTypingEffect("systems engineer.", 60);
  // Start on the first quote so server and client render the same HTML.
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (quotes.length < 2) return;
    const timer = setInterval(
      () => setQuoteIndex((i) => (i + 1) % quotes.length),
      QUOTE_INTERVAL_MS
    );
    return () => clearInterval(timer);
  }, []);

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
