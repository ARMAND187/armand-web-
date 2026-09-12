import { createClient } from "@/utils/supabase/server";
import { reviewSubmission } from "@/lib/submissions/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ReviewSubmissionPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  
  const { data: sub, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !sub) {
    return notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      <Link href="/admin/submissions" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium uppercase tracking-widest flex items-center gap-2 mb-8">
        &larr; Back to Queue
      </Link>
      
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
            {sub.submission_type}
          </span>
          <span className="text-zinc-500 text-sm">Submitted: {new Date(sub.created_at).toLocaleString()}</span>
        </div>

        <div className="space-y-8">
          {sub.text_kurdish && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Kurdish Text</h3>
              <p className="font-arabic text-xl md:text-2xl text-zinc-100 leading-loose whitespace-pre-wrap text-right" dir="rtl">{sub.text_kurdish}</p>
            </div>
          )}
          
          {sub.text_english && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">English Text</h3>
              <p className="font-serif text-lg text-zinc-300 leading-relaxed whitespace-pre-wrap">{sub.text_english}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-800/50">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Claimed Author</h3>
              <p className="text-zinc-300">{sub.author_name || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Category</h3>
              <p className="text-zinc-300">{sub.category || "N/A"}</p>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800/50">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Evidence / Context</h3>
            <p className="text-zinc-300 whitespace-pre-wrap">{sub.context || "No evidence provided."}</p>
          </div>

          <div className="pt-8 border-t border-zinc-800/50 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Submitter</h3>
              <p className="text-zinc-400">{sub.submitter_name || "Anonymous"}</p>
              <p className="text-zinc-500 text-sm">{sub.submitter_email || "No email"}</p>
            </div>
          </div>
        </div>

        {/* Action Form */}
        <form action={async (formData) => {
          "use server";
          const action = formData.get("action") as "approve" | "reject" | "request_info";
          const notes = formData.get("notes") as string;
          await reviewSubmission(sub.id, action, notes);
        }} className="mt-12 pt-8 border-t border-zinc-800 space-y-6">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Reviewer Notes (Internal)</label>
            <textarea name="notes" rows={3} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-zinc-200 focus:border-zinc-500 focus:outline-none" placeholder="Add audit notes..."></textarea>
          </div>

          <div className="flex flex-wrap gap-4">
            <button type="submit" name="action" value="approve" className="px-6 py-3 bg-emerald-900/40 text-emerald-400 border border-emerald-900 rounded-xl hover:bg-emerald-900/60 transition-colors font-medium">
              Approve
            </button>
            <button type="submit" name="action" value="request_info" className="px-6 py-3 bg-amber-900/40 text-amber-400 border border-amber-900 rounded-xl hover:bg-amber-900/60 transition-colors font-medium">
              Needs Info
            </button>
            <button type="submit" name="action" value="reject" className="px-6 py-3 bg-red-900/40 text-red-400 border border-red-900 rounded-xl hover:bg-red-900/60 transition-colors font-medium">
              Reject
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}
