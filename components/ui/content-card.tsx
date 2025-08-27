"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card } from "./card";
import { buttonVariants } from "./button";
import { cn, formatDate } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  description?: string;
  date?: string;
  href?: string;
  children?: ReactNode;
  tags?: ReactNode;
  actions?: ReactNode;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

export function ContentCard({
  title,
  description,
  date,
  href,
  children,
  tags,
  actions,
  className,
  variant = "default"
}: ContentCardProps) {
  const cardClasses = cn(
    "group transition-all duration-200",
    variant === "featured" && "border-2 border-primary/20 shadow-lg",
    variant === "compact" && "p-4",
    variant === "default" && "p-6",
    className
  );

  const titleClasses = cn(
    "font-bold group-hover:text-primary transition-colors",
    variant === "featured" ? "text-2xl" : "text-xl",
    variant === "compact" && "text-lg"
  );

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return <Link href={href}>{children}</Link>;
    }
    return <>{children}</>;
  };

  return (
    <ContentWrapper>
      <Card className={cardClasses}>
      <div className="space-y-3">
        {/* Date */}
        {date && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
        )}
        
        {/* Title */}
        <div>
          <h2 className={titleClasses}>
            {href ? (
              <span className="hover:underline">{title}</span>
            ) : (
              title
            )}
          </h2>
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
        
        {/* Custom content */}
        {children}
        
        {/* Tags */}
        {tags && (
          <div className="flex gap-2 flex-wrap">
            {tags}
          </div>
        )}
        
        {/* Actions */}
        {actions && (
          <div className="flex justify-between items-center pt-2 border-t border-border/50">
            {actions}
          </div>
        )}
      </div>
      </Card>
    </ContentWrapper>
  );
}

// Predefined action components for common use cases
export function ReadMoreAction({ href, readTime }: { href: string; readTime?: number }) {
  return (
    <>
      <div className="text-sm text-muted-foreground">
        {readTime ? `${readTime} min read` : "Quick read"}
      </div>
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }), 
          "group-hover:bg-primary/10 transition-colors"
        )}
      >
        Read article →
      </Link>
    </>
  );
}