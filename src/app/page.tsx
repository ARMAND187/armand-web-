'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Power } from 'lucide-react';

export default function Home() {
  const images = [
    '/media_1.png',
    '/media_2.jpg'
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPowerOn, setIsPowerOn] = useState(true);

  // 10-second timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isPowerOn) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 10000); // 10000 ms = 10 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPowerOn, images.length]);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const togglePlay = () => setIsPlaying(!isPlaying);
  const togglePower = () => setIsPowerOn(!isPowerOn);

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans text-white">
      <h1 className="text-3xl font-bold mb-12 text-zinc-500 tracking-[0.3em] uppercase">The Kawoz TV</h1>
      
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* TV Set */}
        <div className="relative w-full max-w-4xl aspect-video bg-zinc-900 rounded-[2rem] p-4 border-[8px] border-zinc-800 shadow-[0_0_80px_rgba(0,0,0,0.9)] shadow-black flex items-center justify-center transition-all duration-300 hover:scale-[1.01]">
          {/* Brand logo space */}
          <div className="absolute bottom-1 w-full text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Vision</div>
          
          {/* Screen */}
          <div className={`relative w-full h-full rounded-xl overflow-hidden bg-black transition-all duration-700 ${isPowerOn ? 'shadow-[0_0_40px_rgba(255,255,255,0.15)]' : 'brightness-0'}`}>
            {isPowerOn ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={images[currentIndex]} 
                alt="TV Screen" 
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            ) : (
              <div className="w-full h-full bg-black"></div>
            )}
            
            {/* TV Glare effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Remote Control */}
        <div className="bg-zinc-800 p-8 rounded-[2.5rem] shadow-2xl border-2 border-zinc-700 flex flex-col items-center gap-8 min-w-[200px]">
          <div className="w-10 h-3 bg-zinc-900 rounded-full mb-2 shadow-inner shadow-black/50"></div> {/* Remote IR sensor */}
          
          {/* Power Button */}
          <button 
            onClick={togglePower}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${isPowerOn ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-red-900 text-red-400 border border-red-800'}`}
          >
            <Power size={24} />
          </button>

          {/* Next/Prev Buttons */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <button onClick={prevImage} className="bg-zinc-700 hover:bg-zinc-600 p-5 rounded-2xl flex justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 active:shadow-inner transition-all border border-zinc-600 text-zinc-300">
              <SkipBack size={24} />
            </button>
            <button onClick={nextImage} className="bg-zinc-700 hover:bg-zinc-600 p-5 rounded-2xl flex justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 active:shadow-inner transition-all border border-zinc-600 text-zinc-300">
              <SkipForward size={24} />
            </button>
          </div>

          {/* Play/Pause Button */}
          <button 
            onClick={togglePlay} 
            className="w-full bg-zinc-700 hover:bg-zinc-600 py-6 rounded-2xl flex justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 active:shadow-inner transition-all border border-zinc-600 text-zinc-300"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          
          {/* Remote Label */}
          <div className="mt-6 text-xs text-zinc-500 font-bold tracking-[0.2em] text-center uppercase">
            Controller
          </div>
        </div>

      </div>
    </main>
  );
}
