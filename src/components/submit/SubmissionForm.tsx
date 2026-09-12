"use client";

import { useState } from "react";
import { submitContribution } from "@/lib/submissions/actions";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function SubmissionForm() {
  const [type, setType] = useState("quote");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.set("submission_type", type);
    
    const result = await submitContribution(formData);
    
    if (result.success) {
      setSuccessMsg(result.message || "Submitted successfully.");
      (e.target as HTMLFormElement).reset();
    } else {
      setErrorMsg(result.error || "An error occurred.");
    }
    setLoading(false);
  };

  if (successMsg) {
    return (
      <div className="bg-zinc-900/30 border border-emerald-900/50 p-8 md:p-12 rounded-3xl text-center">
        <CheckCircle className="mx-auto text-emerald-500 mb-6" size={48} />
        <h2 className="text-2xl font-serif text-zinc-100 mb-4">Submission Received</h2>
        <p className="text-zinc-400 leading-relaxed max-w-lg mx-auto">{successMsg}</p>
        <button onClick={() => setSuccessMsg("")} className="mt-8 px-6 py-2 bg-zinc-800 text-zinc-300 rounded-full hover:bg-zinc-700 transition-colors">
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900/30 border border-zinc-800 p-6 md:p-12 rounded-3xl space-y-8 relative">
      
      {errorMsg && (
        <div className="flex items-center gap-3 bg-red-950/20 text-red-400 p-4 rounded-xl border border-red-900/30">
          <AlertCircle size={20} />
          <p className="text-sm">{errorMsg}</p>
        </div>
      )}

      {/* Honeypot for Anti-Spam */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {/* Type Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">I want to submit a...</label>
        <div className="flex flex-wrap gap-3">
          {['quote', 'poem', 'proverb', 'word', 'correction'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors capitalize ${
                type === t 
                ? 'bg-zinc-100 text-zinc-950 shadow-md' 
                : 'bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {type === 'poem' && (
        <div className="bg-amber-950/20 border border-amber-900/50 p-4 rounded-xl text-amber-500/80 text-sm leading-relaxed">
          <strong>Copyright Notice:</strong> Please do not submit full texts of modern copyrighted poems without explicit permission. For modern works, submit an excerpt, summary, or metadata instead.
        </div>
      )}

      {/* Core Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Kurdish Text *</label>
          <textarea 
            name="text_kurdish" 
            required 
            rows={4} 
            dir="rtl"
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-zinc-200 font-arabic focus:border-zinc-500 focus:outline-none"
            placeholder="دەقی کوردی لێرە بنووسە..."
          ></textarea>
        </div>
        
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">English Translation</label>
          <textarea 
            name="text_english" 
            rows={4} 
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-zinc-200 font-serif focus:border-zinc-500 focus:outline-none"
            placeholder="Optional English translation..."
          ></textarea>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Author</label>
          <input 
            type="text" 
            name="author_name" 
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-zinc-200 focus:border-zinc-500 focus:outline-none"
            placeholder="e.g. Nalî, Mahwî, or Unknown"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Category</label>
          <input 
            type="text" 
            name="category" 
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-zinc-200 focus:border-zinc-500 focus:outline-none"
            placeholder="e.g. Love, Philosophy, Motivation"
          />
        </div>
      </div>

      {/* Evidence & Context */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Source / Evidence *</label>
        <p className="text-xs text-zinc-600 mb-2">Provide a book title, academic source, URL, or historical context to help us verify this submission.</p>
        <textarea 
          name="context" 
          required
          rows={3} 
          className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-zinc-200 focus:border-zinc-500 focus:outline-none"
          placeholder="Where did you find this? Why is this correct?"
        ></textarea>
      </div>

      {/* Submitter Info */}
      <div className="pt-6 border-t border-zinc-800/50 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Your Name (Optional)</label>
          <input 
            type="text" 
            name="submitter_name" 
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-zinc-200 focus:border-zinc-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Your Email (Optional)</label>
          <input 
            type="email" 
            name="submitter_email" 
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-zinc-200 focus:border-zinc-500 focus:outline-none"
            placeholder="For follow-up questions"
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full md:w-auto px-8 py-4 bg-zinc-100 text-zinc-950 font-bold tracking-wide uppercase rounded-full hover:bg-white transition-colors disabled:opacity-50 flex justify-center items-center gap-3"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        Submit for Review
      </button>

    </form>
  );
}
