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
