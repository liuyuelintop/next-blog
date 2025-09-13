# Public API Documentation

This API exposes a lightweight, cache-friendly feed of your blog posts for use in your portfolio and other clients. Endpoints are read-only and versioned under `/api/v1`.

## Best Practices
- Use `/api/v1/feed` for portfolio “Latest Posts” cards; link to `canonicalUrl` for full reading.
- Respect caching: responses include `Cache-Control` and optional `ETag`. Clients should cache for 5 minutes.
- Keep requests small: prefer `limit<=20`, avoid fetching full bodies unless necessary.
- Handle CORS: API allows `GET` from any origin; avoid sending credentials.
- Treat the blog as canonical: do not republish full content without `rel=canonical`.

## Data Model
- Source: Velite-generated `./.velite/posts.json`.
- Feed item fields: `slug`, `slugAsParams?`, `title`, `description?`, `date`, `tags?`, `canonicalUrl`.

## Endpoints
- GET `/api/v1/health`
  - Returns `{ status: "ok", version, time, posts: { total } }`. No cache.
- GET `/api/v1/feed?limit=6&tag=nextjs`
  - Params: `limit` (default 6, max 20), `tag` (optional).
  - Returns `{ data: FeedItem[] }`. Sorted by `date` desc. No `body`.
- GET `/api/v1/posts?page=1&per_page=10&tag=nextjs&sort=date_desc`
  - Params: `page` (1+), `per_page` (1–50), `tag` (optional), `sort` (`date_desc|date_asc`).
  - Returns `{ data: FeedItem[], meta: { page, per_page, total, total_pages } }`.

## Headers & Caching
- Common: `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET`.
- Cache: `Cache-Control: s-maxage=300, stale-while-revalidate=86400`, `Vary: Accept-Encoding, Origin`.
- Health: `Cache-Control: no-store`.

## Error Format
- On invalid routes/inputs, expect standard HTTP codes (e.g., 404). Error bodies use `{ error: { message, code } }` when applicable.

## Examples
- curl
  - `curl -s https://your-blog-domain/api/v1/health | jq` 
  - `curl -s "https://your-blog-domain/api/v1/feed?limit=6" | jq` 
  - `curl -s "https://your-blog-domain/api/v1/posts?page=1&per_page=10&tag=nextjs" | jq`
- Node (fetch)
  - `const res = await fetch('/api/v1/feed?limit=6'); const { data } = await res.json();`
- Portfolio (Next.js, build-time)
  - `export const revalidate = 300;`
  - `const res = await fetch('https://your-blog-domain/api/v1/feed?limit=6', { next: { revalidate: 300 } });`

## Local Testing
- Install and run: `pnpm install && pnpm dev` (or `bun install && bun run dev`).
- Health check: `http://localhost:3000/api/v1/health`
- Feed: `http://localhost:3000/api/v1/feed?limit=6`
- Posts: `http://localhost:3000/api/v1/posts?page=1&per_page=10`

