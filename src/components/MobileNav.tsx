import Link from "next/link";
import { Home, Search, LayoutList, Users } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-[#121212]/95 backdrop-blur-md border-t border-zinc-800 z-50 flex items-center justify-around h-16 px-2 text-zinc-400">
      <Link href="/" className="flex flex-col items-center gap-1 hover:text-zinc-100 transition-colors">
        <Home size={20} />
        <span className="text-[10px] font-medium uppercase tracking-widest">Home</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-1 hover:text-zinc-100 transition-colors">
        <Search size={20} />
        <span className="text-[10px] font-medium uppercase tracking-widest">Search</span>
      </Link>
      <Link href="/feed" className="flex flex-col items-center gap-1 hover:text-zinc-100 transition-colors">
        <LayoutList size={20} />
        <span className="text-[10px] font-medium uppercase tracking-widest">Feed</span>
      </Link>
      <Link href="/authors" className="flex flex-col items-center gap-1 hover:text-zinc-100 transition-colors">
        <Users size={20} />
        <span className="text-[10px] font-medium uppercase tracking-widest">Authors</span>
      </Link>
    </nav>
  );
}
