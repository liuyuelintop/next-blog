# Archived: Debugging Protocols

Archived: 2025-09-13
Status: Outdated; historical reference only
Rationale: Procedures no longer reflect current stack/practices

This archive captures durable debugging practices used previously. Use for historical context only.

## Critical Component Fix Methodology
- Discovery: search all usages (`grep -R "ComponentName" .`) to find every instance.
- Analysis: verify data shapes with temporary logs or debug pages.
- Fix wide: apply consistent changes to all instances at once.
- Validate: test all affected pages (home, blog list, tags, post detail).
- Document: record the root cause and prevention.

## PostItem URL Protocol
- Always prefer `post.slugAsParams` for building URLs.
- Reason: `post.slug` includes the `blog/` prefix; `slugAsParams` is just the identifier.
- Expected URLs: `/blog/<slug>` (avoid `/blog/blog/<slug>`).

## Navigation Bug Red Flags
- Fixing only some instances of a recurring pattern.
- Testing a single location instead of all similar ones.
- Assuming data structure without validation.
- Reverting fixes without root-cause understanding.

## Critical Production Error Debugging
1) Environment analysis
- Scope: local vs production-only.
- Boundary: which component/page fails?
- Recency: recent commits touching the area?
- Console: hydration errors, client/server mismatches.

2) Systematic investigation
- Architecture: client vs server components; correct "use client" usage.
- Content: MDX and dynamic content paths; sanitize inputs.
- Unsafe ops: avoid `new Function()`, `eval()`, and dynamic imports without guards.

3) Root cause categories
- Hydration mismatch: server/client render divergence, improper hooks in server components.
- CSP violations: dynamic code execution, inline scripts, unsafe rendering.
- Data validation failures: null/undefined, type mismatches, schema drift.

## MDX Component Safety
- Never use `new Function()` without try/catch and clear fallbacks.
- Always provide a fallback component when rendering fails.
- Validate MDX content before processing.
- Prefer server-compatible, SSR-friendly patterns.

### Example Fallback Pattern
```tsx
const safeRender = (content: string) => {
  try {
    // Potentially unsafe operation
    const result = new Function(content);
    return result({ /* runtime */ }).default;
  } catch (error) {
    console.error("Render failed:", error);
    return () => (
      <div className=\"error-fallback\">Content temporarily unavailable</div>
    );
  }
};
```
