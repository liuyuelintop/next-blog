# Generate Blog Post Tags

Intelligently generate appropriate tags for blog posts ($ARGUMENTS) following the project's tagging standards and validation rules.

## Tag Generation Process

### 1. Load Tagging Standards

**Read Required Files**:
- /lib/content/tags.json - Authoritative list of allowed tags
- /lib/content/validation-rules.json - Tag selection and validation rules
- /lib/content/standards.md - Complete tagging guidelines

### 2. Content Analysis for Tag Selection

For each file in $ARGUMENTS:

**Step 1: Primary Language Detection**
- Scan content for programming language usage
- Calculate percentage of language-specific content (code blocks, syntax, language features)
- **Rule**: Select language tag only if >50% of content is language-specific
- **Options**: "JavaScript", "TypeScript", or skip
- **Limit**: Maximum 1 language tag

**Step 2: Primary Concept Identification (Required)**
- Identify the main technical concept readers will learn
- **Available concepts**: API, Testing, Performance, Security, Algorithms, Data Structures, State Management, File Handling, Animation, Data Types, UI/UX
- **Rule**: Must represent the core learning outcome
- **Limit**: This is required - every post must have a primary concept

**Step 3: Secondary Concept or Primary Tool**
- Identify supporting concepts or main tools/frameworks
- **Frameworks**: React, Next.js, Node.js, Express, MERN (max 1)
- **Tools**: AWS, Docker, Git, VSCode, Stripe, Vercel, AI/ML (max 1)  
- **Concepts**: Additional concepts beyond primary (max 2 total concepts)
- **Rule**: Only include if represents >20% of content

**Step 4: Industry Context (Optional)**
- Determine purpose or target audience
- **Options**: Interview, Tutorial, Best Practices, Career, Blogging
- **Rule**: Include if provides important context about content purpose
- **Limit**: Maximum 1 industry tag

### 3. Tag Validation Process

**Content Representation Check**:
- Verify each selected tag represents >20% of post content
- Remove tags that are mentioned only briefly
- Ensure tags align with actual learning outcomes

**Rule Compliance Verification**:
- Maximum 4 tags total
- Follow priority order: Language → Primary Concept → Secondary/Tool → Industry Context
- Check against forbidden combinations (e.g., can't have both JavaScript and TypeScript)
- Verify all selected tags exist in allowed tags list

**Category Limit Validation**:
- Languages: max 1
- Frameworks: max 1  
- Tools: max 1
- Concepts: max 2
- Industry: max 1

### 4. Tag Selection Decision Tree

```
START
├─ Is >50% content language-specific?
│  ├─ YES: Add JavaScript OR TypeScript (not both)
│  └─ NO: Skip language tag
├─ What is the main concept? (REQUIRED)
│  └─ Select from: API, Testing, Performance, Security, Algorithms, 
│     Data Structures, State Management, File Handling, Animation, 
│     Data Types, UI/UX
├─ Is there significant framework/tool usage (>20%)?
│  ├─ Framework: React, Next.js, Node.js, Express, MERN
│  ├─ Tool: AWS, Docker, Git, VSCode, Stripe, Vercel, AI/ML
│  └─ Additional Concept: From concepts list
├─ What's the context/purpose?
│  └─ Interview, Tutorial, Best Practices, Career, Blogging
└─ VALIDATE: 4 tags max, rules compliance, category limits
```

### 5. Output Format

For each analyzed file, provide:

```markdown
## Tag Analysis: [filename]

**Content Summary**:
- Word count: [X]
- Primary topic: [main subject]
- Code/language focus: [X% JavaScript/TypeScript/None]

**Tag Selection Reasoning**:

1. **Language Tag**: [Selected tag or "None"]
   - Reason: [Content is X% language-specific / Not language-focused]

2. **Primary Concept**: [Required concept tag]
   - Reason: [Why this represents the main learning outcome]
   - Content coverage: [X% of post focuses on this concept]

3. **Secondary/Tool Tag**: [Selected tag or "None"]
   - Reason: [Framework/tool significance or supporting concept]
   - Content coverage: [X% of post]

4. **Industry Context**: [Selected tag or "None"]  
   - Reason: [Purpose/audience context]

**Final Tag Array**:
```yaml
tags:
  - Tag1
  - Tag2  
  - Tag3
  - Tag4
```

**Validation Status**: ✅ PASS / ❌ FAIL
- [Any validation issues or confirmations]
```

### 6. Quality Assurance

**Common Issues to Avoid**:
- Don't tag brief mentions (must be >20% content)
- Don't exceed category limits
- Don't use tags not in allowed list
- Don't forget the required primary concept
- Don't combine forbidden tag combinations

**Double-Check Questions**:
- Would readers searching for each tag find value in this post?
- Does each tag represent a key learning outcome?
- Are we following the priority order correctly?
- Have we validated against all rules and limits?

This systematic approach ensures consistent, valuable tagging that improves content discoverability while following project standards.