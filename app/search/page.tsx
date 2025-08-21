import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search through blog posts",
};

export default function SearchPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            Search
          </h1>
          <p className="text-xl text-muted-foreground">
            Find blog posts by title, content, or tags
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <SearchPageContent />
    </div>
  );
}

function SearchPageContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        Use the search bar in the header to find posts, or browse by{" "}
        <a href="/tags" className="underline hover:text-primary">
          tags
        </a>
        .
      </p>
    </div>
  );
}