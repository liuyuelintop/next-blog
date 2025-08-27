"use client";

import { Skeleton } from "./skeleton";
import { Card } from "./card";

interface SkeletonCardProps {
  showTags?: boolean;
  showDescription?: boolean;
}

export function SkeletonCard({ showTags = true, showDescription = true }: SkeletonCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Description */}
        {showDescription && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}
        
        {/* Date and read time */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        
        {/* Tags */}
        {showTags && (
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        )}
      </div>
    </Card>
  );
}

export function SkeletonCardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}