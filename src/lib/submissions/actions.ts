"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitContribution(formData: FormData) {
  const supabase = await createClient();

  // 1. Honeypot Anti-Spam Check
  const honeypot = formData.get("website");
  if (honeypot) {
    // Silently pretend it succeeded to trick bots
    console.warn("Honeypot triggered in submission.");
    return { success: true, message: "Thank you. Your contribution has been received." };
  }

  // 2. Validate essential fields
  const submissionType = formData.get("submission_type") as string;
  const textKurdish = formData.get("text_kurdish") as string;
  
  if (!submissionType) {
    return { success: false, error: "Submission type is required." };
  }
  
  // Enforce max length to prevent abuse (e.g., 5000 chars)
  if (textKurdish && textKurdish.length > 5000) {
    return { success: false, error: "Content is too long. Please keep submissions under 5000 characters." };
  }

  // 3. Construct Payload
  const payload = {
    submission_type: submissionType,
    title_kurdish: formData.get("title_kurdish") || null,
    title_english: formData.get("title_english") || null,
    text_kurdish: textKurdish || null,
    text_english: formData.get("text_english") || null,
    author_name: formData.get("author_name") || null,
    category: formData.get("category") || null,
    dialect: formData.get("dialect") || null,
    source_description: formData.get("source_description") || null,
    source_url: formData.get("source_url") || null,
    context: formData.get("context") || null,
    submitter_name: formData.get("submitter_name") || null,
    submitter_email: formData.get("submitter_email") || null,
  };

  // 4. Insert into database
  const { error } = await supabase
    .from("submissions")
    .insert([payload]);

  if (error) {
    console.error("Submission insertion error:", error);
    return { success: false, error: "An error occurred while saving your submission. Please try again." };
  }

  return { success: true, message: "Thank you. Your contribution has been received. Every submission is reviewed before it becomes part of the archive." };
}

// ------------------------------------------------------------------
// Admin Actions (Require Reviewer/Admin Role)
// ------------------------------------------------------------------

export async function getPendingSubmissions() {
  const supabase = await createClient();
  
  // The RLS policy will automatically reject this if the user is not a reviewer/admin
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch pending submissions", error);
    return { data: [], error: "Unauthorized or Database Error" };
  }

  return { data, error: null };
}

export async function reviewSubmission(id: string, action: 'approve' | 'reject' | 'request_info', notes: string) {
  const supabase = await createClient();
  
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return { success: false, error: "Unauthorized" };

  let status = 'pending';
  if (action === 'approve') status = 'approved';
  if (action === 'reject') status = 'rejected';
  if (action === 'request_info') status = 'needs_information';

  const { error } = await supabase
    .from("submissions")
    .update({
      status: status,
      review_notes: notes,
      reviewer_id: userData.user.id,
      reviewed_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to review submission", error);
    return { success: false, error: "Failed to update submission state." };
  }

  return { success: true };
}
