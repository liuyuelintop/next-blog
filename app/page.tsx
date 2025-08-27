import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPostsByDate, getAllTags } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Globe, Mail, Code, BookOpen, Users } from "lucide-react";

export default function Home() {
  const latestPosts = sortPostsByDate(posts).slice(0, 4);
  const allTags = getAllTags(posts);
  const publishedPosts = posts.filter(post => post.published);
  
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
    "AI/ML", "LangChain", "Python", "AWS", "Docker"
  ];
  
  const achievements = [
    { number: publishedPosts.length, label: "Technical Articles", icon: BookOpen },
    { number: Object.keys(allTags).length, label: "Topics Covered", icon: Code },
    { number: "81%", label: "API Performance Boost", icon: Users }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="space-y-6 pb-12 pt-6 md:pb-16 md:pt-10 lg:py-24">
        <div className="container flex flex-col gap-6 text-center max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
              Full-Stack Developer & <span className="text-primary">AI Engineer</span>
            </h1>
            <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance leading-relaxed">
              Building intelligent applications with modern web technologies. Sharing knowledge through 
              technical writing and open-source contributions. Currently focused on AI-powered solutions.
            </p>
          </div>
          
          {/* Skills Tags */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link
              href="/blog"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Read My Blog
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit"
              )}
            >
              <Users className="mr-2 h-4 w-4" />
              About Me
            </Link>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4 pt-4">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.links.portfolio}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Globe className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:liuyuelintop@gmail.com"
              className="p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <achievement.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">{achievement.number}</div>
                  <p className="text-muted-foreground">{achievement.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="container max-w-4xl py-12 lg:py-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
              Latest Technical Articles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Deep dives into web development, AI engineering, and modern programming practices
            </p>
          </div>
          
          <div className="grid gap-6">
            {latestPosts.map((post, index) => (
              <Card key={post.slug} className={`hover:shadow-md transition-shadow ${index === 0 ? 'border-primary/20' : ''}`}>
                <CardContent className="p-6">
                  <PostItem
                    slug={post.slugAsParams}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    tags={post.tags}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-2xl text-center space-y-6">
          <h3 className="text-2xl font-bold">Let&apos;s Build Something Amazing</h3>
          <p className="text-muted-foreground">
            I&apos;m actively seeking new opportunities in full-stack development and AI engineering. 
            Let&apos;s connect and discuss how I can contribute to your team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:liuyuelintop@gmail.com"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Link>
            <Link
              href={siteConfig.links.portfolio}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Globe className="mr-2 h-4 w-4" />
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
