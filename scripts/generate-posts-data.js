#!/usr/bin/env node

/**
 * Generate a TypeScript file with posts data for Vercel deployment
 * This ensures the data is bundled with the serverless function
 */

const fs = require('fs');
const path = require('path');

const postsJsonPath = path.join(process.cwd(), '.velite', 'posts.json');
const outputPath = path.join(process.cwd(), 'app', 'api', 'v1', '_posts-data.ts');

if (!fs.existsSync(postsJsonPath)) {
  console.error('posts.json not found at:', postsJsonPath);
  process.exit(1);
}

const posts = JSON.parse(fs.readFileSync(postsJsonPath, 'utf-8'));

const tsContent = `// Auto-generated file - do not edit manually
// Generated at: ${new Date().toISOString()}
// Posts count: ${posts.length}

export const postsData = ${JSON.stringify(posts, null, 2)} as const;
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`Generated posts data with ${posts.length} posts at:`, outputPath);