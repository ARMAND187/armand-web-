import { notFound } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";
import Link from "next/link";
import { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient();
  const { data: author } = await supabase.from("authors").select("*").eq("slug", params.slug).single();
  
  if (!author) return { title: "Author Not Found" };
  
  return {
    title: `${author.name_english || author.name_kurdish} | Kurdish Digital Archive`,
    description: author.bio_english || `Read works and biography of ${author.name_english || author.name_kurdish}.`,
  };
}

export default async function AuthorPage(props: Props) {
  const params = await props.params;
  const supabase = await createClient();
  
  // Fetch author
  const { data: author } = await supabase.from("authors").select("*").eq("slug", params.slug).single();
  
  if (!author) {
    return notFound();
  }

  // Selective column fetching for performance
  const { data: works } = await supabase
    .from("works")
    .select("id, title_english, title_kurdish, slug, type, category")
    .eq("author_id", author.id)
    .order("created_at", { ascending: false });

  const poems = works?.filter(w => w.type === 'poem') || [];
  const quotes = works?.filter(w => w.type === 'quote' || w.type === 'proverb') || [];

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      
      {/* Author Header */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
        {author.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={author.image_url} alt={author.name_english} className="w-48 h-64 object-cover rounded-xl border border-zinc-800 bg-zinc-900 shrink-0" />
        ) : (
          <div className="w-48 h-64 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-zinc-700 font-medium uppercase tracking-widest text-xs">No Image</span>
          </div>
        )}
        
        <div className="flex-1">
          <h1 className="font-serif text-4xl md:text-5xl text-zinc-100 mb-2">{author.name_english}</h1>
          <h2 className="font-arabic text-3xl text-zinc-500 mb-6" dir="rtl">{author.name_kurdish}</h2>
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mb-6">
            {(author.birth_year || author.death_year) && (
              <span className="bg-zinc-900 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                {author.birth_year || '?'} – {author.death_year || '?'}
              </span>
            )}
            {author.era && (
              <span className="bg-zinc-900 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                Era: {author.era}
              </span>
            )}
            {author.region && (
              <span className="bg-zinc-900 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                Region: {author.region}
              </span>
            )}
          </div>
          
          {author.bio_english && (
            <div className="text-zinc-400 leading-relaxed mb-4">
              {author.bio_english}
            </div>
          )}
          {author.bio_kurdish && (
            <div className="text-zinc-400 leading-relaxed font-arabic" dir="rtl">
              {author.bio_kurdish}
            </div>
          )}
        </div>
      </div>

      {/* Attribution Notes */}
      {author.attribution_notes && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-16 text-sm text-zinc-400">
          <strong className="text-zinc-300 block mb-2 uppercase tracking-widest text-xs">Attribution Notes</strong>
          {author.attribution_notes}
        </div>
      )}

      {/* Works - Poems */}
      {poems.length > 0 && (
        <div className="mb-16">
          <h3 className="font-serif text-2xl text-zinc-100 mb-6 border-b border-zinc-800 pb-4">Poems</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {poems.map(poem => (
              <Link key={poem.id} href={`/poetry/${author.slug}/${poem.slug}`} className="group block bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl hover:border-zinc-600 transition-colors">
                <h4 className="text-zinc-200 font-serif text-xl mb-2 group-hover:text-white transition-colors">{poem.title_english || poem.title_kurdish || "Untitled"}</h4>
                {poem.title_kurdish && poem.title_english && (
                  <p className="text-zinc-500 font-arabic text-lg" dir="rtl">{poem.title_kurdish}</p>
                )}
                {poem.category && <p className="text-zinc-600 text-xs mt-4 uppercase tracking-widest">{poem.category}</p>}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Works - Quotes */}
      {quotes.length > 0 && (
        <div className="mb-16">
          <h3 className="font-serif text-2xl text-zinc-100 mb-6 border-b border-zinc-800 pb-4">Quotes & Proverbs</h3>
          <div className="grid grid-cols-1 gap-4">
            {quotes.map(quote => (
              <Link key={quote.id} href={`/quotes/${quote.slug}`} className="group block bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl hover:border-zinc-600 transition-colors">
                <h4 className="text-zinc-300 italic mb-2 group-hover:text-white transition-colors">{quote.title_english || "Quote"}</h4>
                <p className="text-zinc-600 text-xs mt-2 uppercase tracking-widest">{quote.category || quote.type}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

    </main>
  );
}
