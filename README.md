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
