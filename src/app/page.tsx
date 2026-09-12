import Link from "next/link";
import { ArrowRight, BookOpen, Quote, User, MessageCircle, Search as SearchIcon } from "lucide-react";
import { createClient } from "../utils/supabase/server";

export default async function Home() {
  // Initialize Supabase Server Client
  const supabase = await createClient();

  // Fetch real data from the database
  const { data: poem } = await supabase.from('works').select('*, authors(*)').eq('type', 'poem').limit(1).single();
  const { data: quote } = await supabase.from('works').select('*').in('type', ['quote', 'proverb']).limit(1).single();
  const { data: word } = await supabase.from('words').select('*').limit(1).single();
  const { data: author } = await supabase.from('authors').select('*').eq('slug', 'nali').limit(1).single();

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative w-full border-b border-zinc-900 bg-gradient-to-b from-[#181818] to-[#121212] py-24 md:py-32 px-4 flex flex-col items-center text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-zinc-100 mb-6 max-w-4xl leading-tight">
          Discover the words, poetry, and voices of Kurdish culture.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 font-light">
          Explore Kurdish poetry, quotations, proverbs, authors, and words — preserved in Kurdish and explained in English.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl relative mb-12">
          <input 
            type="text" 
            placeholder="Search poets, poems, quotes, words..." 
            className="w-full bg-zinc-900/50 border border-zinc-700 text-zinc-100 rounded-full py-4 pl-6 pr-12 focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all placeholder:text-zinc-500 text-lg shadow-xl"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-100 transition-colors">
            <SearchIcon size={20} />
          </button>
        </div>

        {/* Primary Actions */}
        <div className="flex items-center gap-4">
          <Link href="/archive" className="bg-zinc-200 text-zinc-950 font-medium px-6 py-3 rounded-full hover:bg-white transition-colors flex items-center gap-2">
            Explore Archive <ArrowRight size={18} />
          </Link>
          <Link href="/quotes" className="bg-zinc-900 border border-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-full hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
            Discover Quotes
          </Link>
        </div>
      </section>

      {/* Featured Sections Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Poem of the Day */}
          {poem && (
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors group flex flex-col">
              <div className="flex items-center gap-2 text-zinc-500 mb-6 font-medium text-sm tracking-widest uppercase">
                <BookOpen size={16} /> Poem of the Day
              </div>
              <h3 className="font-serif text-2xl text-zinc-100 mb-2">{poem.title_english || poem.title_kurdish}</h3>
              <p className="text-zinc-400 text-sm mb-6">{poem.authors?.name_english} • {poem.category || 'Poetry'}</p>
              <div className="bg-zinc-950/50 rounded-xl p-6 mb-6 flex-1">
                <p className="text-xl text-zinc-200 text-right leading-loose mb-6 font-arabic" dir="rtl">
                  {poem.text_kurdish}
                </p>
                <div className="w-12 h-px bg-zinc-800 mb-6"></div>
                <p className="text-zinc-400 font-serif leading-relaxed italic">
                  {poem.text_english}
                </p>
              </div>
              <Link href={`/poetry/${poem.authors?.slug}/${poem.slug}`} className="text-zinc-300 font-medium inline-flex items-center gap-1 group-hover:text-white transition-colors">
                Read poem <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-8">
            {/* Quote of the Day */}
            {quote && (
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors group flex-1">
                <div className="flex items-center gap-2 text-zinc-500 mb-6 font-medium text-sm tracking-widest uppercase">
                  <Quote size={16} /> {quote.type === 'proverb' ? 'Proverb' : 'Quote'} of the Day
                </div>
                <p className="text-2xl text-zinc-200 text-right leading-loose mb-4 font-arabic" dir="rtl">
                  {quote.text_kurdish}
                </p>
                <p className="text-zinc-400 font-serif leading-relaxed italic mb-6">
                  {quote.text_english}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-sm text-zinc-500 font-medium">{quote.category || 'Wisdom'}</p>
                  <div className="flex gap-3">
                    <button className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-100">Copy</button>
                    <button className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-100">Share</button>
                  </div>
                </div>
              </div>
            )}

            {/* Word of the Day */}
            {word && (
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors group">
                <div className="flex items-center gap-2 text-zinc-500 mb-4 font-medium text-sm tracking-widest uppercase">
                  <MessageCircle size={16} /> Word of the Day
                </div>
                <div className="flex items-end justify-between mb-2">
                  <h3 className="font-serif text-3xl text-zinc-100">{word.word_kurdish}</h3>
                  <span className="text-zinc-500">{word.word_latin}</span>
                </div>
                <p className="text-lg text-zinc-300 font-medium mb-4">{word.meaning_english}</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {word.cultural_meaning || word.literal_meaning}
                </p>
                <Link href={`/words/${word.slug}`} className="text-zinc-500 text-sm font-medium hover:text-zinc-300 transition-colors">
                  Explore word →
                </Link>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Poet Spotlight */}
      {author && (
        <section className="border-t border-zinc-900 bg-[#151515] py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-64 bg-zinc-800 rounded-xl border border-zinc-700 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                {author.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={author.image_url} alt={author.name_english} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-zinc-600 text-sm uppercase tracking-widest font-bold">Portrait</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-zinc-500 mb-4 font-medium text-sm tracking-widest uppercase">
                  <User size={16} /> Poet Spotlight
                </div>
                <h2 className="font-serif text-4xl text-zinc-100 mb-2">{author.name_english}</h2>
                <p className="text-xl text-zinc-500 mb-6 font-arabic" dir="rtl">{author.name_kurdish}</p>
                <p className="text-zinc-400 leading-relaxed max-w-2xl mb-8">
                  {author.bio_english}
                </p>
                <Link href={`/authors/${author.slug}`} className="bg-zinc-800 text-zinc-300 font-medium px-6 py-3 rounded-full hover:bg-zinc-700 hover:text-zinc-100 transition-colors">
                  Explore {author.name_english}&apos;s Works
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
