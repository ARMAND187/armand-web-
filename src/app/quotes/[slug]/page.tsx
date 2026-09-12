import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Metadata } from "next";
import { Quote as QuoteIcon } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient();
  const { data } = await supabase.from("works").select("title_english, text_english, authors(name_english)").eq("slug", params.slug).single();
  
  const quote: any = data;
  if (!quote) return { title: "Quote Not Found" };
  
  return {
    title: `Quote by ${quote.authors?.name_english || "Unknown"} | Kurdish Digital Archive`,
    description: quote.text_english || `Read this Kurdish quote.`,
  };
}

export default async function QuotePage(props: Props) {
  const params = await props.params;
  const supabase = await createClient();
  
  // Fetch Quote
  const { data } = await supabase
    .from("works")
    .select("*, authors(*), sources(*)")
    .eq("slug", params.slug)
    .single();
    
  const quote: any = data;
  if (!quote || (quote.type !== 'quote' && quote.type !== 'proverb')) {
    return notFound();
  }

  const author = quote.authors;
  const source = quote.sources;

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-32 w-full flex-1 flex flex-col items-center justify-center">
      
      {/* Back Navigation */}
      <div className="w-full mb-12">
        <Link href="/quotes" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium uppercase tracking-widest flex items-center gap-2">
          ← Back to All Quotes
        </Link>
      </div>

      <article className="w-full bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 md:p-16 relative">
        <QuoteIcon size={48} className="text-zinc-800 absolute top-8 left-8 -z-10" />
        
        <div className="text-center mb-12">
          <p className="text-3xl md:text-5xl text-zinc-100 leading-loose mb-12 font-arabic" dir="rtl">
            {quote.text_kurdish}
          </p>
          
          {quote.text_english && (
            <p className="font-serif text-xl md:text-2xl text-zinc-400 leading-relaxed italic">
              {quote.text_english}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center border-t border-zinc-800 pt-8 mt-8">
          {author ? (
            <Link href={`/authors/${author.slug}`} className="text-zinc-200 font-serif text-xl hover:text-white transition-colors">
              — {author.name_english}
            </Link>
          ) : (
            <span className="text-zinc-400 font-serif text-xl">
              — Unknown Author
            </span>
          )}
          
          <div className="flex items-center gap-3 mt-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
            {quote.category && <span>{quote.category}</span>}
            {quote.category && <span>•</span>}
            <span>{quote.attribution_status} {quote.verified ? '(Verified)' : ''}</span>
          </div>
        </div>

      </article>

      {/* Meaning / Context */}
      {(quote.meaning_english || quote.description_english) && (
        <div className="w-full mt-12 bg-zinc-900/20 border border-zinc-800 rounded-2xl p-8">
          <h3 className="font-serif text-xl text-zinc-100 mb-4">Context & Meaning</h3>
          {quote.description_english && <p className="text-zinc-400 leading-relaxed mb-4">{quote.description_english}</p>}
          {quote.meaning_english && <p className="text-zinc-400 leading-relaxed">{quote.meaning_english}</p>}
        </div>
      )}

      {/* Source */}
      {source && (
        <div className="w-full mt-6 bg-zinc-900/20 border border-zinc-800 rounded-2xl p-6 text-sm text-zinc-500">
          Source: {source.title} {source.author ? `by ${source.author}` : ''} {source.url ? <a href={source.url} className="underline text-zinc-400">View</a> : ''}
        </div>
      )}

    </main>
  );
}
