import { posts } from "#site/content";
import { PostItem, QueryPagination, Tag } from "@/components/features/blog";
import { getAllTags, sortPostsByDate, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Yuelin Liu",
  description: "Explore my thoughts on web development, AI engineering, React, JavaScript, and modern programming practices. Technical insights and tutorials for developers.",
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const sortedPosts = sortPostsByDate(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="font-black text-4xl lg:text-5xl mb-4">
          Technical Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
          Deep dives into web development, AI engineering, and modern programming practices. 
          From React patterns to building intelligent applications with LLMs.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {sortedPosts.length} articles published
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            {Object.keys(tags).length} topics covered
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {displayPosts?.length > 0 ? (
            <>
              <div className="grid gap-6">
                {displayPosts.map((post, index) => {
                  const { slug, date, title, description, tags } = post;
                  return (
                    <Card key={slug} className={`hover:shadow-md transition-shadow ${index === 0 ? 'border-primary/20' : ''}`}>
                      <CardContent className="p-6">
                        <PostItem
                          slug={post.slugAsParams}
                          date={date}
                          title={title}
                          description={description}
                          tags={tags}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <QueryPagination
                totalPages={totalPages}
                currentPage={currentPage}
                basePath="/blog"
                className="justify-center mt-8"
              />
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground">Check back soon for new content!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Sticky Container for Sidebar */}
          <div className="sticky top-6 space-y-6">
            {/* Featured Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Popular Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {sortedTags.slice(0, 15).map((tag) => (
                    <Tag tag={tag} key={tag} count={tags[tag]} />
                  ))}
                </div>
                {sortedTags.length > 15 && (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      +{sortedTags.length - 15} more topics
                    </p>
                    <Link 
                      href="/tags" 
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      View all topics →
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Blog Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">{sortedPosts.length}</div>
                  <div className="text-sm text-muted-foreground">Total Posts</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">{Object.keys(tags).length}</div>
                  <div className="text-sm text-muted-foreground">Topics</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">{Math.ceil(sortedPosts.length / 12)}</div>
                  <div className="text-sm text-muted-foreground">Years Writing</div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
