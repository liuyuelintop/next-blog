"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/use-search";
import { useSearchShortcut } from "@/hooks/use-search-shortcut";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface SearchInputProps {
  className?: string;
  onResultSelect?: () => void;
}

export function SearchInput({ className, onResultSelect }: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { query, setQuery, results, isLoading, clearSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useSearchShortcut(focusInput);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setIsOpen(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          const slug = results[selectedIndex].item.slugAsParams;
          window.location.href = `/blog/${slug}`;
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    clearSearch();
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleResultClick = (slug: string) => {
    setIsOpen(false);
    onResultSelect?.();
  };

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <div className="relative">
        <Icons.search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search posts... (⌘K)"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="w-full pl-8 pr-8 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-sm"
          >
            <Icons.x className="h-3 w-3 text-muted-foreground" />
          </button>
        )}
      </div>

      {isOpen && (query.trim() || results.length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.slice(0, 8).map((result, index) => (
                <Link
                  key={result.item.slug}
                  href={`/blog/${result.item.slugAsParams}`}
                  onClick={() => handleResultClick(result.item.slugAsParams)}
                  className={cn(
                    "block px-4 py-3 hover:bg-muted/50 transition-colors",
                    selectedIndex === index && "bg-muted/50"
                  )}
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium line-clamp-1">
                      {result.item.title}
                    </h4>
                    {result.item.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {result.item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <time>{formatDate(result.item.date)}</time>
                      {result.item.tags && result.item.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{result.item.tags.slice(0, 2).join(", ")}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
              {results.length > 8 && (
                <div className="px-4 py-2 text-xs text-muted-foreground border-t">
                  Showing 8 of {results.length} results
                </div>
              )}
            </div>
          ) : query.trim() ? (
            <div className="p-4 text-center text-muted-foreground">
              No posts found for &ldquo;{query}&rdquo;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}