import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { getBlogStats } from "@/lib/utils";
import { posts } from "#site/content";
import { Metadata } from "next";
import { Github, Linkedin, Globe, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Yuelin Liu",
  description:
    "Full-Stack Developer & AI Engineer passionate about building intelligent applications and sharing knowledge through technical writing.",
};

export default async function AboutPage() {
  // Get dynamic blog stats
  const blogStats = getBlogStats(posts);
  
  // Dynamic skills based on blog content and manual additions
  const blogTechTags = Object.keys(blogStats.tagsWithCounts);
  const dynamicLanguages = blogTechTags.filter(tag => 
    ['JavaScript', 'TypeScript', 'Python'].includes(tag)
  );
  const dynamicFrameworks = blogTechTags.filter(tag => 
    ['React', 'Next.js', 'Node.js', 'Express', 'MERN'].includes(tag)
  );
  const dynamicTools = blogTechTags.filter(tag => 
    ['AWS', 'Docker', 'Git', 'VSCode', 'Stripe', 'Vercel', 'AI/ML'].includes(tag)
  );

  const skills = {
    languages: [...new Set([...dynamicLanguages, "Python"])], // Ensure Python is included even if not in blog tags
    frameworks: [...new Set([...dynamicFrameworks, "Express"])], // Ensure Express is included
    aiMl: [
      "AutoGen",
      "LangChain", 
      "CrewAI",
      "OpenAI API",
      "Claude API", 
      "RAG Systems",
    ],
    cloud: [...new Set([...dynamicTools.filter(tag => ['AWS', 'Docker', 'Vercel'].includes(tag)), "GCP", "Kubernetes"])],
    databases: ["MongoDB", "PostgreSQL", "Redis"],
    tools: [...new Set([...dynamicTools.filter(tag => ['Git', 'VSCode', 'Stripe'].includes(tag)), "Claude Code"])],
  };

  const achievements = [
    { metric: "81%", description: "API latency reduction at ByteCroniX" },
    {
      metric: "60%",
      description: "Mobile booking increase through UX optimization",
    },
    { metric: `${blogStats.totalPosts}+`, description: "Technical blog posts published" },
    { metric: `${blogStats.totalTags}`, description: "Curated topic tags for easy navigation" },
  ];

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="font-black text-4xl lg:text-5xl mb-4">About Me</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Full-Stack Developer & AI Engineer passionate about building
          intelligent applications and sharing knowledge through technical
          writing.
        </p>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-32 w-32 md:h-40 md:w-40">
            <AvatarImage src="/avatar.jpg" alt={siteConfig.author} />
            <AvatarFallback className="text-2xl">YL</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{siteConfig.author}</h2>
            <p className="text-muted-foreground">
              AI Engineer & Technical Writer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mt-2">
            <Link
              href={siteConfig.links.github}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.links.portfolio}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
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

        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">My Journey</h3>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m a builder at heart, driven by one core principle:{" "}
              <strong>
                transforming complex challenges into elegant, impactful
                solutions
              </strong>
              . My journey started with mastering the full stack—React, Next.js,
              and Node.js—but my curiosity has always pulled me toward the next
              frontier: <strong>AI Engineering</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">What I Do</h3>
            <p className="text-muted-foreground leading-relaxed">
              Currently, I focus on building{" "}
              <strong>
                intelligent applications with Large Language Models
              </strong>
              , using tools like LangChain and Python to create practical,
              AI-powered features. I also love sharing knowledge through
              technical writing—documenting everything from React patterns to
              agentic coding with Claude Code.
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Key Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  {achievement.metric}
                </div>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Technology Stack
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">Core Technologies</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Languages:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skills.languages.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Frameworks:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skills.frameworks.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">AI & Infrastructure</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    AI/ML:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skills.aiMl.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Cloud & DevOps:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skills.cloud.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Experience Highlights */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Experience Highlights
        </h3>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">AI SaaS Platform Development</h4>
                <Badge>ByteCroniX</Badge>
              </div>
              <p className="text-muted-foreground">
                Drove development of core AI SaaS platform, optimizing key API
                performance by 81% and ensuring system resilience under peak
                load through advanced caching and infrastructure improvements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">
                  React SPA & Mobile Optimization
                </h4>
                <Badge variant="secondary">Frontend</Badge>
              </div>
              <p className="text-muted-foreground">
                Built user-centric React Single Page Application that increased
                mobile bookings by 60% through intuitive design, responsive
                layouts, and performance optimization.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">Let&apos;s Connect</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          I&apos;m passionate about solving hard problems with great people. If
          you&apos;re building something innovative, especially in the AI space,
          I&apos;d love to connect and learn more about your project.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="mailto:liuyuelintop@gmail.com"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md transition-colors"
          >
            <Mail className="h-4 w-4" />
            Get in Touch
          </Link>
          <Link
            href={siteConfig.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-input hover:bg-accent hover:text-accent-foreground px-6 py-2 rounded-md transition-colors"
          >
            <Globe className="h-4 w-4" />
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}