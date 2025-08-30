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