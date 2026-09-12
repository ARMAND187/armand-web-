import { getPendingSubmissions } from "@/lib/submissions/actions";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Moderation Queue | Kurdish Digital Archive",
  robots: { index: false, follow: false },
};

export default async function AdminSubmissionsPage() {
  const { data: submissions, error } = await getPendingSubmissions();

  if (error || !submissions) {
    return (
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-20 w-full flex-1 text-center">
        <ShieldAlert size={48} className="mx-auto text-red-500 mb-6" />
        <h1 className="text-2xl font-serif text-zinc-100 mb-4">Access Denied</h1>
        <p className="text-zinc-400">
          You must be logged in as a Reviewer, Editor, or Admin to access the moderation dashboard.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      <header className="mb-12 border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-zinc-100 mb-2">Moderation Queue</h1>
          <p className="text-zinc-400">Review pending community submissions before publication.</p>
        </div>
        <div className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">
          <span className="text-zinc-300 font-bold">{submissions.length}</span> <span className="text-zinc-500 text-sm uppercase tracking-widest">Pending</span>
        </div>
      </header>

      {submissions.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/20 border border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 text-lg">The moderation queue is currently empty. Great job!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {submissions.map((sub: any) => (
            <Link 
              key={sub.id} 
              href={`/admin/submissions/${sub.id}`} 
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl hover:border-zinc-500 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                    {sub.submission_type}
                  </span>
                  <span className="text-zinc-500 text-sm">{new Date(sub.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className="text-zinc-100 font-serif text-xl line-clamp-1">{sub.text_kurdish || sub.title_kurdish || "No Title"}</h3>
              </div>
              <div className="text-right">
                <span className="text-zinc-500 text-sm">Review &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
