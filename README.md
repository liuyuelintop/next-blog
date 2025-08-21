# YuelinBlog - Modern Developer Blog Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Velite](https://img.shields.io/badge/Velite-MDX-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, fast, and feature-rich blog platform built with Next.js 14+, TypeScript, and MDX**

[🚀 **Live Demo**](https://blog.liuyuelin.dev/) • [📚 **Documentation**](#documentation) • [🎯 **Features**](#features) • [🛠️ **Quick Start**](#quick-start)

</div>

---

## ✨ Features

### 🔍 **Advanced Search**

- **Real-time fuzzy search** across all content with Fuse.js
- **Keyboard shortcuts** (⌘K / Ctrl+K) for quick access
- **Smart suggestions** with highlighted matches
- **Mobile-optimized** search experience

### 📝 **Content Management**

- **MDX support** with custom components
- **Syntax highlighting** with multiple themes
- **Auto-generated** table of contents
- **Tag-based** content organization (29 curated categories)
- **Dynamic Open Graph** images

### 🎨 **Modern Design**

- **Responsive design** with mobile-first approach
- **Dark/Light theme** toggle with system preference detection
- **Shadcn/ui components** for consistent design system
- **Tailwind CSS** for rapid styling
- **Professional typography** with @tailwindcss/typography

### ⚡ **Performance**

- **Static site generation** for lightning-fast loading
- **Image optimization** with Next.js Image component
- **SEO optimized** with proper meta tags and structured data
- **Lighthouse score**: 95+ performance rating

### 🛠️ **Developer Experience**

- **TypeScript** for type safety
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

### Tech Stack

| Technology       | Purpose                               | Version    |
| ---------------- | ------------------------------------- | ---------- |
| **Next.js**      | React framework with App Router       | 15.5+      |
| **TypeScript**   | Type safety and developer experience  | 5.0+       |
| **Velite**       | Content management and MDX processing | 0.1.0-rc.3 |
| **Tailwind CSS** | Utility-first CSS framework           | 3.4+       |
| **Shadcn/ui**    | React component library               | Latest     |
| **Fuse.js**      | Fuzzy search functionality            | 7.1+       |

### Project Structure

```
├── app/                 # Next.js App Router pages
│   ├── blog/           # Blog post pages
│   ├── tags/           # Tag-based filtering
│   └── search/         # Search functionality
├── components/         # Reusable React components
├── content/           # MDX blog posts
│   └── blog/          # Individual post files
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── styles/            # CSS and styling
└── public/            # Static assets
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

#### Content Schema

Blog posts use the following frontmatter:

```yaml
---
title: string (max 99 chars)
description: string (max 999 chars, optional)
date: ISO date string
tags: array of strings (optional)
published: boolean (default: true)
---
```

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

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/liuyuelintop/next-blog/issues) with:

- Clear description of the problem/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Environment details

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Design Inspiration

- [Shadcn](https://ui.shadcn.com/) - For the beautiful component design system
- [Taxonomy](https://tx.shadcn.com/) - For layout and structure inspiration

### Community

- [Velite.js](https://velite.js.org/) - Excellent content management solution
- [Next.js](https://nextjs.org/) - The React framework that powers this blog
- [Vercel](https://vercel.com/) - For seamless deployment and hosting

### Special Thanks

- [Jolly Coding](https://www.youtube.com/@JollyCoding) - For the initial tutorial foundation
- All contributors who have helped improve this project

---

## 🔗 Links

- **Live Demo**: [blog.liuyuelin.dev](https://blog.liuyuelin.dev/)
- **Author Portfolio**: [liuyuelin.dev](https://liuyuelin.dev/)
- **Author GitHub**: [@liuyuelintop](https://github.com/liuyuelintop)
- **Author LinkedIn**: [liuyuelintop](https://www.linkedin.com/in/liuyuelintop/)

---

<div align="center">

**Built with ❤️ by [Yuelin Liu](https://liuyuelin.dev)**

If this project helped you, please consider giving it a ⭐️!

</div>
