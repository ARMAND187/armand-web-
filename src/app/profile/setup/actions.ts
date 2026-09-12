"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function saveProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const username = (formData.get("username") as string).trim().toLowerCase();
  const bio = (formData.get("bio") as string)?.trim() || null;

  // Basic server-side validation to provide nice error messages before DB hits
  if (username.length < 3 || username.length > 20 || !/^[a-z0-9_]+$/.test(username)) {
    return { error: "Username must be 3-20 characters, lowercase letters, numbers, and underscores only." };
  }

  const reserved = ['admin', 'administrator', 'official', 'moderator', 'reviewer', 'support', 'system'];
  if (reserved.includes(username)) {
    return { error: "This username is reserved." };
  }

  if (bio) {
    const wordCount = bio.split(/\s+/).length;
    if (wordCount > 12) {
      return { error: "Bio must be 12 words or less." };
    }
  }

  // Insert or Update profile
  const { error } = await supabase.from("profiles").upsert({
    user_id: user.id,
    username,
    bio,
    updated_at: new Date().toISOString()
  });

  if (error) {
    if (error.code === '23505') { // Unique violation
      return { error: "Username is already taken." };
    }
    return { error: error.message };
  }

  redirect(`/profile/${username}`);
}
