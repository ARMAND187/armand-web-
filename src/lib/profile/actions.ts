"use server";

import { createClient } from "@/utils/supabase/server";

export async function getProfile(username: string) {
  const supabase = await createClient();
  
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, user_id, username, bio, created_at")
    .eq("username", username)
    .single();
    
  if (error) return null;
  return profile;
}

export async function getProfileContributions(userId: string, page: number = 1) {
  const supabase = await createClient();
  const PAGE_SIZE = 10;
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  // We only fetch approved submissions
  const { data, count, error } = await supabase
    .from("submissions")
    .select("id, submission_type, title_kurdish, title_english, text_kurdish, text_english, author_name, category, created_at", { count: 'exact' })
    .eq("submitter_user_id", userId)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) {
    console.error("Error fetching contributions:", error);
    return { data: [], hasMore: false, totalCount: 0 };
  }

  return {
    data: data || [],
    hasMore: count !== null ? (start + (data?.length || 0)) < count : false,
    totalCount: count || 0
  };
}
