"use client";

import { useMemo } from "react";
import { Post } from "#site/content";
import { getAllTags, sortPostsByDate } from "@/lib/utils";

export interface BlogStats {
  totalPosts: number;
  totalTags: number;
  writingYears: number;
  mostUsedTech: string[];
  firstPostDate?: string;
  latestPostDate?: string;
  tagsWithCounts: Record<string, number>;
}

/**
 * React hook version of getBlogStats with memoization for client components.
 * Use this in client components that re-render frequently.
 * For server components, use getBlogStats from @/lib/utils instead.
 */
export function useBlogStats(posts: Array<Post>): BlogStats {
  return useMemo(() => {
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
    
    // Get most used technologies from tags with better filtering and sorting
    const techTags = uniqueTags
      .filter(tag => {
        const techKeywords = [
          'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
          'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'GraphQL',
          'Vue', 'Angular', 'Svelte', 'Tailwind', 'CSS', 'HTML',
          'Git', 'API', 'Database', 'Frontend', 'Backend', 'Full Stack'
        ];
        return techKeywords.some(keyword => 
          tag.toLowerCase().includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(tag.toLowerCase())
        );
      })
      .sort((a, b) => tags[b] - tags[a]); // Sort by usage count
    
    return {
      totalPosts: publishedPosts.length,
      totalTags: uniqueTags.length,
      writingYears,
      mostUsedTech: techTags.slice(0, 6), // Top 6 most used tech tags
      firstPostDate: firstPost?.date,
      latestPostDate: latestPost?.date,
      tagsWithCounts: tags
    };
  }, [posts]);
}