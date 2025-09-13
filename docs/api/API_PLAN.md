# External Blog API Plan (Portfolio Integration)

## Goals
- Power a “Latest Posts” tab in the portfolio via a small, stable JSON feed.
- Avoid content duplication/SEO issues; keep full reading on the blog.

## Data Source
- Canonical data: `./.velite/posts.json` (from `content/blog/**/*.mdx`).
- Types: `./.velite/index.d.ts` (`type Post`).

## Integration Strategy
1) Portfolio consumes a minimal feed for cards (title, date, tags, excerpt, canonicalUrl).
2) Cards link to the blog’s canonical URLs for full reading.
3) Optional: expose full post body for future deep integration, but keep disabled by default.

## Endpoints (v1)
- GET `/api/v1/feed`
  - Query: `limit` (default 6, max 20), `tag` (optional).
  - Returns a compact list for portfolio cards. Body excluded.
- GET `/api/v1/posts`
  - Query: `page` (1), `per_page` (10, max 50), `tag`, `sort` (date_desc|date_asc).
  - General listing for other consumers (still no body).
- GET `/api/v1/posts/[slug]` (optional)
  - `include=body` to return full content when explicitly requested.

## Response Shapes
- Feed item: `{ slug, title, description, date, tags, canonicalUrl }`
- List: `{ data: FeedItem[], meta: { page, per_page, total, total_pages } }`
- Detail (optional): `{ data: Post | (Post & { body: string }) }`
- Compute `canonicalUrl` using site base URL (prefer `process.env.NEXT_PUBLIC_SITE_URL` or `package.json#homepage`).

## Caching, CORS, Versioning
- Revalidate: `export const revalidate = 300` (5 min) per route.
- Headers: `Cache-Control: s-maxage=300, stale-while-revalidate=86400`; include `ETag` hash.
- CORS: `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET`.
- Prefix with `/api/v1` to allow non-breaking future changes.

## Implementation Steps
1) Add `app/api/v1/_utils.ts` with: `toFeedItem(post)`, `paginate(list)`, `cors()` and `cacheHeaders(key)`.
2) Implement `/api/v1/feed` (limit, tag) from in-memory `posts` array, sorted by `date` desc.
3) Implement `/api/v1/posts` with pagination and tag filter; exclude `body`.
4) (Optional) `/api/v1/posts/[slug]` with `include=body` only when requested.
5) Document usage in `README.md#Public API` with portfolio snippets.

## Examples
- Portfolio fetch (build-time or ISR): `/api/v1/feed?limit=6`
- Tag-filtered feed: `/api/v1/feed?tag=nextjs&limit=6`
- General listing: `/api/v1/posts?page=1&per_page=10`
