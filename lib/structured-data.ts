import { Post } from "#site/content";
import { siteConfig } from "@/config/site";

export interface WebSiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  author: {
    "@type": string;
    name: string;
    url: string;
  };
  sameAs: string[];
}

export interface BlogPostingSchema {
  "@context": string;
  "@type": string;
  headline: string;
  description?: string;
  image?: string[];
  datePublished: string;
  dateModified: string;
  author: {
    "@type": string;
    name: string;
    url: string;
  };
  publisher: {
    "@type": string;
    name: string;
    url: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
}

export interface BreadcrumbListSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
      siteConfig.links.portfolio,
    ].filter(Boolean),
  };
}

export function generateBlogPostSchema(post: Post, baseUrl: string): BlogPostingSchema {
  const postUrl = `${baseUrl}/blog/${post.slugAsParams}`;
  const imageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [imageUrl],
    datePublished: post.date,
    dateModified: post.date, // Use same as published if no modified date
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags,
    articleSection: "Technology",
    wordCount: Math.ceil((post.body?.length || 0) / 5), // Rough word count estimation
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string,
  posts: Post[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${url}/blog/${post.slugAsParams}`,
        name: post.title,
      })),
    },
  };
}

// Utility function to inject structured data into pages
export function injectStructuredData(schema: object): string {
  return JSON.stringify(schema, null, 0);
}