"use client";

import { useCallback, useMemo } from "react";
import { SearchResult } from "./use-search";

interface CacheEntry {
  query: string;
  results: SearchResult[];
  timestamp: number;
}

class SearchCache {
  private cache: Map<string, CacheEntry> = new Map();
  private maxSize: number = 50;
  private maxAge: number = 5 * 60 * 1000; // 5 minutes

  get(query: string): SearchResult[] | null {
    const entry = this.cache.get(query.toLowerCase());
    
    if (!entry) {
      return null;
    }

    // Check if cache entry is expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(query.toLowerCase());
      return null;
    }

    return entry.results;
  }

  set(query: string, results: SearchResult[]): void {
    // Remove oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(query.toLowerCase(), {
      query,
      results,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  getStats() {
    const entries = Array.from(this.cache.values());
    const now = Date.now();
    const validEntries = entries.filter(entry => now - entry.timestamp <= this.maxAge);
    
    return {
      total: this.cache.size,
      valid: validEntries.length,
      expired: this.cache.size - validEntries.length,
      oldestTimestamp: entries.reduce((oldest, entry) => 
        Math.min(oldest, entry.timestamp), now),
    };
  }
}

const globalSearchCache = new SearchCache();

export function useSearchCache() {
  const getFromCache = useCallback((query: string): SearchResult[] | null => {
    return globalSearchCache.get(query);
  }, []);

  const setInCache = useCallback((query: string, results: SearchResult[]): void => {
    globalSearchCache.set(query, results);
  }, []);

  const clearCache = useCallback((): void => {
    globalSearchCache.clear();
  }, []);

  const cacheStats = useMemo(() => {
    return globalSearchCache.getStats();
  }, []);

  return {
    getFromCache,
    setInCache,
    clearCache,
    cacheStats,
    cacheSize: globalSearchCache.size(),
  };
}