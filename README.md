# YuelinBlog - Modern Developer Blog Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Velite](https://img.shields.io/badge/Velite-MDX-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-Optimized-brightgreen?style=for-the-badge)

**A modern, fast, and feature-rich blog platform built with Next.js 14+, TypeScript, and MDX**

[🚀 **Live Demo**](https://blog.liuyuelin.dev/) • [📚 **Documentation**](#documentation) • [🎯 **Features**](#features) • [🛠️ **Quick Start**](#quick-start) • [🔌 **API**](#public-api)

</div>

---

## ✨ Features

### 🔍 **Advanced Search**

- **Real-time fuzzy search** across all content with Fuse.js
- **Keyboard shortcuts** (⌘K / Ctrl+K) for quick access
- **Smart suggestions** with highlighted matches
- **Mobile-optimized** search experience
- **Error boundary protection** for graceful search failure recovery

### 📝 **Content Management**

- **MDX support** with custom components
- **Syntax highlighting** with multiple themes
- **Auto-generated** table of contents
- **Enhanced tag system** with categorized display (29 curated categories)
- **Comprehensive tags page** with color-coded sections and improved navigation
- **Dynamic content metrics** with auto-updating statistics
- **Dynamic Open Graph** images

### ⚡ **Performance & Reliability**

- **Bundle analysis** with Next.js Bundle Analyzer (102kB baseline)
- **Image optimization** with WebP/AVIF format support and responsive sizing
- **Error boundaries** for graceful component failure recovery
- **Production-tested** MDX rendering with comprehensive error handling
- **TypeScript strict mode** for enhanced type safety
- **ESLint strict rules** for code quality enforcement
- **30-day image caching** for optimal performance
- **Static site generation** for lightning-fast loading
- **Critical bug protection** - robust error handling prevents production crashes

### 🎨 **Modern Design**

- **Responsive design** with mobile-first approach
- **Dark/Light theme** toggle with system preference detection
- **Shadcn/ui components** for consistent design system
- **Tailwind CSS** for rapid styling
- **Professional typography** with @tailwindcss/typography
- **Improved UI/UX** with fixed sidebar positioning and better scroll behavior
- **Enhanced navigation** with tags integration in main and mobile menus
- **Error-resilient UI** with comprehensive error boundary implementation

### 🛡️ **Reliability & Quality**

- **Error boundary system** for graceful failure handling
- **TypeScript strict mode** with comprehensive type checking
- **Zero ESLint warnings** across the entire codebase
- **Automated code quality checks** with strict linting rules
- **Performance monitoring** foundation for continuous optimization

### 🛠️ **Developer Experience**

- **TypeScript** for type safety with strict mode enabled
- **Feature-based architecture** following 2025 best practices for scalable codebases
- **Domain-driven organization** - components grouped by business purpose, not technical type
- **Clean import patterns** with barrel exports and backward compatibility
- **Bundle analysis tools** with `npm run analyze` command
- **Performance monitoring** setup for optimization tracking
- **ESLint & Prettier** for code quality
- **Git hooks** for automated checks
- **Hot reload** in development
- **One-click deployment** to Vercel

---

 

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### 1. Clone & Install

```bash
git clone https://github.com/liuyuelintop/next-blog.git
cd next-blog
npm install
```

### 2. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog running locally.

### 3. Create Your First Post

Create a new MDX file in `content/blog/`:

```markdown
---
title: "My First Post"
description: "This is my first blog post"
date: 2024-01-20
tags: ["tutorial", "getting-started"]
published: true
---

# Welcome to My Blog

This is my first post using **YuelinBlog**!
```

### 4. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/liuyuelintop/next-blog)

---

## 📖 Documentation

- Docs index: [docs/README.md](docs/README.md)
- Public API: [docs/api/API_DOCS.md](docs/api/API_DOCS.md)
- Archive: [docs/archive/](docs/archive)

### Tech Stack

| Technology       | Purpose                               | Version    | Optimization |
| ---------------- | ------------------------------------- | ---------- | ------------ |
| **Next.js**      | React framework with App Router       | 15.5+      | Bundle analysis, Image optimization |
| **TypeScript**   | Type safety and developer experience  | 5.0+       | Strict mode enabled |
| **Velite**       | Content management and MDX processing | 0.1.0-rc.3 | Build optimization |
| **Tailwind CSS** | Utility-first CSS framework           | 3.4+       | Purged CSS |
| **Shadcn/ui**    | React component library               | Latest     | Tree-shaking |
| **Fuse.js**      | Fuzzy search functionality            | 7.1+       | Error boundaries |

### Project Structure

**Feature-Based Architecture (2025 Best Practices)**

```
├── app/                 # Next.js App Router pages
│   ├── blog/           # Blog post pages  
│   ├── tags/           # Enhanced tag-based filtering with categories
│   ├── about/          # Dynamic about page with auto-updating metrics
│   └── search/         # Search functionality with error boundaries
├── components/         # Organized by business domain
│   ├── features/       # Domain-specific components
│   │   ├── blog/      # Blog functionality (post-item, tag, pagination)
│   │   ├── search/    # Search functionality (input, results, error boundary)  
│   │   ├── navigation/# Site navigation (header, footer, nav components)
│   │   └── mdx/       # Content authoring (MDX components, callouts)
│   ├── layout/        # Layout-specific components (providers, theme, errors)
│   ├── ui/           # Pure reusable UI components (shadcn/ui)
│   └── icons.tsx     # Global icon components
├── hooks/             # Organized by domain
│   ├── features/     # Feature-specific hooks
│   │   └── search/   # Search domain hooks (search, cache, shortcuts)
│   ├── ui/          # UI-specific hooks (copy buttons, etc.)
│   └── [general]    # General-purpose hooks (blog stats, etc.)
├── lib/              # Domain-specific utilities
│   ├── utils/       # Organized utility functions
│   │   ├── ui.ts    # UI utilities (className merging)
│   │   ├── formatting.ts # Date/text formatting
│   │   └── blog.ts  # Blog-specific utilities (sorting, tags, stats)
│   ├── content/     # Content standards and tag validation system
│   └── [other libs] # Metadata, structured data, etc.
├── content/         # MDX blog posts
│   └── blog/        # Individual post files
├── styles/          # CSS and styling
└── public/          # Static assets
```

**Import Patterns:**
```typescript
// Feature-based imports (recommended for new code)
import { PostItem, Tag } from '@/components/features/blog';
import { useSearch } from '@/hooks/features/search';  
import { cn } from '@/lib/utils/ui';

// Backward compatible imports (existing code continues working)  
import { PostItem } from '@/components/features/blog/post-item';
import { cn, formatDate, getBlogStats } from '@/lib/utils';
```

 

### Configuration

#### Site Configuration

Edit `config/site.ts` to customize your blog:

```typescript
export const siteConfig = {
  name: "Your Blog Name",
  url: "https://yourblog.com",
  description: "Your blog description",
  author: "Your Name",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
  },
};
```

#### Performance Configuration

Image optimization is configured in `next.config.mjs`:

```javascript
export default {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};
```

#### Content Schema

Blog posts use the following frontmatter:

```yaml
---
title: string (max 99 chars)
description: string (max 999 chars, optional)
date: ISO date string
tags: array of strings (optional, max 4 tags recommended)
published: boolean (default: true)
---
```

## Public API

Lightweight, cache-friendly API for external consumption (e.g., your portfolio).

- Endpoints
  - `GET /api/v1/feed?limit=6&tag=nextjs` — latest posts (no body), sorted by date desc
  - `GET /api/v1/posts?page=1&per_page=10&tag=nextjs` — paginated listing (no body)
  - `GET /api/v1/health` — service status, version, post count
- Caching & CORS
  - ISR revalidate: 300s; `Cache-Control: s-maxage=300, stale-while-revalidate=86400`
  - CORS: `Access-Control-Allow-Origin: *` for GET
- Examples
  - `curl -s "https://<your-domain>/api/v1/feed?limit=6" | jq`
  - `curl -s "https://<your-domain>/api/v1/posts?page=1&per_page=10" | jq`

 

---

 

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run performance analysis: `npm run analyze`
5. Ensure code quality: `npm run lint`
6. Test the build: `npm run build`
7. Commit your changes: `git commit -m 'Add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

### Code Quality Standards

- **TypeScript strict mode** compliance required
- **Zero ESLint warnings** before submitting
- **Error boundary protection** for new components
- **Performance impact** consideration for new features

### Package Manager Policy

- Production/CI: npm (default on Vercel). The npm lockfile is authoritative.
- Local development: you may use pnpm or bun for speed, but do not commit their lockfiles.
- `.gitignore` ignores `pnpm-lock.yaml` and `bun.lock` to prevent accidental commits.

### Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/liuyuelintop/next-blog/issues) with:

- Clear description of the problem/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Environment details
- Performance impact (if applicable)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Design Inspiration

- [Shadcn](https://ui.shadcn.com/) - For the beautiful component design system
- [Taxonomy](https://tx.shadcn.com/) - For layout and structure inspiration

### Performance & Optimization

- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - Bundle optimization tools
- [Web Vitals](https://web.dev/vitals/) - Performance metrics guidance
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) - Error handling patterns

### Community

- [Velite.js](https://velite.js.org/) - Excellent content management solution
- [Next.js](https://nextjs.org/) - The React framework that powers this blog
- [Vercel](https://vercel.com/) - For seamless deployment and hosting

### Special Thanks

- [Jolly Coding](https://www.youtube.com/@JollyCoding) - For the initial tutorial foundation
- All contributors who have helped improve this project's performance and quality

---

## 🔗 Links

- **Live Demo**: [blog.liuyuelin.dev](https://blog.liuyuelin.dev/)
- **Author Portfolio**: [liuyuelin.dev](https://liuyuelin.dev/)
- **Author GitHub**: [@liuyuelintop](https://github.com/liuyuelintop)
- **Author LinkedIn**: [liuyuelintop](https://www.linkedin.com/in/liuyuelintop/)

---

<div align="center">

**Built with ❤️ and optimized for performance by [Yuelin Liu](https://liuyuelin.dev)**

If this project helped you, please consider giving it a ⭐️!

</div>
