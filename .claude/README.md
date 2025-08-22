# Claude Code Blog Transformation Commands

This directory contains custom Claude Code commands to automate the blog transformation process from draft markdown files to production-ready MDX posts.

## Available Commands

### `/project:blog-transform [files...]`
**Main transformation command** - Converts draft markdown files to MDX blog posts following project standards.

**Usage:**
```bash
/project:blog-transform blog1.md blog2.md
/project:blog-transform *.md
```

**What it does:**
- Analyzes content and extracts themes
- Generates SEO-friendly titles and descriptions  
- Selects appropriate tags following content standards
- Creates cross-references to related posts
- Transforms to MDX with proper frontmatter
- Moves files to content/blog/ with kebab-case naming
- Cleans up original draft files
- Provides completion report

### `/project:analyze-content [files...]`
**Content analysis command** - Deep analysis of draft content for planning purposes.

**Usage:**
```bash
/project:analyze-content draft-file.md
```

**What it does:**
- Extracts programming languages and frameworks
- Identifies main concepts and learning outcomes
- Assesses content depth and audience level
- Suggests titles and descriptions
- Provides tag recommendations with reasoning
- Identifies cross-reference opportunities

### `/project:generate-tags [files...]`
**Tag generation command** - Focused tag selection following validation rules.

**Usage:**
```bash
/project:generate-tags blog-draft.md
```

**What it does:**
- Applies systematic tag selection process
- Validates against content standards and rules
- Ensures tags represent >20% of content
- Follows priority order: Language → Concept → Tool → Context
- Maximum 4 tags per post
- Provides detailed reasoning for each tag

### `/project:link-posts [files...]`
**Cross-reference command** - Identifies and creates internal links between related posts.

**Usage:**
```bash
/project:link-posts new-post.md
```

**What it does:**
- Scans existing blog posts for related content
- Identifies natural linking opportunities
- Suggests bidirectional link placements
- Provides specific link integration examples
- Categorizes relationships by strength and relevance

## Command Integration

**Standalone Usage:**
Each command can be used independently for specific tasks like content analysis or tag generation.

**Integrated Workflow:**
The main `blog-transform` command uses all other commands internally for a complete transformation process.

## Content Standards Integration

All commands automatically reference and enforce:
- `/lib/content/tags.json` - Allowed tag list
- `/lib/content/validation-rules.json` - Tag selection rules
- `/lib/content/standards.md` - Complete content guidelines

## File Requirements

**Input:** Markdown files (`.md`) containing draft blog content
**Output:** MDX files (`.mdx`) in `content/blog/` directory with:
- Proper YAML frontmatter
- SEO-optimized titles and descriptions
- Validated tag selection
- Cross-references to related content
- Professional content polish

## Quality Assurance

Commands include built-in validation:
- ✅ Frontmatter completeness
- ✅ Tag validation against allowed list
- ✅ Content standards compliance
- ✅ Link verification
- ✅ File naming conventions
- ✅ Duplicate detection

## Example Workflow

1. **Create draft markdown files** in project root (e.g., `blog1.md`, `blog2.md`)
2. **Run transformation**: `/project:blog-transform blog1.md blog2.md`
3. **Review results** in `content/blog/` directory
4. **Verify** links and tags are appropriate
5. **Original files** are automatically cleaned up

## Tips for Best Results

- **Clear content structure**: Use proper markdown headings and sections
- **Include code examples**: Helps with language and framework detection
- **Focus on specific topics**: Makes tag selection more accurate
- **Explain concepts thoroughly**: Improves cross-reference detection
- **Use descriptive language**: Helps generate better titles and descriptions

## Troubleshooting

**If tags seem incorrect:**
- Use `/project:analyze-content` first to understand detected themes
- Run `/project:generate-tags` to see detailed tag reasoning
- Manually review content depth for each concept

**If cross-references are missing:**
- Use `/project:link-posts` to see relationship analysis
- Check that related posts exist in content/blog/
- Verify content covers related topics substantially (>20%)

**If transformation fails:**
- Check that draft files exist and contain valid markdown
- Ensure no duplicate filenames in content/blog/
- Verify content meets minimum quality standards

These commands streamline the blog creation process while maintaining high quality and consistency standards.