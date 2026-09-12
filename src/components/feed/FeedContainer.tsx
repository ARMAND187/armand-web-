"use client";

import { useState, useEffect, useCallback } from "react";
import { getFeedWorks } from "@/lib/feed/actions";
import FeedCard from "./FeedCard";
import { Loader2 } from "lucide-react";

const CATEGORIES = ["All", "Poetry", "Quotes", "Proverbs", "Motivation", "Wisdom", "Love", "Life", "Philosophy"];

export default function FeedContainer() {
  const [works, setWorks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchInitial = useCallback(async () => {
    setLoading(true);
    setPage(1);
    const result = await getFeedWorks(1, category);
    setWorks(result.data);
    setHasMore(result.hasMore);
    setLoading(false);
  }, [category]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const result = await getFeedWorks(nextPage, category);
    setWorks(prev => [...prev, ...result.data]);
    setHasMore(result.hasMore);
    setPage(nextPage);
    setLoadingMore(false);
  };

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="w-full flex overflow-x-auto pb-6 mb-8 gap-3 hide-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
              category === cat 
              ? 'bg-zinc-100 text-zinc-950 shadow-md' 
              : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feed Content */}
      {loading ? (
        <div className="w-full flex justify-center py-32">
          <Loader2 className="animate-spin text-zinc-600" size={32} />
        </div>
      ) : works.length === 0 ? (
        <div className="w-full text-center py-32 bg-zinc-900/20 rounded-3xl border border-zinc-800">
          <h2 className="text-zinc-300 text-xl mb-4">No content found</h2>
          <p className="text-zinc-500">We couldn't find any content for this category.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {works.map((work) => (
            <FeedCard key={work.id} work={work} />
          ))}

          {/* Pagination / Load More */}
          {hasMore && (
            <button 
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="mt-8 px-8 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loadingMore && <Loader2 className="animate-spin" size={16} />}
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          )}

          {!hasMore && works.length > 0 && (
            <p className="mt-12 text-zinc-600 text-sm italic font-serif">
              You have reached the end of this collection.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
