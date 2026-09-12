"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ fallbackText = "Go Back" }: { fallbackText?: string }) {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium uppercase tracking-widest flex items-center gap-2 mb-12"
      aria-label="Go back"
    >
      <ArrowLeft size={16} /> {fallbackText}
    </button>
  );
}
