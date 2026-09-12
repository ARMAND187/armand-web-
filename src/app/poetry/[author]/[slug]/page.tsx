import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Metadata } from "next";

import BackButton from "@/components/BackButton";

type Props = { params: Promise<{ author: string; slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient();
  const authorSlug = decodeURIComponent(params.author);
  const slug = decodeURIComponent(params.slug);
  const { data } = await supabase.from("works").select("title_english, title_kurdish, description_english, authors!inner(slug, name_english)").eq("slug", slug).eq("authors.slug", authorSlug).single();
  
  const work: any = data;
  if (!work) return { title: "Poem Not Found" };
  
  const title = work.title_english || work.title_kurdish || "Poem";
  return {
    title: `${title} by ${work.authors?.name_english} | Kurdish Digital Archive`,
    description: work.description_english || `Read the Kurdish poem ${title} by ${work.authors?.name_english}.`,
  };
}

export default async function PoemPage(props: Props) {
  const params = await props.params;
  const supabase = await createClient();
  
  const authorSlug = decodeURIComponent(params.author);
  const slug = decodeURIComponent(params.slug);

  const { data } = await supabase
    .from("works")
    .select("*, authors!inner(*), sources(*)")
    .eq("slug", slug)
    .eq("authors.slug", authorSlug)
    .single();
    
  const work: any = data;
  if (!work || work.type !== 'poem') {
    return notFound();
  }

  const author = work.authors;
  const source = work.sources;

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      
      {/* Back Navigation */}
      <BackButton fallbackText={`Back`} />

      <article>
        {/* Title Section */}
        <header className="mb-12 text-center md:text-left border-b border-zinc-900 pb-12">
          {work.title_english && (
            <h1 className="font-serif text-3xl md:text-5xl text-zinc-100 mb-4">{work.title_english}</h1>
          )}
          {work.title_kurdish && (
            <h2 className="font-arabic text-2xl md:text-4xl text-zinc-400 mb-6" dir="rtl">{work.title_kurdish}</h2>
          )}
          
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <span className="bg-zinc-900 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase">
              {work.category || 'Poetry'}
            </span>
            <span className="bg-zinc-900 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase">
              By {author.name_english}
            </span>
          </div>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          {/* Kurdish Original (Primary) */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl">
            <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-8 text-right">Original Kurdish</h3>
            <div className="font-arabic text-xl md:text-2xl text-zinc-200 leading-loose whitespace-pre-wrap text-right" dir="rtl">
              {work.text_kurdish}
            </div>
          </div>

          {/* English Translation */}
          <div className="bg-[#151515] p-8 rounded-2xl">
            <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-8">English Translation</h3>
            {work.text_english ? (
              <div className="font-serif text-lg md:text-xl text-zinc-300 leading-loose whitespace-pre-wrap">
                {work.text_english}
              </div>
            ) : (
              <p className="text-zinc-600 italic">No English translation currently available for this work.</p>
            )}
          </div>

        </div>

        {/* Meaning / Description */}
        {(work.meaning_english || work.description_english) && (
          <div className="mb-16 border-l-2 border-zinc-800 pl-6">
            <h3 className="font-serif text-2xl text-zinc-100 mb-4">About this Poem</h3>
            {work.description_english && <p className="text-zinc-400 leading-relaxed mb-4">{work.description_english}</p>}
            {work.meaning_english && <p className="text-zinc-400 leading-relaxed">{work.meaning_english}</p>}
          </div>
        )}

        {/* Metadata Footer */}
        <footer className="bg-zinc-900/50 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 justify-between text-sm">
          
          <div>
            <h4 className="text-zinc-300 uppercase tracking-widest text-xs font-bold mb-2">Attribution Status</h4>
            <p className="text-zinc-500">
              {work.attribution_status} 
              {work.verified ? ' (Verified)' : ' (Unverified)'}
            </p>
          </div>

          {source && (
            <div>
              <h4 className="text-zinc-300 uppercase tracking-widest text-xs font-bold mb-2">Source</h4>
              <p className="text-zinc-500">
                {source.title} {source.author ? `by ${source.author}` : ''}
              </p>
              {source.url && (
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 transition-colors">
                  View Source ↗
                </a>
              )}
            </div>
          )}

        </footer>
      </article>
    </main>
  );
}
