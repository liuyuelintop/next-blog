"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { SearchResult } from "@/hooks/use-search";
import { cn, formatDate } from "@/lib/utils";

interface VirtualizedSearchResultsProps {
  results: SearchResult[];
  selectedIndex: number;
  onResultClick: (_slug: string) => void;
}

interface VirtualItem {
  index: number;
  height: number;
  offsetTop: number;
}

const ITEM_HEIGHT = 120; // Fixed height for each search result item
const VISIBLE_ITEMS = 6; // Number of items visible at once
const CONTAINER_HEIGHT = VISIBLE_ITEMS * ITEM_HEIGHT;

export function VirtualizedSearchResults({
  results,
  selectedIndex,
  onResultClick,
}: VirtualizedSearchResultsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / ITEM_HEIGHT);
    const end = Math.min(
      start + VISIBLE_ITEMS + 1, // +1 for buffer
      results.length
    );
    return { start, end };
  }, [scrollTop, results.length]);

  // Calculate virtual items
  const virtualItems = useMemo(() => {
    const items: VirtualItem[] = [];
    for (let i = visibleRange.start; i < visibleRange.end; i++) {
      items.push({
        index: i,
        height: ITEM_HEIGHT,
        offsetTop: i * ITEM_HEIGHT,
      });
    }
    return items;
  }, [visibleRange]);

  const totalHeight = results.length * ITEM_HEIGHT;

  // Handle scroll events
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Auto-scroll to selected item
  useEffect(() => {
    if (selectedIndex >= 0 && scrollRef.current) {
      const selectedTop = selectedIndex * ITEM_HEIGHT;
      const containerTop = scrollTop;
      const containerBottom = scrollTop + CONTAINER_HEIGHT;

      if (selectedTop < containerTop) {
        scrollRef.current.scrollTop = selectedTop;
      } else if (selectedTop + ITEM_HEIGHT > containerBottom) {
        scrollRef.current.scrollTop = selectedTop - CONTAINER_HEIGHT + ITEM_HEIGHT;
      }
    }
  }, [selectedIndex, scrollTop]);

  // Render individual search result
  const renderResult = (result: SearchResult, index: number, offsetTop: number) => {
    const isSelected = index === selectedIndex;
    const post = result.item;

    return (
      <div
        key={`${post.slug}-${index}`}
        className={cn(
          "absolute left-0 right-0 px-4 py-3 border-b border-border/50 cursor-pointer transition-colors",
          "hover:bg-accent/50 focus:bg-accent/50",
          isSelected && "bg-accent"
        )}
        style={{
          top: offsetTop,
          height: ITEM_HEIGHT,
        }}
        onClick={() => onResultClick(post.slugAsParams)}
        role="option"
        aria-selected={isSelected}
        tabIndex={-1}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <h3 className="text-sm font-medium line-clamp-1 mb-1">
              {post.title}
            </h3>
            {post.description && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {post.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <time dateTime={post.date} className="flex items-center gap-1">
              📅 {formatDate(post.date)}
            </time>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-xs opacity-60">#</span>
                <span className="line-clamp-1">
                  {post.tags.slice(0, 2).join(", ")}
                  {post.tags.length > 2 && " +"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div
      ref={scrollRef}
      className="relative overflow-auto"
      style={{ height: Math.min(CONTAINER_HEIGHT, totalHeight) }}
      onScroll={handleScroll}
      role="listbox"
      aria-label={`${results.length} search results`}
    >
      {/* Virtual container with full height */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {/* Render only visible items */}
        {virtualItems.map((virtualItem) =>
          renderResult(
            results[virtualItem.index],
            virtualItem.index,
            virtualItem.offsetTop
          )
        )}
      </div>
      
      {/* Results count indicator */}
      {results.length > VISIBLE_ITEMS && (
        <div className="sticky bottom-0 bg-popover/80 backdrop-blur-sm border-t border-border/50 px-3 py-1 text-xs text-muted-foreground text-center">
          Showing {Math.min(VISIBLE_ITEMS, results.length)} of {results.length} results
        </div>
      )}
    </div>
  );
}