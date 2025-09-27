export const revalidate = 86400; // ISR every 24 hours - matches actual content update frequency

import { NextRequest } from "next/server";
import {
  cacheHeaders,
  corsHeaders,
  filterByTag,
  getAllPosts,
  toFeedItem,
  generateContentHash,
} from "../_utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const tag = searchParams.get("tag") || undefined;

  const limit = Math.min(Math.max(Number(limitParam) || 6, 1), 20);

  const allPosts = await getAllPosts();
  const posts = filterByTag(allPosts, tag).slice(0, limit);
  const data = posts.map(toFeedItem);

  // Generate content-based ETag hash
  const contentHash = generateContentHash(allPosts);

  const headers = {
    "Content-Type": "application/json",
    ...corsHeaders(),
    ...cacheHeaders(contentHash),
  };

  return Response.json({ data }, { headers });
}

