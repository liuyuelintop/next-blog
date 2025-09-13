import { NextRequest } from "next/server";
import sitePackage from "../../../../package.json" assert { type: "json" };
import { corsHeaders, getAllPosts } from "../_utils";

// Health should not be cached; always reflect current status
export const revalidate = 0;

export async function GET(_req: NextRequest) {
  const payload = {
    status: "ok",
    version: (sitePackage as any).version ?? "0.0.0",
    time: new Date().toISOString(),
    posts: { total: getAllPosts().length },
  };

  const headers = {
    "Content-Type": "application/json",
    ...corsHeaders(),
    "Cache-Control": "no-store",
  } as Record<string, string>;

  return Response.json(payload, { headers });
}
