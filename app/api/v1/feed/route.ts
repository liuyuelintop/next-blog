export const revalidate = 300; // ISR every 5 minutes

import { NextRequest } from "next/server";
import {
  cacheHeaders,
  corsHeaders,
  filterByTag,
  getAllPosts,
  toFeedItem,
} from "../_utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const tag = searchParams.get("tag") || undefined;

  const limit = Math.min(Math.max(Number(limitParam) || 6, 1), 20);

  const allPosts = await getAllPosts();
  const posts = filterByTag(allPosts, tag).slice(0, limit);
  const data = posts.map(toFeedItem);

  const headers = {
    "Content-Type": "application/json",
    ...corsHeaders(),
    ...cacheHeaders(`feed:${tag || "all"}:${limit}`),
  };

  return Response.json({ data }, { headers });
}

