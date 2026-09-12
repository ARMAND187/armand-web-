"use client";

import { useState } from "react";
import { getProfileContributions } from "@/lib/profile/actions";
import { Loader2 } from "lucide-react";

export default function ContributionList({ userId, initialContributions, initialHasMore }: { userId: string, initialContributions: any[], initialHasMore: boolean }) {
  const [contributions, setContributions] = useState(initialContributions);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const result = await getProfileContributions(userId, nextPage);
    
    setContributions(prev => [...prev, ...result.data]);
    setHasMore(result.hasMore);
    setPage(nextPage);
    setLoadingMore(false);
  };

  if (contributions.length === 0) {
    return (
      <div className="text-center py-12 bg-zinc-900/20 rounded-2xl border border-zinc-800/50">
        <p className="text-zinc-500">No approved contributions yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {contributions.map((sub) => (
        <article key={sub.id} className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-zinc-800/50 text-zinc-400 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
              {sub.submission_type}
            </span>
            <span className="text-zinc-600 text-xs">{new Date(sub.created_at).toLocaleDateString()}</span>
          </div>
          
          {sub.text_kurdish && (
            <p className="font-arabic text-lg text-zinc-200 leading-relaxed text-right mb-3" dir="rtl">
              {sub.text_kurdish}
            </p>
          )}
          
          {sub.text_english && (
            <p className="font-serif text-zinc-400 text-sm leading-relaxed mb-3">
              {sub.text_english}
            </p>
          )}

          {sub.author_name && (
            <p className="text-zinc-500 text-sm mt-4 border-t border-zinc-800/50 pt-4">— {sub.author_name}</p>
          )}
        </article>
      ))}

      {hasMore && (
        <button 
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="w-full mt-8 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loadingMore && <Loader2 className="animate-spin" size={16} />}
          {loadingMore ? 'Loading...' : 'Load More Contributions'}
        </button>
      )}
    </div>
  );
}
