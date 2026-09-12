import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dictionary | Kurdish Digital Archive",
  description: "Browse the Kurdish dictionary.",
};

export const revalidate = 3600; // Cache for 1 hour

export default async function DictionaryIndex() {
  const supabase = await createClient();
  // PERFORMANCE: Only fetch required fields instead of SELECT *
  const { data: words } = await supabase
    .from("words")
    .select("id, slug, word_kurdish, word_latin, meaning_english")
    .order("word_latin");

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-zinc-100 mb-4">Dictionary</h1>
        <p className="text-zinc-400">Discover profound words and their cultural meanings.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {words?.map((word: any) => (
          <Link key={word.id} href={`/words/${word.slug}`} className="group block bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-500 transition-colors">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-3xl font-arabic text-zinc-100 group-hover:text-white" dir="rtl">{word.word_kurdish}</h2>
              <span className="text-zinc-500">{word.word_latin}</span>
            </div>
            <p className="text-zinc-400 font-medium">{word.meaning_english}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
