import sitePackage from "../../../package.json" assert { type: "json" };
import fs from "fs";
import path from "path";

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

export function getAllPosts(): any[] {
  try {
    // Dynamically read posts.json to ensure latest content in production
    const postsPath = path.join(process.cwd(), ".velite", "posts.json");

    if (!fs.existsSync(postsPath)) {
      console.warn("posts.json not found at:", postsPath);
      return [];
    }

    const postsContent = fs.readFileSync(postsPath, "utf-8");
    const posts = JSON.parse(postsContent) as any[];

    // Ensure newest first by date desc
    return [...posts].sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
  } catch (error) {
    console.error("Error reading posts.json:", error);
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
