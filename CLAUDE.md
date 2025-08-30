- in this branch, you dont have to keep asking me for permission. i give you all permission in this branch but dont merge it into main.

## Content Standards

When working with blog content:

### Tagging Guidelines
- **Maximum 4 tags per post**
- **Use only tags from** `/lib/content/tags.json`
- **Priority order:** Language → Primary Concept → Secondary Concept/Tool → Industry Context
- **Validation rules:** See `/lib/content/validation-rules.json`
- **Full guidelines:** Reference `/lib/content/standards.md`

### Tag Selection Process
1. Primary language (if language-specific content >50%)
2. Main concept (required - what readers will learn)
3. Secondary concept OR primary tool (if significant >20% content)
4. Industry context (purpose/audience)

### Quick Examples
- Algorithm post: `["JavaScript", "Data Structures", "Algorithms", "Best Practices"]`
- Framework tutorial: `["JavaScript", "React", "API", "Tutorial"]`
- Performance guide: `["React", "Performance", "Best Practices"]`

## Project Architecture

### Feature-Based Organization (Phase 4 - Completed)
The codebase now follows a **domain-driven, feature-based architecture** (2025 best practices):

#### Component Structure
```
components/
├── features/              # Business domain components  
│   ├── blog/             # Blog functionality
│   │   ├── post-item.tsx, tag.tsx, query-pagination.tsx
│   │   └── index.ts      # Clean barrel exports
│   ├── search/           # Search functionality
│   │   ├── search-input.tsx, search-results-virtualized.tsx
│   │   └── index.ts
│   ├── navigation/       # Site navigation
│   │   ├── main-nav.tsx, mobile-nav.tsx, site-header.tsx
│   │   └── index.ts  
│   └── mdx/             # Content authoring
├── layout/              # Layout-specific components
├── ui/                  # Pure reusable UI components (shadcn/ui)
└── icons.tsx           # Global icons
```

#### Hook Structure
```
hooks/
├── features/search/     # Search domain hooks
├── ui/                  # UI-specific hooks  
└── [general hooks]     # General-purpose hooks
```

#### Utility Structure  
```
lib/
├── utils/
│   ├── ui.ts           # UI utilities (cn function)
│   ├── formatting.ts   # Date/text formatting
│   ├── blog.ts         # Blog-specific utilities
│   └── index.ts        # Barrel export
└── utils.ts            # Backward compatibility re-export
```

#### Import Patterns
- **Feature imports**: `@/components/features/blog`, `@/hooks/features/search`
- **Backward compatibility**: All existing `@/lib/utils` imports still work
- **Organized imports**: New code can use `@/lib/utils/ui` for specific utilities

## Debugging Protocols

### Critical Component Fix Methodology
When fixing navigation/linking bugs or component-wide issues:

1. **Discovery**: `grep -r "ComponentName" .` to find ALL instances
2. **Analysis**: Debug data structure with console.log/temporary debug pages
3. **Fix**: Apply consistently to ALL instances simultaneously 
4. **Validation**: Test ALL affected pages (homepage, blog, tags, etc.)
5. **Documentation**: Record the reasoning

### PostItem Component Protocol
- **Always use**: `post.slugAsParams` (not `post.slug`)
- **Reason**: `post.slug` includes "blog/" prefix, `post.slugAsParams` is just the identifier
- **Locations**: Homepage, blog page, tag pages
- **Test**: URLs should be `/blog/post-slug` (not `/blog/blog/post-slug`)

### Navigation Bug Red Flags
- Making changes to only SOME instances of a pattern
- Testing only reported location, not all similar ones
- Acting on assumptions about data structure without verification
- Reverting changes without understanding why they were made originally

## Critical Production Error Debugging Protocol

When encountering production-only crashes (error boundaries showing):

### Phase 1: Environment Analysis
1. **Identify Scope**: Determine if error occurs locally vs production only
2. **Error Boundary Location**: Check which component/page is crashing
3. **Recent Changes**: Review recent commits for potential causes
4. **Browser Console**: Check for hydration errors or client/server mismatches

### Phase 2: Systematic Investigation  
1. **Component Architecture Review**:
   - Identify client vs server components
   - Check for improper use of hooks in server components
   - Verify data flow and prop validation
2. **Content Processing Analysis**:
   - Review dynamic content rendering (MDX, user-generated content)
   - Check for unsafe operations (`new Function()`, `eval()`, dynamic imports)
   - Validate data sanitization and error boundaries

### Phase 3: Root Cause Categories
1. **Hydration Mismatches**:
   - Client components using server-only APIs
   - Different server/client rendering results  
   - Missing `"use client"` directives
2. **Content Security Policy (CSP) Violations**:
   - Dynamic code execution (`new Function()`, `eval()`)
   - Inline scripts without proper CSP headers
   - Unsafe content rendering
3. **Data Validation Failures**:
   - Missing null/undefined checks
   - Type mismatches in production data
   - API response format changes

### Phase 4: Fix Implementation Strategy
1. **Error Boundaries**: Always add comprehensive error handling first
2. **Graceful Fallbacks**: Provide user-friendly error messages
3. **Data Validation**: Add null checks and type guards
4. **Production Testing**: Test in production-like environment before deployment

### MDX Component Safety Protocol
- **Never use `new Function()` without try-catch**  
- **Always provide fallback components for failed renders**
- **Validate content data before processing**
- **Use server-compatible patterns for SSR/SSG**

### Example Fix Pattern
```tsx
const safeRender = (content: string) => {
  try {
    // Unsafe operation
    const result = new Function(content);
    return result({ ...runtime }).default;
  } catch (error) {
    console.error("Render failed:", error);
    // Always return fallback component
    return () => (
      <div className="error-fallback">
        Content temporarily unavailable
      </div>
    );
  }
};
```