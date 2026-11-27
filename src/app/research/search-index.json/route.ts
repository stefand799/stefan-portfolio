import { getSearchDocs } from "@/lib/mdx";

// Search index for /research, generated at build time and loaded only when someone searches.
export const dynamic = "force-static";

export function GET() {
  return Response.json(getSearchDocs("research"));
}
