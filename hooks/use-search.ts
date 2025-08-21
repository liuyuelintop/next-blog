"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse, { FuseResult } from "fuse.js";
import { posts } from "#site/content";

export interface SearchResult {
  item: typeof posts[0];
  matches?: FuseResult<typeof posts[0]>["matches"];
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "description", weight: 0.3 },
        { name: "body", weight: 0.2 },
        { name: "tags", weight: 0.1 },
      ],
      threshold: 0.4,
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    const timeoutId = setTimeout(() => {
      const searchResults = fuse.search(query).map((result) => ({
        item: result.item,
        matches: result.matches,
      }));
      
      setResults(searchResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, fuse]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    clearSearch,
  };
}