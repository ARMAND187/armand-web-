"use client";

import { useRef, useState } from "react";
import { Copy, Download, Share2, ExternalLink, CheckCircle, HelpCircle, AlertTriangle, Check } from "lucide-react";
import * as htmlToImage from 'html-to-image';
import Link from "next/link";

interface FeedCardProps {
  work: any;
}

export default function FeedCard({ work }: FeedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const authorName = work.authors?.name_english || "Unknown Author";
  
  // Handlers
  const handleCopy = async (type: 'kurdish' | 'english' | 'both') => {
    let textToCopy = "";
    if (type === 'kurdish') textToCopy = work.text_kurdish;
    if (type === 'english') textToCopy = work.text_english || work.text_kurdish;
    if (type === 'both') {
      textToCopy = `${work.text_kurdish}\n\n${work.text_english || ''}\n— ${authorName}`.trim();
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/${work.type === 'poem' ? 'poetry' : 'quotes'}/${work.type === 'poem' ? work.authors?.slug + '/' : ''}${work.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kurdish Digital Archive',
          text: work.text_english || work.text_kurdish,
          url: url,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(url);
      setCopied('link');
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      // Temporarily add a watermark for the image
      const watermark = document.createElement('div');
      watermark.innerHTML = 'Kurdish Digital Archive';
      watermark.style.position = 'absolute';
      watermark.style.bottom = '16px';
      watermark.style.right = '24px';
      watermark.style.fontSize = '12px';
      watermark.style.color = '#71717a'; // zinc-500
      watermark.style.fontFamily = 'serif';
      
      cardRef.current.appendChild(watermark);
      cardRef.current.style.borderRadius = '0px'; // Flat for image
      
      const dataUrl = await htmlToImage.toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      
      // Cleanup DOM modifications
      cardRef.current.removeChild(watermark);
      cardRef.current.style.borderRadius = '1.5rem';

      const link = document.createElement('a');
      link.download = `archive-${work.slug}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };

  // Determine atmospheric accent based on ID (deterministic pseudorandom color hint)
  const getAccent = () => {
    if (!work.id) return "from-zinc-900 to-[#121212]";
    const char = work.id.charAt(0).toLowerCase();
    if (['a','b','c','0','1'].includes(char)) return "from-zinc-900 via-rose-950/10 to-[#121212]";
    if (['d','e','f','2','3'].includes(char)) return "from-zinc-900 via-amber-950/10 to-[#121212]";
    if (['g','h','i','4','5'].includes(char)) return "from-zinc-900 via-blue-950/10 to-[#121212]";
    return "from-zinc-900 to-[#121212]";
  };

  return (
    <article className="w-full max-w-2xl mx-auto flex flex-col mb-12">
      {/* The Downloadable Card Content */}
      <div 
        ref={cardRef} 
        className={`bg-gradient-to-br ${getAccent()} border border-zinc-800 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[300px]`}
      >
        <p className="text-2xl md:text-4xl text-zinc-100 leading-loose md:leading-loose text-center font-arabic mb-8" dir="rtl">
          {work.text_kurdish}
        </p>

        {work.text_english && (
          <p className="text-lg md:text-xl text-zinc-400 font-serif italic text-center leading-relaxed mb-8">
            {work.text_english}
          </p>
        )}

        <div className="mt-auto pt-6 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-zinc-300 font-serif md:text-lg">— {authorName}</span>
            {work.attribution_status === 'Verified' && <span title="Verified Attribution"><CheckCircle size={14} className="text-zinc-600" /></span>}
            {work.attribution_status === 'Unknown' && <span title="Unknown Attribution"><HelpCircle size={14} className="text-zinc-600" /></span>}
            {work.attribution_status === 'Disputed' && <span title="Disputed Attribution"><AlertTriangle size={14} className="text-amber-600/50" /></span>}
          </div>
          {work.category && (
            <span className="text-xs uppercase tracking-widest font-semibold text-zinc-600">
              {work.category}
            </span>
          )}
        </div>
      </div>

      {/* Feed Actions Bar (Not downloaded in image) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 px-4">
        
        <div className="flex items-center gap-2 md:gap-4">
          {/* Copy Actions Group */}
          <div className="flex bg-zinc-900 rounded-full p-1 border border-zinc-800">
            <button onClick={() => handleCopy('kurdish')} className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors flex items-center gap-2">
              {copied === 'kurdish' ? <Check size={14}/> : <Copy size={14} />} KU
            </button>
            {work.text_english && (
              <button onClick={() => handleCopy('english')} className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors flex items-center gap-2">
                {copied === 'english' ? <Check size={14}/> : <Copy size={14} />} EN
              </button>
            )}
            <button onClick={() => handleCopy('both')} className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors flex items-center gap-2">
              {copied === 'both' ? <Check size={14}/> : <Copy size={14} />} ALL
            </button>
          </div>

          <button onClick={handleShare} className="p-2.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-100 hover:bg-zinc-800 transition-colors" title="Share" aria-label="Share">
            {copied === 'link' ? <Check size={16}/> : <Share2 size={16} />}
          </button>

          <button onClick={handleDownload} className="p-2.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-100 hover:bg-zinc-800 transition-colors" title="Download Image" aria-label="Download Image">
            <Download size={16} />
          </button>
        </div>

        <Link 
          href={`/${work.type === 'poem' ? 'poetry' : 'quotes'}/${work.type === 'poem' ? work.authors?.slug + '/' : ''}${work.slug}`} 
          className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1 text-sm font-medium"
        >
          Open <ExternalLink size={14} />
        </Link>
      </div>
    </article>
  );
}
