import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, languageAlternates } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { KnowledgeGraph } from "@/components/ui/KnowledgeGraph";

export const metadata: Metadata = {
  alternates: languageAlternates("/"),
};

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <KnowledgeGraph />
      <Hero lang={lang} />
    </>
  );
}
