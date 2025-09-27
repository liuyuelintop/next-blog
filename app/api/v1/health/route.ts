import { NextRequest } from "next/server";
import sitePackage from "../../../../package.json" assert { type: "json" };
import { corsHeaders, getAllPosts, generateContentHash } from "../_utils";

// Health should not be cached; always reflect current status
export const revalidate = 0;

export async function GET(_req: NextRequest) {
  const allPosts = await getAllPosts();

  // Generate content version hash for client-side cache validation
  const contentHash = generateContentHash(allPosts);

  const payload = {
    status: "ok",
    version: (sitePackage as any).version ?? "0.0.0",
    time: new Date().toISOString(),
    posts: {
      total: allPosts.length,
      contentHash, // Clients can use this to check if content has changed
      lastModified: allPosts.length > 0 ? allPosts[0].date : null // Most recent post date
    },
  };

  const headers = {
    "Content-Type": "application/json",
    ...corsHeaders(),
    "Cache-Control": "no-store",
  } as Record<string, string>;

  return Response.json(payload, { headers });
}
