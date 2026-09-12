import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors | Kurdish Digital Archive",
  description: "Browse all poets and authors in the archive.",
};

export const revalidate = 3600; // Cache for 1 hour

export default async function AuthorsIndex() {
  const supabase = await createClient();
  // PERFORMANCE: Only fetch required fields instead of SELECT *
  const { data: authors } = await supabase
    .from("authors")
    .select("id, slug, name_kurdish, name_english, image_url, era")
    .order("name_english");

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-zinc-100 mb-4">Authors & Poets</h1>
        <p className="text-zinc-400">Discover the voices that shaped Kurdish literature and thought.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors?.map(author => (
          <Link key={author.id} href={`/authors/${author.slug}`} className="group flex flex-col bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-500 transition-colors">
            {author.image_url ? (
               // eslint-disable-next-line @next/next/no-img-element
              <img src={author.image_url} alt={author.name_english} className="w-16 h-16 rounded-full object-cover mb-4 bg-zinc-800" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-serif text-xl mb-4 uppercase">
                {author.name_english?.[0] || '?'}
              </div>
            )}
            <h2 className="text-xl font-serif text-zinc-100 group-hover:text-white">{author.name_english}</h2>
            <h3 className="text-lg font-arabic text-zinc-400" dir="rtl">{author.name_kurdish}</h3>
            {author.era && <p className="text-zinc-500 text-sm mt-4">{author.era}</p>}
          </Link>
        ))}
      </div>
    </main>
  );
}
