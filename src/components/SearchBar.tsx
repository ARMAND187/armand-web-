"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ placeholder = "Search poets, poems, quotes, words...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`w-full relative ${className}`}>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder} 
        className="w-full bg-zinc-900/50 border border-zinc-700 text-zinc-100 rounded-full py-2.5 md:py-4 pl-6 pr-12 focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all placeholder:text-zinc-500 shadow-xl text-sm md:text-lg"
      />
      <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-100 transition-colors">
        <SearchIcon size={20} />
      </button>
    </form>
  );
}
