# Content Standards & Tagging Guidelines

This document establishes consistent tagging and content standards for discoverability, SEO optimization, and maintainable organization.

## Quick Reference

- **Maximum:** 4 tags per post
- **Source:** Use only tags from `/lib/content/tags.json`
- **Priority:** Language → Primary Concept → Secondary Concept/Tool → Industry Context
- **Validation:** Follow rules in `/lib/content/validation-rules.json`

## Tag Selection Process

### Step-by-Step Decision Matrix

1. **Primary Language** (if post is language-specific)
   - Use if >50% of content is language-specific
   - Choose: `JavaScript`, `TypeScript`, or skip

2. **Main Concept** (required)
   - The core topic readers will learn
   - Examples: `Data Structures`, `Algorithms`, `Performance`, `API`

3. **Secondary Concept OR Primary Tool**
   - Supporting topic or main tool used
   - Examples: `React`, `AWS`, `Testing`, `State Management`

4. **Industry Context** (optional)
   - Purpose or target audience
   - Examples: `Interview`, `Best Practices`, `Tutorial`

## Examples

### ✅ Good Tagging

```yaml
# Algorithm implementation guide
title: "JavaScript LinkedList Implementation: Classes vs Factories"
tags: ["JavaScript", "Data Structures", "Algorithms", "Best Practices"]
```

**Why it works:**

- JavaScript (primary language - 60% of content)
- Data Structures (main concept)
- Algorithms (secondary concept - implementation patterns)
- Best Practices (context - guidance on approach selection)

```yaml
# Framework tutorial
title: "Building Real-time Chat with React WebSockets"
tags: ["JavaScript", "React", "API", "Tutorial"]
```

**Why it works:**

- JavaScript (primary language)
- React (primary framework)
- API (main concept - WebSocket implementation)
- Tutorial (context - step-by-step guide)

### ❌ Avoid These Mistakes

```yaml
# TOO MANY TAGS
tags: ["JavaScript", "React", "Hooks", "useState", "Performance", "Best Practices"]

# BETTER
tags: ["JavaScript", "React", "Performance", "Best Practices"]
```

```yaml
# IRRELEVANT TAGS  
title: "Advanced CSS Grid Layouts"
tags: ["CSS", "HTML", "Grid", "Layout"]  # HTML is just setup

# BETTER
tags: ["CSS", "UI/UX", "Best Practices"]
```

## Tag Categories

Refer to `/lib/content/tags.json` for the complete authoritative list.

### Languages (max 1)

- `JavaScript`, `TypeScript`
- Use when post focuses on language-specific features

### Frameworks (max 1)

- `React`, `Next.js`, `Node.js`, `Express`, `MERN`
- Use when demonstrating framework-specific implementations

### Tools (max 1)

- `AWS`, `Docker`, `Git`, `VSCode`, `Stripe`, `Vercel`, `AI/ML`
- Use when post involves tool setup, configuration, or integration

### Concepts (max 2)

- `API`, `Testing`, `Performance`, `Security`, `Algorithms`, `Data Structures`
- `State Management`, `File Handling`, `Animation`, `Data Types`, `UI/UX`
- Core concepts readers should associate with the content

### Industry (max 1)

- `Interview`, `Tutorial`, `Best Practices`, `Career`, `Blogging`
- Context about content purpose or target audience

## Selection Guidelines

### ✅ Use Tags When

- Post dedicates significant content to topic (>20%)
- Readers would search for this tag to find your content
- Tag represents a key learning outcome
- Concept is central to understanding the post

### ❌ Don't Use Tags For

- Brief mentions or passing references
- Basic prerequisites (e.g., HTML for every web dev post)
- Overly specific subtopics without broader appeal
- Personal opinions without technical substance

## Naming Conventions

- **Languages:** PascalCase (`JavaScript`, `TypeScript`)
- **Frameworks:** Official branding (`React`, `Next.js`, `Node.js`)
- **Tools:** Official branding (`AWS`, `VSCode`, `AI/ML`)
- **Concepts:** Title Case (`Data Structures`, `State Management`)
- **Industry:** Title Case (`Best Practices`, `UI/UX`)

## Maintenance

### Adding New Tags

1. Propose new tag via issue or PR discussion
2. Verify concept isn't covered by existing tags
3. Add to `/lib/content/tags.json` in appropriate category
4. Follow established naming conventions
5. Update this document if new patterns emerge

### Validation

Before publishing, ensure:

- [ ] Maximum 4 tags used
- [ ] All tags exist in `/lib/content/tags.json`
- [ ] Tag names match exactly (case-sensitive)
- [ ] Primary concept represented
- [ ] No redundant or overlapping tags
- [ ] Each tag represents >20% of content

## Automation

This document is automatically referenced in new Claude Code sessions via `CLAUDE.md`. Contributors should follow these standards for consistent, discoverable content organization.

---

*For questions about tagging decisions, refer to existing posts with similar topics or create an issue for clarification.*
