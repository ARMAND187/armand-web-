import FeedContainer from "@/components/feed/FeedContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed | Kurdish Digital Archive",
  description: "Discover modern Kurdish quotes, poetry, and wisdom.",
};

export default function FeedPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-serif text-4xl md:text-6xl text-zinc-100 mb-6">Discover</h1>
        <p className="text-zinc-400 text-lg">
          Explore a curated collection of Kurdish poetry, proverbs, and thoughts.
        </p>
      </div>

      <FeedContainer />

    </main>
  );
}
