## NextJS 14, Tailwind, Shadcn UI, MDX and Velite Blog Templat

In this repo is a simple implementation of a markdown static blog, a demo can be seen [here](#), Features include:

- MDX Components
- Shadcn UI
- Pagination
- Dynamic Open Graph Image
- Syntax Highlighting in code block

### Learning Points

Hopefully, from this project and the video, you can learn:

- NextJS 14 basics (layouts, app router etc)
- NextJS SEO
- NextJS Dynamic Graph Images
- [Velite](https://velite.js.org/) Setup and usage
- [Shadcn/ui](https://ui.shadcn.com/) setup and usage
- Custom components in MDX
- Tailwind styling

## Credits

### Youtube

You can follow along with [Jolly Coding ](https://www.youtube.com/@JollyCoding)as we build this on YouTube.
[![YouTube video](https://img.youtube.com/vi/tSI98g3PDyE/0.jpg)](<[https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE](https://youtu.be/tSI98g3PDyE)>)

### Design

Much of the design of this project is taken from shadcn in his projects, such as [shadcn/ui](https://ui.shadcn.com/) and [Taxonomy](https://tx.shadcn.com/)

---

# Getting Started

## 1. Installing shadcn/ui

### `npx shadcn-ui@latest init`

```bash
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Would you like to use CSS variables for colors? … no / yes
```

```typescript
// app/layout.tsx
import { cn } from "@/lib/utils";
<body
  className={cn(
    "min-h-screen bg-background font-sans antialiased",
    inter.variable
  )}
>
  {children}
</body>;
```

```typescript
// tailwind.config.ts
import { fontFamily } from "tailwindcss/defaultTheme";
...
extend: {
	fontFamily: {
        	sans: ["var(--font-sans)", ...fontFamily.sans],
      	},
...
```

### `npx shadcn-ui@latest add button`

## 2. Install and Config Velite

### `npm install velite -D`

```typescript
// vilite.config.ts
import { defineConfig, defineCollection, s } from "velite";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
```

---

```javascript
// next.config.mjs
import { build } from "velite";

/** @type {import('next').NextConfig} */
export default {
  // othor next config here...
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}
```

## 4. Moblie Menu

`npx shadcn-ui@latest add sheet`

## 5. Theme toggle

### `npm i next-themes`

### `npx shadcn-ui@latest add dropdown-menu`

## 6. Setup Blog Page

## 7. Setup Post Page (Difficult)

### `npm install -D @tailwindcss/typography`

```typescript
// tailwind.config.ts
 plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],

```

## 8. Custom Components in MDX

```typescript
//mdx-components.tsx
const components = {
  Image,
  Callout,
};
```

## 9. Code block styling & mdx plugins

### `npm i rehype-autolink-headings rehype-pretty-code rehype-slug`

```typescript
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
...
mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
```

## 10. Pagination

### `npx shadcn-ui@latest add pagination`

## 11. Home Page Changes

## 12. About page & FIx z-index header

### `npx shadcn-ui@latest add avatar`

## 13. Dynamic graph page

[customize your own og playgroud](https://og-playground.vercel.app/)

## 14. SEO and Favicon

## 15. Site Footer

## 16. Setup Tags

`npm install github-slugger`

`npx shadcn-ui@latest add badge`

`npx shadcn-ui@latest add card`

## 17. Add tags to post items
