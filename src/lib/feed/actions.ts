"use server";

import { createClient } from "@/utils/supabase/server";

export async function getFeedWorks(page: number, category: string | null = null) {
  const supabase = await createClient();
  const PAGE_SIZE = 10;
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  let query = supabase.from('works')
    .select('*, authors(name_english, name_kurdish, slug)', { count: 'exact' })
    .in('type', ['quote', 'proverb', 'poem'])
    .order('created_at', { ascending: false })
    .range(start, end);

  if (category && category !== 'All') {
    const lowerCat = category.toLowerCase();
    if (['quote', 'proverb', 'poem'].includes(lowerCat)) {
       query = query.eq('type', lowerCat);
    } else {
       query = query.eq('category', category);
    }
  }

  const { data, count, error } = await query;
  
  if (error) {
    console.error("Feed fetch error:", error);
    return { data: [], hasMore: false };
  }

  return {
    data: data || [],
    hasMore: count !== null ? (start + (data?.length || 0)) < count : false
  };
}
