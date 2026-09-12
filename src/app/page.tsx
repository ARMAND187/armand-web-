import Link from "next/link";
import { ArrowRight, BookOpen, Quote, User, MessageCircle } from "lucide-react";

export default function Home() {
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
            <SearchIcon />
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
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors group flex flex-col">
            <div className="flex items-center gap-2 text-zinc-500 mb-6 font-medium text-sm tracking-widest uppercase">
              <BookOpen size={16} /> Poem of the Day
            </div>
            <h3 className="font-serif text-2xl text-zinc-100 mb-2">Ey Reqîb</h3>
            <p className="text-zinc-400 text-sm mb-6">Dildar • 1938 • Modern Poetry</p>
            <div className="bg-zinc-950/50 rounded-xl p-6 mb-6 flex-1">
              <p className="text-xl text-zinc-200 text-right leading-loose mb-6 font-arabic" dir="rtl">
                ئەی ڕەقیب هەر ماوە قەومی کورد زوبان<br/>
                نایشکێنێ دانەیی تۆپی زەمان
              </p>
              <div className="w-12 h-px bg-zinc-800 mb-6"></div>
              <p className="text-zinc-400 font-serif leading-relaxed italic">
                Oh enemy, the Kurdish speaking nation is still alive,<br/>
                It cannot be defeated by the weapons of time.
              </p>
            </div>
            <Link href="/poetry/dildar/ey-reqib" className="text-zinc-300 font-medium inline-flex items-center gap-1 group-hover:text-white transition-colors">
              Read poem <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col gap-8">
            {/* Quote of the Day */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors group flex-1">
              <div className="flex items-center gap-2 text-zinc-500 mb-6 font-medium text-sm tracking-widest uppercase">
                <Quote size={16} /> Quote of the Day
              </div>
              <p className="text-2xl text-zinc-200 text-right leading-loose mb-4 font-arabic" dir="rtl">
                هەموو شتێک بە کاتی خۆی جوانە
              </p>
              <p className="text-zinc-400 font-serif leading-relaxed italic mb-6">
                Everything is beautiful in its own time.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-sm text-zinc-500 font-medium">Kurdish Proverb</p>
                <div className="flex gap-3">
                  <button className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-100">Copy</button>
                  <button className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-100">Share</button>
                </div>
              </div>
            </div>

            {/* Word of the Day */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors group">
              <div className="flex items-center gap-2 text-zinc-500 mb-4 font-medium text-sm tracking-widest uppercase">
                <MessageCircle size={16} /> Word of the Day
              </div>
              <div className="flex items-end justify-between mb-2">
                <h3 className="font-serif text-3xl text-zinc-100">باران</h3>
                <span className="text-zinc-500">ba·ran</span>
              </div>
              <p className="text-lg text-zinc-300 font-medium mb-4">Rain</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Symbolically used in Kurdish poetry to represent rebirth, washing away sorrow, or the tears of the sky missing the earth.
              </p>
              <Link href="/words/baran" className="text-zinc-500 text-sm font-medium hover:text-zinc-300 transition-colors">
                Explore word →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Poet Spotlight */}
      <section className="border-t border-zinc-900 bg-[#151515] py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-64 bg-zinc-800 rounded-xl border border-zinc-700 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
              <span className="text-zinc-600 text-sm uppercase tracking-widest font-bold">Portrait</span>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-zinc-500 mb-4 font-medium text-sm tracking-widest uppercase">
                <User size={16} /> Poet Spotlight
              </div>
              <h2 className="font-serif text-4xl text-zinc-100 mb-2">Nali</h2>
              <p className="text-xl text-zinc-500 mb-6 font-arabic" dir="rtl">نالی</p>
              <p className="text-zinc-400 leading-relaxed max-w-2xl mb-8">
                Mela Xidirî Ehmedî Şaweysî Mîkayalî, known as Nali (1797–1855), is considered one of the greatest classical Kurdish poets. He laid the foundation for the Sorani literary school and wrote extensively on love, philosophy, and exile.
              </p>
              <Link href="/authors/nali" className="bg-zinc-800 text-zinc-300 font-medium px-6 py-3 rounded-full hover:bg-zinc-700 hover:text-zinc-100 transition-colors">
                Explore Nali's Works
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}
