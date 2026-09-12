"use server";

import { createClient } from "@/utils/supabase/server";

export interface SearchResults {
  authors: any[];
  poems: any[];
  quotes: any[];
  words: any[];
}

export async function performGlobalSearch(query: string): Promise<SearchResults> {
  const supabase = await createClient();
  const cleanQuery = query.trim();
  
  if (!cleanQuery) {
    return { authors: [], poems: [], quotes: [], words: [] };
  }

  // Using %query% pattern combined with ILIKE. 
  // With the pg_trgm GIN indexes, this performs extremely fast in PostgreSQL without full-table scans.
  const searchPattern = `%${cleanQuery}%`;

  // 1. Fetch Authors
  const { data: authors } = await supabase.from('authors')
    .select('id, name_kurdish, name_english, slug, image_url')
    .or(`name_kurdish.ilike.${searchPattern},name_english.ilike.${searchPattern}`)
    .limit(5);

  // 2. Fetch Poems (Title and Body)
  const { data: poems } = await supabase.from('works')
    .select('id, title_kurdish, title_english, slug, type, text_kurdish, authors!inner(name_english, slug)')
    .eq('type', 'poem')
    .or(`title_kurdish.ilike.${searchPattern},title_english.ilike.${searchPattern},text_kurdish.ilike.${searchPattern},text_english.ilike.${searchPattern}`)
    .limit(10);

  // 3. Fetch Quotes/Proverbs (Body)
  const { data: quotes } = await supabase.from('works')
    .select('id, text_kurdish, text_english, type, slug, category, authors(name_english, slug)')
    .in('type', ['quote', 'proverb'])
    .or(`text_kurdish.ilike.${searchPattern},text_english.ilike.${searchPattern}`)
    .limit(10);

  // 4. Fetch Words
  const { data: words } = await supabase.from('words')
    .select('id, word_kurdish, word_latin, meaning_english, slug')
    .or(`word_kurdish.ilike.${searchPattern},word_latin.ilike.${searchPattern},meaning_english.ilike.${searchPattern}`)
    .limit(10);

  return { 
    authors: authors || [], 
    poems: poems || [], 
    quotes: quotes || [], 
    words: words || [] 
  };
}
