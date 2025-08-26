import { getAllTags, sortTagsByCount, getBlogStats } from "@/lib/utils";
import { Metadata } from "next";
import { posts } from "#site/content";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Tags - Explore Topics",
  description: "Explore all topics I've written about - from JavaScript and React to AI engineering and best practices. Find articles by technology, concept, or industry focus.",
};

export default async function TagsPage() {
  const publishedPosts = posts.filter((post) => post.published);
  const tags = getAllTags(publishedPosts);
  const sortedTags = sortTagsByCount(tags);
  const blogStats = getBlogStats(posts);
  
  // Group tags by category based on common patterns
  const languageTags = sortedTags.filter(tag => 
    ['JavaScript', 'TypeScript', 'Python'].includes(tag)
  );
  
  const frameworkTags = sortedTags.filter(tag => 
    ['React', 'Next.js', 'Node.js', 'Express', 'MERN'].includes(tag)
  );
  
  const conceptTags = sortedTags.filter(tag => 
    ['Algorithms', 'Data Structures', 'Performance', 'API', 'Testing', 'Security', 'State Management', 'Animation', 'UI/UX'].includes(tag)
  );
  
  const toolTags = sortedTags.filter(tag => 
    ['AWS', 'Docker', 'Git', 'VSCode', 'Stripe', 'Vercel', 'AI/ML'].includes(tag)
  );
  
  const industryTags = sortedTags.filter(tag => 
    ['Best Practices', 'Tutorial', 'Interview', 'Career', 'Blogging'].includes(tag)
  );
  
  const otherTags = sortedTags.filter(tag => 
    ![...languageTags, ...frameworkTags, ...conceptTags, ...toolTags, ...industryTags].includes(tag)
  );

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="font-black text-4xl lg:text-5xl mb-4">Explore Topics</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
          Discover articles by technology, concept, or industry focus. 
          Browse through {blogStats.totalTags} carefully curated topics covering everything from JavaScript fundamentals to AI engineering.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            {blogStats.totalTags} total topics
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {blogStats.totalPosts} articles tagged
          </span>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Languages */}
        {languageTags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Programming Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {languageTags.map((tag) => (
                  <Tag tag={tag} count={tags[tag]} key={tag} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Frameworks */}
        {frameworkTags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Frameworks & Libraries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {frameworkTags.map((tag) => (
                  <Tag tag={tag} count={tags[tag]} key={tag} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Concepts */}
        {conceptTags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Technical Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {conceptTags.map((tag) => (
                  <Tag tag={tag} count={tags[tag]} key={tag} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tools */}
        {toolTags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                Tools & Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {toolTags.map((tag) => (
                  <Tag tag={tag} count={tags[tag]} key={tag} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Industry */}
        {industryTags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Industry & Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {industryTags.map((tag) => (
                  <Tag tag={tag} count={tags[tag]} key={tag} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Tags */}
        {otherTags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                Other Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {otherTags.map((tag) => (
                  <Tag tag={tag} count={tags[tag]} key={tag} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
