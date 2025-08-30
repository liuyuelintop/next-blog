"use client";

import { Skeleton } from "./skeleton";

interface SkeletonSearchProps {
  count?: number;
}

export function SkeletonSearch({ count = 3 }: SkeletonSearchProps) {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 border-b border-border/50 pb-4 last:border-b-0">
          {/* Title */}
          <Skeleton className="h-5 w-4/5" />
          
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          
          {/* Metadata */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonSearchInput() {
  return (
    <div className="relative w-full max-w-sm">
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}