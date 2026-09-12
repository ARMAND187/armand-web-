import Link from "next/link";
import { Home, Library, Search, PenLine } from "lucide-react";
import UserNavIcon from "./profile/UserNavIcon";

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#121212]/95 backdrop-blur-md border-t border-zinc-800 z-50 pb-safe">
      <div className="flex items-center justify-around py-3 px-2">
        <Link href="/" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-100 transition-colors">
          <Home size={24} />
          <span className="text-[10px] font-medium uppercase tracking-widest">Home</span>
        </Link>
        <Link href="/authors" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-100 transition-colors">
          <Library size={24} />
          <span className="text-[10px] font-medium uppercase tracking-widest">Archive</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-100 transition-colors">
          <Search size={24} />
          <span className="text-[10px] font-medium uppercase tracking-widest">Search</span>
        </Link>
        <Link href="/submit" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-100 transition-colors">
          <PenLine size={24} />
          <span className="text-[10px] font-medium uppercase tracking-widest">Submit</span>
        </Link>
        <UserNavIcon mobile={true} />
      </div>
    </nav>
  );
}
