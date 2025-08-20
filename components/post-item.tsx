import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
}: PostItemProps) {
  return (
    <article className="flex flex-col gap-4 group">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
        
        <div>
          <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
            <Link href={"/" + slug} className="hover:underline">
              {title}
            </Link>
          </h2>
        </div>
        
        {description && (
          <p className="text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags.slice(0, 4).map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
            {tags.length > 4 && (
              <span className="text-sm text-muted-foreground px-2 py-1">
                +{tags.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-border/50">
        <div className="text-sm text-muted-foreground">
          {Math.ceil((description?.length || 0) / 200)} min read
        </div>
        <Link
          href={slug}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }), 
            "group-hover:bg-primary/10 transition-colors"
          )}
        >
          Read article →
        </Link>
      </div>
    </article>
  );
}
