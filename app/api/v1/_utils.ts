import sitePackage from "../../../package.json" assert { type: "json" };

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

    console.log(`Successfully loaded ${posts.length} posts from ${postsUrl}`);
    console.log("Latest post:", posts[0]?.title, posts[0]?.date);

    // Ensure newest first by date desc
    return [...posts].sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
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

export function cacheHeaders(key?: string) {
  const headers: Record<string, string> = {
    "Cache-Control": "s-maxage=300, stale-while-revalidate=86400",
    Vary: "Accept-Encoding, Origin",
  };
  if (key) {
    // Lightweight ETag based on key (caller may pass a hash if desired)
    headers["ETag"] = `W/"${Buffer.from(key).toString("base64")}"`;
  }
  return headers;
}
