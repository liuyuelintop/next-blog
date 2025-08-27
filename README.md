# YuelinBlog - Modern Developer Blog Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Velite](https://img.shields.io/badge/Velite-MDX-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-Optimized-brightgreen?style=for-the-badge)

**A modern, fast, and feature-rich blog platform built with Next.js 14+, TypeScript, and MDX**

[🚀 **Live Demo**](https://blog.liuyuelin.dev/) • [📚 **Documentation**](#documentation) • [🎯 **Features**](#features) • [🛠️ **Quick Start**](#quick-start) • [⚡ **Performance**](#performance-optimization)

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

### ⚡ **Performance Optimization**

- **Bundle analysis** with Next.js Bundle Analyzer (102kB baseline)
- **Image optimization** with WebP/AVIF format support and responsive sizing
- **Error boundaries** for graceful component failure recovery
- **TypeScript strict mode** for enhanced type safety
- **ESLint strict rules** for code quality enforcement
- **30-day image caching** for optimal performance
- **Static site generation** for lightning-fast loading

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
- **Bundle analysis tools** with `npm run analyze` command
- **Performance monitoring** setup for optimization tracking
- **ESLint & Prettier** for code quality
- **Git hooks** for automated checks
- **Hot reload** in development
- **One-click deployment** to Vercel

---

## ⚡ Performance Optimization

This blog platform implements a **comprehensive 3-phase optimization strategy**:

### Phase 1: Foundation ✅ **COMPLETED**

- **Bundle Analysis**: Established 102kB baseline with monitoring tools
- **TypeScript Strict Mode**: Enhanced type safety with additional compiler checks
- **Image Optimization**: WebP/AVIF support with responsive sizing and 30-day caching
- **Error Boundaries**: Graceful failure handling for critical components
- **Code Quality**: Zero ESLint warnings with strict rules implementation

**Results**: Improved error resilience, better type safety, and optimization infrastructure in place.

### Phase 2: Architecture 🔄 **PLANNED**

- Search performance optimization with caching and virtualization
- Component consolidation and refactoring for better maintainability
- SEO structured data implementation
- Accessibility improvements and ARIA compliance

**Target**: 20-30% performance improvement with enhanced maintainability.

### Phase 3: Advanced 📋 **PLANNED**

- Performance monitoring integration with Web Vitals tracking
- Advanced caching strategies and CDN optimization
- Security headers implementation
- Comprehensive component testing infrastructure

**Target**: Production-ready optimization with monitoring and testing.

### Performance Commands

```bash
# Analyze bundle size and composition
npm run analyze

# Build with optimization
npm run build

# Run linting with strict rules
npm run lint
```

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

### 3. Performance Analysis

```bash
# Analyze your bundle
npm run analyze

# Check code quality
npm run lint

# Build for production
npm run build
```

### 4. Create Your First Post

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

### 5. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/liuyuelintop/next-blog)

---

## 📖 Documentation

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

```
├── app/                 # Next.js App Router pages
│   ├── blog/           # Blog post pages
│   ├── tags/           # Enhanced tag-based filtering with categories
│   ├── about/          # Dynamic about page with auto-updating metrics
│   └── search/         # Search functionality with error boundaries
├── components/         # Reusable React components
│   ├── error-boundary.tsx      # General error boundary
│   └── search-error-boundary.tsx # Search-specific error boundary
├── content/           # MDX blog posts
│   └── blog/          # Individual post files
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and dynamic content processing
│   └── content/       # Content standards and tag validation system
├── styles/            # CSS and styling
└── public/            # Static assets
```

### Performance Monitoring

#### Bundle Analysis

Monitor your bundle size with:

```bash
npm run analyze
```

This generates reports in `.next/analyze/`:
- `client.html` - Client-side bundle analysis
- `nodejs.html` - Server-side bundle analysis
- `edge.html` - Edge runtime analysis

#### Key Performance Metrics

- **Bundle Size**: 102kB First Load JS (baseline)
- **Image Optimization**: WebP/AVIF with responsive sizing
- **Error Recovery**: Comprehensive error boundary coverage
- **Type Safety**: 100% TypeScript strict mode compliance
- **Code Quality**: Zero ESLint warnings/errors

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

### Error Handling

#### Error Boundaries

The platform includes comprehensive error boundaries:

- **General Error Boundary**: Catches component errors with fallback UI
- **Search Error Boundary**: Isolated error handling for search functionality
- **Layout Error Boundaries**: Protects critical navigation components

#### Error Recovery

All error boundaries provide "Try again" functionality for user-initiated recovery.

### Customization

#### Adding Custom Components

Create components in `components/` and register them in `mdx-components.tsx`:

```typescript
const components = {
  CustomComponent,
  // Add your components here
};
```

#### Styling

- Global styles: `app/globals.css`
- Component styles: Use Tailwind classes
- Custom MDX styles: `styles/mdx.css`

#### Search Configuration

Modify search behavior in `hooks/use-search.ts`:

```typescript
const fuse = new Fuse(posts, {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.3 },
    // Customize search fields and weights
  ],
  threshold: 0.4, // Adjust search sensitivity
});
```

---

## 🆕 Recent Updates

### Performance Optimization Phase 1 ✅
- **Bundle analysis infrastructure** with webpack analyzer integration
- **TypeScript strict mode** with comprehensive type checking enabled
- **Image optimization system** with WebP/AVIF formats and responsive sizing
- **Error boundary architecture** for graceful failure recovery
- **Code quality enhancements** with zero ESLint warnings/errors

### Enhanced Tags System
- **Categorized display** with color-coded sections (Languages, Frameworks, Tools, Concepts, Industry)
- **Improved navigation** with tags links in main and mobile menus
- **"View all topics" link** from blog sidebar for better discoverability

### Dynamic About Page
- **Auto-updating metrics** based on actual blog data (post count, tag count, writing years)
- **Dynamic skill showcase** that includes technologies actually used in blog posts
- **Real-time achievement tracking** with `getBlogStats()` utility function

### UI/UX Improvements
- **Fixed sidebar overlapping** - resolved z-index conflicts between Popular Topics and Blog Stats
- **Better scroll behavior** with unified sticky positioning for sidebar elements
- **Enhanced error resilience** with comprehensive error boundary coverage

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
