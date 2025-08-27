"use client";

import { Tag } from "../tag";

interface TagListProps {
  tags: string[];
  maxTags?: number;
  showCount?: boolean;
  className?: string;
  currentTag?: string;
  tagCounts?: Record<string, number>;
}

export function TagList({ 
  tags, 
  maxTags = 4, 
  showCount = true,
  className,
  currentTag,
  tagCounts
}: TagListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  const displayTags = tags.slice(0, maxTags);
  const remainingCount = tags.length - maxTags;

  return (
    <div className={`flex gap-2 flex-wrap ${className || ""}`}>
      {displayTags.map((tag) => (
        <Tag 
          key={tag} 
          tag={tag} 
          current={currentTag === tag}
          count={tagCounts?.[tag]}
        />
      ))}
      
      {showCount && remainingCount > 0 && (
        <span className="text-sm text-muted-foreground px-2 py-1 bg-muted/50 rounded-md">
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}

export function TagGrid({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <div className={`grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ${className || ""}`}>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}