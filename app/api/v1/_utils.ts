import sitePackage from "../../../package.json" assert { type: "json" };
import crypto from "crypto";

export type FeedItem = {
  slug: string;
  slugAsParams?: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  canonicalUrl: string;
};

export function getSiteBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const pkgUrl = (sitePackage as any)?.homepage as string | undefined;
  const base = envUrl || pkgUrl || "";
  return base.replace(/\/$/, "");
}

export function toFeedItem(p: any): FeedItem {
  const base = getSiteBaseUrl();
  const slug = p.slug as string;
  const canonicalUrl = base ? `${base}/${slug}` : `/${slug}`;
  return {
    slug,
    slugAsParams: p.slugAsParams,
    title: p.title,
    description: p.description,
    date: p.date,
    tags: p.tags,
    canonicalUrl,
  };
}

export async function getAllPosts(): Promise<any[]> {
  try {
    // Fetch posts data from public directory
    // In development, construct localhost URL; in production, use full URL
    const postsUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001/data/posts.json'
      : `${getSiteBaseUrl()}/data/posts.json`;

    console.log("Attempting to fetch posts from:", postsUrl);

    const response = await fetch(postsUrl);

    if (!response.ok) {
      console.error("Failed to fetch posts.json:", response.status, response.statusText);
      return [];
    }

    const posts = await response.json() as any[];

    // Ensure newest first by date desc
    const sortedPosts = [...posts].sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );

    console.log(`Successfully loaded ${posts.length} posts from ${postsUrl}`);
    console.log("Latest post:", sortedPosts[0]?.title, sortedPosts[0]?.date);

    return sortedPosts;
  } catch (error) {
    console.error("Error fetching posts data:", error);
    return [];
  }
}

export function paginate<T>(items: T[], page = 1, perPage = 10) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(page, 1), totalPages);
  const start = (current - 1) * perPage;
  const end = start + perPage;
  return {
    data: items.slice(start, end),
    meta: { page: current, per_page: perPage, total, total_pages: totalPages },
  };
}

export function filterByTag(items: any[], tag?: string) {
  if (!tag) {
    return items;
  }
  const t = tag.toLowerCase();
  return items.filter((p) => (p.tags || []).some((x: string) => x.toLowerCase() === t));
}

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
  };
}

/**
 * Generate content-based hash for ETag from posts data
 * This ensures ETag changes when actual content changes
 */
export function generateContentHash(posts: any[]): string {
  // Create a minimal representation of content for hashing
  const contentSignature = posts.map(p => ({
    slug: p.slug,
    date: p.date,
    title: p.title
  }));

  const contentString = JSON.stringify(contentSignature);
  return crypto.createHash('md5').update(contentString).digest('hex').slice(0, 12);
}

export function cacheHeaders(contentHash?: string, legacyKey?: string) {
  const headers: Record<string, string> = {
    // New conservative caching strategy:
    // - s-maxage=1800: Edge cache for 30 minutes (vs 24h stale-while-revalidate)
    // - max-age=300: Browser cache for 5 minutes
    // - must-revalidate: Prevent stale content serving
    "Cache-Control": "public, s-maxage=1800, max-age=300, must-revalidate",
    Vary: "Accept-Encoding, Origin",
  };

  if (contentHash) {
    // Strong ETag based on actual content hash
    headers["ETag"] = `"${contentHash}"`;
  } else if (legacyKey) {
    // Fallback weak ETag for backwards compatibility
    headers["ETag"] = `W/"${Buffer.from(legacyKey).toString("base64")}"`;
  }

  return headers;
}
