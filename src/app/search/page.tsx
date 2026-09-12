import { performGlobalSearch } from "@/lib/search/actions";
import Link from "next/link";
import { Metadata } from "next";
import { User, BookOpen, Quote, MessageCircle } from "lucide-react";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "Search | Kurdish Digital Archive",
  description: "Search the Kurdish Digital Archive for authors, poetry, quotes, and words.",
  robots: {
    index: false,
    follow: false,
  }
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchPage(props: Props) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === 'string' ? searchParams.q : "";
  
  const results = await performGlobalSearch(q);

  const totalResults = results.authors.length + results.poems.length + results.quotes.length + results.words.length;

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      
      {/* Search Header */}
      <div className="mb-12">
        <h1 className="font-serif text-3xl md:text-5xl text-zinc-100 mb-8">Search Archive</h1>
        <div className="max-w-2xl">
          <SearchBar placeholder="Search poets, poems, quotes, words..." />
        </div>
      </div>

      {q && (
        <div className="mb-8 border-b border-zinc-800 pb-4">
          <p className="text-zinc-400">
            Found <strong className="text-zinc-100">{totalResults}</strong> results for <strong className="text-zinc-100">"{q}"</strong>
          </p>
        </div>
      )}

      {q && totalResults === 0 && (
        <div className="py-20 text-center bg-zinc-900/20 rounded-2xl border border-zinc-800">
          <h2 className="text-zinc-300 text-xl mb-4">No results found</h2>
          <p className="text-zinc-500">We couldn't find anything matching your search. Try adjusting your keywords.</p>
        </div>
      )}

      {/* Results Categories */}
      <div className="flex flex-col gap-16">
        
        {/* Authors */}
        {results.authors.length > 0 && (
          <section>
            <div className="flex items-center gap-2 text-zinc-500 mb-6 font-medium text-sm tracking-widest uppercase">
              <User size={16} /> Authors ({results.authors.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.authors.map(author => (
                <Link key={author.id} href={`/authors/${author.slug}`} className="group flex items-center gap-6 bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl hover:border-zinc-600 transition-colors">
                  {author.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={author.image_url} alt={author.name_english} className="w-16 h-16 rounded-full object-cover bg-zinc-800" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600 font-bold uppercase">
                      {author.name_english?.[0] || '?'}
                    </div>
                  )}
                  <div>
                    <h3 className="text-zinc-100 font-serif text-xl mb-1 group-hover:text-white">{author.name_english}</h3>
                    <p className="text-zinc-500 font-arabic text-lg" dir="rtl">{author.name_kurdish}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Poems */}
        {results.poems.length > 0 && (
          <section>
            <div className="flex items-center gap-2 text-zinc-500 mb-6 font-medium text-sm tracking-widest uppercase">
              <BookOpen size={16} /> Poems ({results.poems.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.poems.map(poem => (
                <Link key={poem.id} href={`/poetry/${poem.authors?.slug}/${poem.slug}`} className="group block bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl hover:border-zinc-600 transition-colors">
                  <h3 className="text-zinc-100 font-serif text-xl mb-2 group-hover:text-white">{poem.title_english || poem.title_kurdish}</h3>
                  <p className="text-zinc-500 text-sm mb-4">{poem.authors?.name_english}</p>
                  {poem.text_kurdish && (
                    <p className="text-zinc-400 font-arabic text-right text-lg line-clamp-2 leading-loose" dir="rtl">
                      {poem.text_kurdish}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Quotes & Proverbs */}
        {results.quotes.length > 0 && (
          <section>
            <div className="flex items-center gap-2 text-zinc-500 mb-6 font-medium text-sm tracking-widest uppercase">
              <Quote size={16} /> Quotes & Proverbs ({results.quotes.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.quotes.map(quote => (
                <Link key={quote.id} href={`/quotes/${quote.slug}`} className="group block bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl hover:border-zinc-600 transition-colors">
                  <p className="text-zinc-200 font-arabic text-right text-xl line-clamp-3 leading-loose mb-4 group-hover:text-white" dir="rtl">
                    {quote.text_kurdish}
                  </p>
                  {quote.text_english && (
                    <p className="text-zinc-500 font-serif italic text-sm line-clamp-2">
                      {quote.text_english}
                    </p>
                  )}
                  <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500 uppercase tracking-widest">
                    <span>{quote.type}</span>
                    {quote.authors && <span>{quote.authors.name_english}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Words */}
        {results.words.length > 0 && (
          <section>
            <div className="flex items-center gap-2 text-zinc-500 mb-6 font-medium text-sm tracking-widest uppercase">
              <MessageCircle size={16} /> Words ({results.words.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.words.map(word => (
                <Link key={word.id} href={`/words/${word.slug}`} className="group block bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl hover:border-zinc-600 transition-colors">
                  <div className="flex justify-between items-end mb-3">
                    <h3 className="text-zinc-100 font-arabic text-3xl group-hover:text-white" dir="rtl">{word.word_kurdish}</h3>
                    <span className="text-zinc-500 text-sm">{word.word_latin}</span>
                  </div>
                  <p className="text-zinc-400 font-medium">{word.meaning_english}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
