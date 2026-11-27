import type { Metadata } from "next";
import { Suspense } from "react";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { ResearchCard } from "@/components/ui/ResearchCard";
import { ContentSearch } from "@/components/ui/ContentSearch";
import { getResearch } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchPage() {
  const items = getResearch();

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
                <ResearchCard key={item.slug} item={item} />
              ))}
            </div>
          }
        >
          <ContentSearch kind="research" items={items} />
        </Suspense>
      )}
    </div>
  );
}
