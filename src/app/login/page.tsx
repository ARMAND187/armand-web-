"use client";

import { useState } from "react";
import { login, signup } from "./actions";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const action = isLogin ? login : signup;
    const result = await action(formData);
    
    // Only hit this if there's an error, because success redirects
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto px-4 py-20 w-full flex-1 flex flex-col justify-center">
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 md:p-10">
        <h1 className="text-3xl font-serif text-zinc-100 mb-2 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-zinc-500 text-sm text-center mb-8">
          {isLogin ? "Sign in to manage your profile." : "Join the archive to contribute."}
        </p>

        <form action={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/20 text-red-400 border border-red-900/50 p-3 rounded-xl text-sm text-center">
              {error}
              {!isLogin && error.includes("Email rate limit") && (
                <span className="block mt-1 text-xs opacity-75">
                  Tip: On Supabase free tier, you may need to wait an hour, or the developer can disable "Confirm email" in Supabase Auth settings.
                </span>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-zinc-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              minLength={6}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:border-zinc-500 focus:outline-none transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-zinc-100 text-zinc-900 font-medium py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </main>
  );
}
