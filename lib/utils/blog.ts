import { Post } from "#site/content";
import { slug } from "github-slugger";

export function sortPostsByDate(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) { return -1; }
    if (a.date < b.date) { return 1; }
    return 0;
  });
}

export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });

  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) { return false; }
    const slugifiedTags = post.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}

/**
 * Calculate blog statistics for server components.
 * For client components that re-render frequently, use useBlogStats hook instead.
 */
export function getBlogStats(posts: Array<Post>) {
  const publishedPosts = posts.filter((post) => post.published);
  const tags = getAllTags(publishedPosts);
  const uniqueTags = Object.keys(tags);
  
  // Calculate writing duration based on first and latest post
  const sortedPosts = sortPostsByDate(publishedPosts);
  const firstPost = sortedPosts[sortedPosts.length - 1];
  const latestPost = sortedPosts[0];
  
  const firstYear = firstPost ? new Date(firstPost.date).getFullYear() : new Date().getFullYear();
  const currentYear = new Date().getFullYear();
  const writingYears = Math.max(1, currentYear - firstYear + 1);
  
  // Get most used technologies from tags
  const techTags = uniqueTags.filter(tag => 
    ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'AWS', 'Docker'].includes(tag)
  );
  
  return {
    totalPosts: publishedPosts.length,
    totalTags: uniqueTags.length,
    writingYears,
    mostUsedTech: techTags.slice(0, 6), // Top 6 most used tech tags
    firstPostDate: firstPost?.date,
    latestPostDate: latestPost?.date,
    tagsWithCounts: tags
  };
}