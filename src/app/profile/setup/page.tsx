import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SetupForm from "./SetupForm";

export default async function ProfileSetupPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if profile already exists
  const { data: profile } = await supabase
    .from("profiles")
    .select("username, bio")
    .eq("user_id", user.id)
    .single();

  return (
    <main className="max-w-xl mx-auto px-4 py-20 w-full flex-1 flex flex-col justify-center">
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 md:p-12">
        <h1 className="text-3xl font-serif text-zinc-100 mb-2">Profile Setup</h1>
        <p className="text-zinc-500 mb-8">
          Choose a username and write a short bio (max 12 words).
        </p>
        <SetupForm initialUsername={profile?.username} initialBio={profile?.bio} />
      </div>
    </main>
  );
}
