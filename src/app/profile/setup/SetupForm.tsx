"use client";

import { useState } from "react";
import { saveProfile } from "./actions";
import { Loader2 } from "lucide-react";

export default function SetupForm({ initialUsername, initialBio }: { initialUsername?: string, initialBio?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await saveProfile(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/20 text-red-400 border border-red-900/50 p-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Username</label>
        <input 
          type="text" 
          name="username" 
          required 
          defaultValue={initialUsername || ""}
          pattern="[a-zA-Z0-9_]{3,20}"
          title="3-20 letters, numbers, or underscores"
          className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-zinc-500 focus:outline-none transition-colors"
          placeholder="e.g. kurdish_reader"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Short Bio (Max 12 words)</label>
        <textarea 
          name="bio" 
          defaultValue={initialBio || ""}
          rows={3}
          className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-zinc-500 focus:outline-none transition-colors resize-none"
          placeholder="Preserving Kurdish history..."
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-zinc-100 text-zinc-900 font-medium py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {initialUsername ? "Save Changes" : "Complete Profile"}
      </button>
    </form>
  );
}
