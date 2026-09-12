import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poetry | Kurdish Digital Archive",
  description: "Browse Kurdish poetry and classical literature.",
};

export default async function PoetryIndex() {
  const supabase = await createClient();
  const { data: poems } = await supabase.from("works").select("*, authors(*)").eq("type", "poem").order("created_at", { ascending: false });

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-zinc-100 mb-4">Poetry</h1>
        <p className="text-zinc-400">Explore our collection of classical and modern Kurdish poetry.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {poems?.map((poem: any) => (
          <Link key={poem.id} href={`/poetry/${poem.authors?.slug}/${poem.slug}`} className="group block bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-500 transition-colors">
            <h2 className="text-2xl font-serif text-zinc-100 mb-2 group-hover:text-white">{poem.title_english || poem.title_kurdish}</h2>
            <p className="text-zinc-500 mb-6">— {poem.authors?.name_english}</p>
            {poem.text_kurdish && (
              <p className="font-arabic text-zinc-400 text-right leading-loose line-clamp-3 text-lg" dir="rtl">
                {poem.text_kurdish}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
