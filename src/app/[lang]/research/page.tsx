import type { Metadata } from "next";
import { Suspense } from "react";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { ResearchCard } from "@/components/ui/ResearchCard";
import { ContentSearch } from "@/components/ui/ContentSearch";
import { getResearch } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Research",
  alternates: languageAlternates("/research"),
};

export default async function ResearchPage({ params }: PageProps<"/[lang]/research">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const items = getResearch();
  // Research is not translated: its interface stays in English in both languages.
  const strings = { ...getDictionary("en").search, placeholder: "a theorem, a topic, a word…" };

  return (
    <div className="py-16">
      <p className="mb-2">
        <CommandPrompt>ls research/</CommandPrompt>
      </p>
      <h1
        className="font-mono text-3xl font-bold mb-12"
        style={{ color: "var(--color-fg)" }}
      >
        Research
      </h1>
      {items.length === 0 ? (
        <p className="font-mono" style={{ color: "var(--color-muted)" }}>
          No research yet. Coming soon.
        </p>
      ) : (
        // The plain list is the fallback while the search box loads (and for no-JS readers).
        <Suspense
          fallback={
            <div className="space-y-4">
              {items.map((item) => (
                <ResearchCard key={item.slug} item={item} lang={lang} />
              ))}
            </div>
          }
        >
          <ContentSearch kind="research" items={items} lang={lang} strings={strings} />
        </Suspense>
      )}
    </div>
  );
}
