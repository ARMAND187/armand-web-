import { getProfile, getProfileContributions } from "@/lib/profile/actions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { User2 } from "lucide-react";
import ContributionList from "@/components/profile/ContributionList";

type Props = {
  params: Promise<{ username: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `${params.username} | Kurdish Digital Archive Profile`,
  };
}

export default async function ProfilePage(props: Props) {
  const params = await props.params;
  const profile = await getProfile(params.username);
  
  if (!profile) {
    return notFound();
  }

  // Fetch initial paginated contributions
  const { data: contributions, hasMore, totalCount } = await getProfileContributions(profile.user_id, 1);

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex-1">
      
      {/* Profile Header */}
      <header className="flex flex-col items-center text-center mb-16 pb-12 border-b border-zinc-800">
        <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-6">
          <User2 size={40} className="text-zinc-600" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-serif text-zinc-100 mb-2">@{profile.username}</h1>
        {profile.bio && (
          <p className="text-zinc-400 mt-4 max-w-md mx-auto leading-relaxed text-sm">
            {profile.bio}
          </p>
        )}
      </header>

      {/* Contributions Section */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-xl font-serif text-zinc-200">Contributions</h2>
          <span className="text-zinc-500 text-sm">{totalCount} Approved</span>
        </div>

        <ContributionList 
          userId={profile.user_id} 
          initialContributions={contributions} 
          initialHasMore={hasMore} 
        />
      </section>

    </main>
  );
}
