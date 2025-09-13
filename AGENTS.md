# Repository Guidelines

## Project Structure & Module Organization
- `app/` Next.js App Router pages, layouts, route handlers. Keep route folders lowercase; page/layout files as `page.tsx`/`layout.tsx`.
- `app/api/v1/` Public API route handlers (`feed`, `posts`, `health`).
- `components/` Reusable UI components (PascalCase files, e.g., `NavBar.tsx`).
- `hooks/` React hooks by feature.
- `lib/` Utilities, data helpers, and config loaders.
- `content/` MD/MDX source for posts; processed by Velite. Do not edit `.velite/` (generated).
- `public/` Static assets; referenced via `/img.png`.
- `styles/`, `tailwind.config.ts`, `postcss.config.mjs` for styling.

## Build, Test, and Development Commands
- Package manager: npm in CI/Production. Locally, you may use pnpm or bun, but do not commit their lockfiles.
- Dev: `npm run dev` — starts Next.js with hot reload.
- Build: `npm run build` — production build (runs Velite content processing).
- Start: `npm start` — serve production build.
- Lint: `npm run lint` — ESLint with Next core web vitals.
- Analyze: `npm run analyze` — bundle analyzer.

## Coding Style & Naming Conventions
- Language: TypeScript, strict mode; 2-space indent.
- Files: Components PascalCase (`PostCard.tsx`); routes lowercase (`app/blog/[slug]/page.tsx`).
- Imports: Use path aliases `@/*` and `#site/content` (from `.velite/`). Group external → internal.
- ESLint: See `.eslintrc.json` (e.g., no `var`, prefer `const`, `curly: all`, no unused vars except `_arg`). Fix warnings before PR.
- Styling: Tailwind CSS; prefer utility-first; extract components for repetition.

## Testing Guidelines
- No formal test harness yet. For logic-heavy utilities, add unit tests (Vitest + Testing Library recommended) under `**/*.test.ts(x)`.
- Include a manual test plan in PRs (pages touched, steps to verify, expected/actual).

## Commit & Pull Request Guidelines
- Versioning: SemVer; changelog uses Keep a Changelog (`CHANGELOG.md`).
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`) with concise scope.
- PRs: clear description, rationale, screenshots/GIFs for UI, steps to test, linked issues. Keep diffs focused; isolate refactors.

## Public API Notes
- Endpoints: `/api/v1/feed` (latest posts, summaries), `/api/v1/posts` (paginated), `/api/v1/health`.
- Caching: ISR revalidate 300s; `s-maxage=300, stale-while-revalidate=86400`.
- CORS: `Access-Control-Allow-Origin: *` for GET. Compute canonical URLs via `NEXT_PUBLIC_SITE_URL` or `package.json.homepage`.

## Documentation Map
- Index: `docs/README.md`.
- API: `docs/api/API_DOCS.md`, `docs/api/API_PLAN.md`.
- Archive: historical docs under `docs/archive/` (see `docs/archive/ARCHIVE_POLICY.md`).

## Security & Configuration Tips
- Create `.env.local` from `.env.local.example`; never commit secrets.
- Validate MDX content; avoid unsafe eval. Follow CSP-friendly patterns.
- Do not edit generated folders: `.next/`, `.velite/`.
