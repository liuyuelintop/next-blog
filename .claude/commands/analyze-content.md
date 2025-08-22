# Analyze Blog Content

Perform deep content analysis on draft markdown files ($ARGUMENTS) to extract key themes, concepts, and metadata for blog transformation.

## Analysis Process

### 1. Content Structure Analysis
For each file specified in $ARGUMENTS:

**Read and Parse**:
- Load the markdown content
- Identify main sections and subsections
- Count total word count and content depth
- Extract any existing code blocks and their languages

### 2. Topic and Theme Extraction

**Programming Language Detection**:
- Scan for code blocks and their language tags
- Analyze text for language-specific terminology
- Calculate percentage of language-specific content
- Determine if >50% is language-focused (required for language tag)

**Core Concept Identification**:
- Identify main technical concepts being explained
- Find problem-solving approaches or methodologies
- Extract learning outcomes and key takeaways
- Determine primary and secondary concepts

**Framework and Tool Detection**:
- Scan for mentions of frameworks (React, Next.js, etc.)
- Identify development tools and platforms
- Assess significance of each tool/framework to content (>20% threshold)

### 3. Audience and Context Analysis

**Skill Level Assessment**:
- Beginner: Basic concepts, step-by-step explanations
- Intermediate: Assumes some knowledge, focuses on specific problems
- Advanced: Complex concepts, optimization, architectural decisions

**Purpose Classification**:
- Tutorial: Step-by-step guide
- Best Practices: Recommendations and standards
- Interview: Problem-solving for technical interviews
- Explanation: Deep-dive into concepts or mechanisms

### 4. Content Quality Metrics

**Technical Depth**:
- Rate depth of technical explanation (1-5 scale)
- Identify any gaps in explanation
- Note areas that need clarification or expansion

**Code Quality**:
- Check for proper code formatting and syntax
- Verify code examples are complete and functional
- Identify missing language tags or formatting issues

### 5. SEO and Discoverability Analysis

**Keyword Extraction**:
- Identify primary keywords and phrases
- Find technical terms that readers might search for
- Extract problem statements or common questions being addressed

**Title Suggestions**:
- Generate 3-5 potential titles based on content analysis
- Format: "Platform/Problem: Specific Topic - Key Benefit"
- Ensure titles are under 99 characters

### 6. Cross-Reference Opportunities

**Related Content Detection**:
- Scan existing blog posts for related topics
- Identify potential internal linking opportunities
- Find complementary concepts that could be cross-referenced

## Output Format

Provide detailed analysis in this structure:

```markdown
## Content Analysis Report

### File: [filename]

**Content Overview**:
- Word count: [X words]
- Primary language: [detected language or "None"]
- Language-specific content: [X%]
- Skill level: [Beginner/Intermediate/Advanced]
- Purpose: [Tutorial/Best Practices/Interview/Explanation]

**Technical Concepts Identified**:
- Primary concept: [main topic - required for tagging]
- Secondary concepts: [supporting topics]
- Frameworks/Tools: [with significance percentage]
- Problem being solved: [specific problem statement]

**Suggested Tags** (following priority order):
1. Language: [if >50% content] or [None]
2. Primary Concept: [from concepts category]
3. Secondary/Tool: [from concepts/frameworks/tools]
4. Industry Context: [from industry category]

**Title Suggestions**:
1. [Title option 1]
2. [Title option 2]
3. [Title option 3]

**Description Suggestions**:
- [Concise description focusing on value proposition]

**Cross-Reference Opportunities**:
- [List of existing blog posts that could be linked]

**Content Quality Notes**:
- [Any issues, gaps, or improvement suggestions]
```

## Analysis Guidelines

**Content Percentage Calculation**:
- Language-specific: Count code blocks, syntax discussions, language features
- Concept coverage: Measure depth of explanation for each identified concept
- Framework usage: Assess how central the framework is to the content

**Tag Validation**:
- Cross-check all suggested tags against lib/content/tags.json
- Ensure suggested tags represent >20% of content
- Follow maximum limits per category

**Quality Assessment**:
- Flag any content that seems too brief for a full blog post
- Identify technical inaccuracies or unclear explanations
- Note missing context or assumptions that might confuse readers

This analysis will inform the blog transformation process and ensure appropriate tag selection and content structuring.