# Repository Guidelines

## Project Structure & Module Organization
- `app/` Next.js App Router pages, layouts, route handlers. Keep route folders lowercase; page/layout files as `page.tsx`/`layout.tsx`.
- `components/` Reusable UI components (PascalCase files, e.g., `NavBar.tsx`).
- `hooks/` React hooks by feature.
- `lib/` Utilities, data helpers, and config loaders.
- `content/` MD/MDX source for posts; processed by Velite. Do not edit `.velite/` (generated).
- `public/` Static assets; referenced via `/img.png`.
- `styles/`, `tailwind.config.ts`, `postcss.config.mjs` for styling.

## Build, Test, and Development Commands
Use one package manager consistently (pnpm preferred).
- Dev: `pnpm dev` (or `npm run dev`) — starts Next.js with hot reload.
- Build: `pnpm build` — production build (also runs content processing).
- Start: `pnpm start` — serve production build.
- Lint: `pnpm lint` — ESLint with Next core web vitals.
- Analyze: `pnpm run analyze` — bundles with analyzer enabled; `pnpm run bundle-analyzer` to open analyzer.

## Coding Style & Naming Conventions
- Language: TypeScript, strict mode; 2-space indent.
- Files: Components PascalCase (`PostCard.tsx`); routes lowercase (`app/blog/[slug]/page.tsx`).
- Imports: Use path aliases `@/*` and `#site/content` (from `.velite/`). Group external → internal.
- ESLint: See `.eslintrc.json` (e.g., no `var`, prefer `const`, no unused vars except `_arg`). Fix warnings before PR.
- Styling: Tailwind CSS; use utility-first with extracted components for repetition.

## Testing Guidelines
- No formal test harness yet. For logic-heavy utilities, add unit tests (recommended: Vitest + Testing Library) under `**/*.test.ts(x)`.
- Include a manual test plan in PRs (pages touched, steps to verify, expected/actual).

## Commit & Pull Request Guidelines
- Versioning follows SemVer; changelog uses Keep a Changelog (`CHANGELOG.md`).
- Commit style: Prefer Conventional Commits (e.g., `feat:`, `fix:`, `docs:`) with concise scope.
- PRs must include: clear description, rationale, screenshots/GIFs for UI, steps to test, and linked issues.
- Keep diffs focused; refactors separate from feature/bugfix where possible.

## Security & Configuration Tips
- Create `.env.local` from `.env.local.example`; never commit secrets.
- Validate MDX content; avoid unsafe eval. Follow CSP-friendly patterns.
- Do not edit generated folders: `.next/`, `.velite/`.

