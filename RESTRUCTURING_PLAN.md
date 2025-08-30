# Project Structure Restructuring Plan - Phase 4

## 🎯 **Objective**
Restructure the codebase using 2025 best practices: **feature-based, domain-driven organization** instead of technical separation.

## 📊 **Current Issues Analysis**
- **Flat structure**: All 20+ components in single folder without grouping
- **Mixed concerns**: UI components mixed with feature-specific components
- **Scattered features**: Search components spread across 3 files without grouping
- **Inconsistent naming**: `useInjectCopyButtons` vs `use-search` pattern
- **No domain boundaries**: Blog, navigation, and MDX components not grouped by business domain

## 🏗️ **New Structure (Feature-Based)**

### **1. Components Reorganization**
```
components/
├── ui/                    # ✅ Keep - Pure reusable UI components
│   ├── [existing shadcn components]
│   ├── content-card.tsx
│   ├── tag-list.tsx
│   └── loading-spinner.tsx
├── features/              # 🆕 NEW - Business domain components
│   ├── blog/             # Blog domain
│   │   ├── post-item.tsx
│   │   ├── tag.tsx
│   │   └── query-pagination.tsx
│   ├── search/           # Search domain  
│   │   ├── search-input.tsx
│   │   ├── search-results-virtualized.tsx
│   │   └── search-error-boundary.tsx
│   ├── navigation/       # Navigation domain
│   │   ├── main-nav.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── site-header.tsx
│   │   └── site-footer.tsx
│   └── mdx/             # Content authoring domain
│       ├── mdx-components.tsx
│       ├── callout.tsx
│       └── collapsible-codeblock.tsx
├── layout/              # 🆕 NEW - Layout-specific components
│   ├── provider.tsx
│   ├── mode-toggle.tsx
│   └── error-boundary.tsx
└── icons.tsx            # ✅ Keep - Global icons
```

### **2. Hooks Reorganization**
```
hooks/
├── use-blog-stats.ts     # ✅ Keep - Consistent naming
├── features/             # 🆕 NEW - Feature-specific hooks
│   └── search/
│       ├── use-search.ts
│       ├── use-search-cache.ts
│       └── use-search-shortcut.ts
└── ui/                   # 🆕 NEW - UI-specific hooks
    └── use-inject-copy-buttons.ts  # 📝 Rename for consistency
```

### **3. Lib Structure Enhancement**
```
lib/
├── utils/               # 🆕 SPLIT - Pure utilities
│   ├── formatting.ts   # Date, text formatting functions
│   ├── blog.ts         # Blog-specific utilities (sorting, tags)
│   └── ui.ts          # UI utilities (cn function)
├── content/            # ✅ Keep - Content management
├── metadata.ts         # ✅ Keep - SEO utilities
└── structured-data.ts  # ✅ Keep - JSON-LD utilities
```

## 🔄 **Migration Strategy**

### **Phase A: Create New Structure (Safe)**
1. Create new folder structure without moving files
2. Add barrel exports (`index.ts`) for clean imports
3. Test that current imports still work

### **Phase B: Move & Rename Files**  
1. **Blog domain**: `post-item.tsx`, `tag.tsx`, `query-pagination.tsx`
2. **Search domain**: `search-*` components + related hooks
3. **Navigation domain**: `*-nav.tsx`, `site-header.tsx`, `site-footer.tsx`
4. **MDX domain**: `mdx-components.tsx`, `callout.tsx`, `collapsible-codeblock.tsx`
5. **Layout**: `provider.tsx`, `mode-toggle.tsx`, `error-boundary.tsx`

### **Phase C: Update Imports & References**
1. Update all import statements across the codebase
2. Add barrel exports for clean feature imports
3. Update any build configurations if needed

### **Phase D: Split Utils & Improve Naming**
1. Split `lib/utils.ts` into domain-specific utilities
2. Rename `useInjectCopyButtons` → `use-inject-copy-buttons`
3. Update all references

## 📋 **File Movement Plan**

### **Components to Move:**
- `blog/`: post-item.tsx, tag.tsx, query-pagination.tsx  
- `search/`: search-input.tsx, search-results-virtualized.tsx, search-error-boundary.tsx
- `navigation/`: main-nav.tsx, mobile-nav.tsx, site-header.tsx, site-footer.tsx
- `mdx/`: mdx-components.tsx, callout.tsx, collapsible-codeblock.tsx
- `layout/`: provider.tsx, mode-toggle.tsx, error-boundary.tsx

### **Hooks to Move:**
- `features/search/`: use-search.ts, use-search-cache.ts, use-search-shortcut.ts
- `ui/`: useInjectCopyButtons.ts → use-inject-copy-buttons.ts

### **Utils to Split:**
- Create `utils/formatting.ts`, `utils/blog.ts`, `utils/ui.ts` from `utils.ts`

## ✅ **Benefits**
- **Domain clarity**: Related components grouped by business purpose
- **Easier navigation**: Find blog components in blog/, search in search/
- **Better maintainability**: Changes to search feature contained in one folder
- **Consistent naming**: All hooks follow `use-kebab-case` pattern
- **Scalable**: Easy to add new domains (auth/, dashboard/, etc.)

## 📏 **Success Criteria**
1. All components organized by business domain
2. Clean barrel exports for feature imports  
3. Consistent kebab-case naming for hooks
4. No breaking changes to existing functionality
5. Build and tests pass
6. Improved developer experience when finding files

**Estimated Impact**: 📁 39 files affected, 🔄 ~50 import updates, ⏱️ 2-3 hours implementation

## 🚀 **Implementation Notes**
- Use git mv to preserve history
- Create branch from optimization-phase-3
- Test build after each phase
- Update any documentation that references old paths