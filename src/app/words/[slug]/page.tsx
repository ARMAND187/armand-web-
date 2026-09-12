import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Metadata } from "next";
import BackButton from "@/components/BackButton";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient();
  const slug = decodeURIComponent(params.slug);
  const { data: word } = await supabase.from("words").select("*").eq("slug", slug).single();
  
  if (!word) return { title: "Word Not Found" };
  
  return {
    title: `${word.word_kurdish} | Kurdish Digital Archive`,
    description: `Meaning and cultural context of the Kurdish word ${word.word_kurdish} (${word.word_latin}).`,
  };
}

export default async function WordPage(props: Props) {
  const params = await props.params;
  const supabase = await createClient();
  const slug = decodeURIComponent(params.slug);
  
  // Fetch word
  const { data: word } = await supabase.from("words").select("*").eq("slug", slug).single();
  
  if (!word) {
    return notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1 flex flex-col justify-center">
      
      {/* Back Navigation */}
      <BackButton fallbackText="Back" />

      <article className="border border-zinc-800 rounded-3xl p-8 md:p-12 bg-zinc-900/30 relative overflow-hidden">
        
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <header className="mb-12 border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
          <div>
            <h1 className="font-arabic text-6xl text-zinc-100 mb-4" dir="rtl">{word.word_kurdish}</h1>
            <h2 className="font-serif text-3xl text-zinc-400">{word.meaning_english}</h2>
          </div>
          
          <div className="flex flex-col gap-2 items-start md:items-end text-sm">
            {word.word_latin && (
              <span className="bg-zinc-900 px-3 py-1 rounded-full text-zinc-300 tracking-wider">
                {word.word_latin}
              </span>
            )}
            {word.dialect && (
              <span className="bg-zinc-900 px-3 py-1 rounded-full text-zinc-400 tracking-wider">
                Dialect: {word.dialect}
              </span>
            )}
            {word.pronunciation && (
              <span className="bg-zinc-900 px-3 py-1 rounded-full text-zinc-400 tracking-wider">
                Pronunciation: {word.pronunciation}
              </span>
            )}
          </div>
        </header>

        <div className="flex flex-col gap-10">
          
          {/* Literal Meaning */}
          {word.literal_meaning && (
            <section>
              <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-3">Literal Meaning</h3>
              <p className="text-zinc-300 leading-relaxed text-lg">{word.literal_meaning}</p>
            </section>
          )}

          {/* Cultural Meaning */}
          {word.cultural_meaning && (
            <section>
              <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-3">Cultural Context</h3>
              <p className="text-zinc-300 leading-relaxed text-lg">{word.cultural_meaning}</p>
            </section>
          )}

          {/* Poetic Meaning */}
          {word.poetic_meaning && (
            <section className="bg-zinc-900/80 rounded-xl p-6 border border-zinc-800">
              <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-3">Usage in Poetry</h3>
              <p className="text-zinc-300 leading-relaxed italic font-serif text-lg">{word.poetic_meaning}</p>
            </section>
          )}
          
          {/* Notes */}
          {word.notes && (
            <section>
              <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-3">Additional Notes</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{word.notes}</p>
            </section>
          )}

        </div>
      </article>

    </main>
  );
}
