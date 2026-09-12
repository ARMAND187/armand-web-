"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { User2 } from "lucide-react";

export default function UserNavIcon({ mobile = false }: { mobile?: boolean }) {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Fetch profile to get username
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("user_id", user.id)
          .single();
        
        if (profile?.username) {
          setUsername(profile.username);
        } else {
          setUsername("setup"); // Needs to setup profile
        }
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) {
    return <div className={`animate-pulse bg-zinc-800 rounded-full ${mobile ? 'w-6 h-6' : 'w-8 h-8'}`} />;
  }

  const href = username ? (username === "setup" ? "/profile/setup" : `/profile/${username}`) : "/login";
  
  if (mobile) {
    return (
      <Link href={href} className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-100 transition-colors">
        <User2 size={24} />
        <span className="text-[10px] font-medium uppercase tracking-widest">Profile</span>
      </Link>
    );
  }

  return (
    <Link 
      href={href} 
      className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
      title="Profile"
      aria-label="Profile"
    >
      <User2 size={16} />
    </Link>
  );
}
