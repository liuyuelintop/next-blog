"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse, { FuseResult } from "fuse.js";
import { posts } from "#site/content";
import { useSearchCache } from "./use-search-cache";

export interface SearchResult {
  item: typeof posts[0];
  matches?: FuseResult<typeof posts[0]>["matches"];
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cacheHits, setCacheHits] = useState(0);
  const { getFromCache, setInCache, clearCache } = useSearchCache();

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: [
        { name: "title", weight: 0.3 },
        { name: "description", weight: 0.25 },
        { name: "body", weight: 0.3 },
        { name: "tags", weight: 0.15 },
      ],
      threshold: 0.3,
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
      findAllMatches: true,
    });
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // Check cache first
    const cachedResults = getFromCache(query);
    if (cachedResults) {
      setResults(cachedResults);
      setCacheHits(prev => prev + 1);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    const timeoutId = setTimeout(() => {
      const searchResults = fuse.search(query).map((result) => ({
        item: result.item,
        matches: result.matches,
      }));
      
      // Cache the results
      setInCache(query, searchResults);
      
      setResults(searchResults);
      setIsLoading(false);
    }, 200); // Reduced from 300ms since we have caching

    return () => clearTimeout(timeoutId);
  }, [query, fuse, getFromCache, setInCache]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  const clearSearchCache = () => {
    clearCache();
    setCacheHits(0);
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    clearSearch,
    clearSearchCache,
    cacheHits,
  };
}