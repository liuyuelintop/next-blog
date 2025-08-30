import { Metadata } from "next";
import { Post } from "#site/content";
import { siteConfig } from "@/config/site";

export interface MetadataParams {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export function generateMetadata(params: MetadataParams): Metadata {
  const {
    title,
    description = siteConfig.description,
    keywords = [],
    canonical,
    image,
    noIndex = false,
    type = "website",
    publishedTime,
    modifiedTime,
    authors = [siteConfig.author],
    section,
    tags = [],
  } = params;

  const metaTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : siteConfig.name;

  const metaImage = image 
    ? `${siteConfig.url}${image}`
    : `${siteConfig.url}/api/og${title ? `?title=${encodeURIComponent(title)}` : ''}`;

  const allKeywords = [
    ...keywords,
    ...tags,
    "blog",
    "technology",
    "programming",
    "web development",
  ].filter(Boolean);

  return {
    title: metaTitle,
    description,
    keywords: allKeywords.join(", "),
    authors: authors.map(name => ({ name })),
    creator: siteConfig.author,
    publisher: siteConfig.name,
    robots: noIndex ? "noindex,nofollow" : "index,follow",
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: type === "article" ? "article" : "website",
      title: metaTitle,
      description,
      url: canonical || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: "en_US",
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
        section,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [metaImage],
      creator: `@${siteConfig.author.replace(/\s+/g, '').toLowerCase()}`,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_SITE_VERIFICATION,
    },
    category: section || "technology",
  };
}

export function generatePostMetadata(post: Post): Metadata {
  return generateMetadata({
    title: post.title,
    description: post.description,
    keywords: post.tags,
    canonical: `${siteConfig.url}/blog/${post.slugAsParams}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    section: "Technology",
    tags: post.tags,
  });
}

export function generatePageMetadata(
  title: string,
  description?: string,
  path?: string
): Metadata {
  return generateMetadata({
    title,
    description,
    canonical: path ? `${siteConfig.url}${path}` : undefined,
  });
}

export function generateTagPageMetadata(
  tag: string,
  postCount: number,
  description?: string
): Metadata {
  const tagTitle = `Posts tagged "${tag}"`;
  const tagDescription = description || 
    `Explore ${postCount} posts about ${tag}. Discover articles, tutorials, and insights related to ${tag} in web development and technology.`;

  return generateMetadata({
    title: tagTitle,
    description: tagDescription,
    keywords: [tag, "posts", "articles", "tutorials"],
    canonical: `${siteConfig.url}/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`,
  });
}