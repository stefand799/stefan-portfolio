import { getSearchDocs } from "@/lib/mdx";
import { hasLocale, locales } from "@/lib/i18n";

// Search index for /<lang>/blog, generated at build time and loaded only when someone searches.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function GET(_request: Request, { params }: RouteContext<"/[lang]/blog/search-index.json">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return new Response("Not found", { status: 404 });
  return Response.json(getSearchDocs("blog", lang));
}
