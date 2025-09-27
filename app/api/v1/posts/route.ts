export const revalidate = 86400; // ISR every 24 hours - matches actual content update frequency

import { NextRequest } from "next/server";
import {
  cacheHeaders,
  corsHeaders,
  filterByTag,
  getAllPosts,
  paginate,
  toFeedItem,
  generateContentHash,
} from "../_utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const perPage = Math.min(Math.max(Number(searchParams.get("per_page")) || 10, 1), 50);
  const tag = searchParams.get("tag") || undefined;
  const sort = (searchParams.get("sort") || "date_desc").toLowerCase();

  const allPosts = await getAllPosts();
  let items = filterByTag(allPosts, tag);
  if (sort === "date_asc") {
    items = [...items].reverse();
  }

  const { data, meta } = paginate(items, page, perPage);
  const payload = { data: data.map(toFeedItem), meta };

  // Generate content-based ETag hash
  const contentHash = generateContentHash(allPosts);

  const headers = {
    "Content-Type": "application/json",
    ...corsHeaders(),
    ...cacheHeaders(contentHash),
  };

  return Response.json(payload, { headers });
}

