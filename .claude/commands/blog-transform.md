# Transform Draft Blog Posts to MDX

Transform draft markdown files ($ARGUMENTS) into production-ready MDX blog posts following the project's content standards.

## Systematic Workflow

You must follow this exact process to ensure consistency and quality:

### 1. Initial Setup and Validation
- Use TodoWrite tool to track progress through all steps
- Read all specified draft files: $ARGUMENTS
- Validate that files exist and contain markdown content
- Scan content/blog/ directory to understand existing posts

### 2. Content Analysis Phase
For each draft file:
- **Analyze content depth**: Identify main programming concepts (>50% content)
- **Extract key themes**: What will readers learn? What problems are solved?
- **Identify code examples**: Note programming languages and frameworks used
- **Assess audience level**: Beginner, intermediate, or advanced
- **Find learning outcomes**: What specific skills/knowledge will readers gain

### 3. Title and Description Generation
- **Title**: Create compelling, SEO-friendly title (max 99 characters)
  - Format: "Topic: Specific Problem - Key Insight/Benefit"
  - Examples: "LeetCode 203: Remove Linked List Elements - Mastering the Dummy Head Pattern"
- **Description**: Write concise description (max 999 characters)
  - Focus on value proposition and what readers will learn
  - Include key concepts and outcomes

### 4. Intelligent Tag Selection
**CRITICAL**: Follow exact tagging rules from lib/content/standards.md
- Read /lib/content/tags.json for allowed tags
- Maximum 4 tags per post
- Priority order: Language → Primary Concept → Secondary Concept/Tool → Industry Context
- **Step-by-step selection**:
  1. Primary language (if >50% language-specific content)
  2. Main concept (required - core learning topic)
  3. Secondary concept OR primary tool (if >20% of content)
  4. Industry context (purpose/audience)

### 5. Cross-Reference Analysis
- Search existing blog posts for related content
- Identify opportunities for cross-linking
- Add appropriate internal links using format: [Link Text](/blog/post-slug)
- Ensure bidirectional linking when appropriate

### 6. Content Polish and Structure
- **Grammar and clarity**: Improve readability while preserving author's voice
- **Code formatting**: Ensure proper syntax highlighting with language tags
- **Section headers**: Use clear, hierarchical structure (##, ###)
- **Flow improvement**: Add transitions between sections
- **Technical accuracy**: Verify code examples and explanations

### 7. MDX File Creation
Create new MDX files with this exact frontmatter structure:
```yaml
---
title: "Generated Title"
description: "Generated description"
date: YYYY-MM-DDTHH:mm:ss.sssZ (use current date)
tags:
  - Tag1
  - Tag2
  - Tag3
  - Tag4
published: true
---
```

### 8. File Naming and Placement
- **Naming convention**: kebab-case from title (e.g., "remove-linked-list-elements")
- **Location**: content/blog/[generated-name].mdx
- **Validation**: Ensure no duplicate filenames exist

### 9. Cleanup and Validation
- Remove original draft files after successful transformation
- Run final validation against lib/content/validation-rules.json
- Verify all cross-references work
- Check that all tags exist in allowed tags list

### 10. Completion Report
Provide summary of:
- Files processed and their new names
- Tags selected for each post and reasoning
- Cross-references added
- Any issues encountered or manual review needed

## Quality Assurance Checklist

Before completing, verify:
- [ ] All frontmatter fields are present and correctly formatted
- [ ] Tags follow the 4-tag maximum and priority order
- [ ] All selected tags exist in lib/content/tags.json
- [ ] Content represents >20% for each selected tag
- [ ] File names use kebab-case and are unique
- [ ] Cross-references use correct internal link format
- [ ] Code blocks have proper language tags
- [ ] No spelling errors (fix "dummyhead" → "dummy head" in text)
- [ ] Original draft files are cleaned up

## Error Handling

If you encounter issues:
- **Missing tags**: Select closest available tags and explain reasoning
- **Content too short**: Flag for manual review
- **Unclear topics**: Ask for clarification before proceeding
- **Naming conflicts**: Append numeric suffix or suggest alternative

Remember: Maintain the author's voice while ensuring professional quality and consistency with project standards.