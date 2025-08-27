"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  ...props 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div 
      className={cn("flex items-center justify-center", className)} 
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
          sizeClasses[size]
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

interface LoadingSpinnerWithTextProps extends LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinnerWithText({ 
  text = "Loading...", 
  size = "md",
  className,
  ...props 
}: LoadingSpinnerWithTextProps) {
  return (
    <div 
      className={cn("flex flex-col items-center justify-center gap-2", className)}
      {...props}
    >
      <LoadingSpinner size={size} />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}