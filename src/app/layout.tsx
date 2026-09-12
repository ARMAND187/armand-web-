import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { Search, Globe, PlusSquare } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import MobileNav from "@/components/MobileNav";
import UserNavIcon from "@/components/profile/UserNavIcon";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Kurdish Digital Archive",
  description: "Discover the words, poetry, and voices of Kurdish culture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#121212] text-zinc-300 font-sans selection:bg-zinc-700">
        
        {/* Main Navigation */}
        <nav className="w-full border-b border-zinc-800 bg-[#121212]/95 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            
            {/* Logo / Brand */}
            <Link href="/" className="font-serif text-lg font-semibold text-zinc-100 tracking-wide">
              Kurdish Digital Archive
            </Link>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-zinc-400">
              <Link href="/authors" className="hover:text-zinc-100 transition-colors">Authors</Link>
              <Link href="/poetry" className="hover:text-zinc-100 transition-colors">Poetry</Link>
              <Link href="/words" className="hover:text-zinc-100 transition-colors">Dictionary</Link>
              <Link href="/feed" className="hover:text-zinc-100 transition-colors text-zinc-200">Feed</Link>
            </div>

            {/* Utilities */}
            <div className="flex items-center gap-4 text-zinc-400">
              <div className="hidden lg:block w-64">
                <SearchBar placeholder="Search archive..." className="!text-sm" />
              </div>
              <Link href="/search" className="lg:hidden hover:text-zinc-100 transition-colors" title="Search" aria-label="Search">
                <Search size={18} />
              </Link>
              <button className="hover:text-zinc-100 transition-colors" title="Language: EN/KU" aria-label="Toggle Language"><Globe size={18} /></button>
              <Link href="/submit" className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-100 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-md transition-colors" title="Submit a work" aria-label="Submit a work">
                <PlusSquare size={14} /> Submit
              </Link>
              <UserNavIcon />
            </div>
            
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col w-full pb-16 md:pb-0">
          {children}
        </div>
        
        {/* Simple Footer */}
        <footer className="hidden md:block border-t border-zinc-900 py-8 text-center text-xs text-zinc-600 mt-auto">
          <p>Preserve → Explain → Verify → Discover → Share</p>
        </footer>

        <MobileNav />
      </body>
    </html>
  );
}
