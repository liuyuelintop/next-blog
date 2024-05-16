import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";

export default async function AboutPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            About Me
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <Avatar className="h-48 w-48">
            <AvatarImage src="/avatar.jpg" alt={siteConfig.author} />
            <AvatarFallback>YL</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center break-words">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center break-words">
            Web Developer
          </p>
        </div>
        <p className="text-muted-foreground text-lg py-4">
          I am a dedicated and versatile full stack developer with a passion for
          creating efficient and user-friendly web applications. With 1.5 years
          of professional experience, I have worked with a variety of
          technologies, including React, Next.js Node.js, MongoDB, MySQL, and
          PostgreSQL. My journey in web development began with a deep curiosity
          for how things work, and it has evolved into a career where I
          continuously strive to learn and adapt to new challenges. I thrive in
          collaborative environments and enjoy solving complex problems to
          deliver high-quality solutions. Outside of coding, I enjoy staying
          active, exploring new technologies, and contributing to open-source
          projects.
        </p>
      </div>
    </div>
  );
}
