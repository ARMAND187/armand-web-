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
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 md:p-8 font-sans text-white overflow-x-hidden">
      <h1 className="text-xl md:text-3xl font-bold mb-6 md:mb-12 text-zinc-500 tracking-[0.2em] md:tracking-[0.3em] uppercase text-center">
        The Kawoz TV
      </h1>
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-5xl xl:max-w-6xl">
        
        {/* TV Set */}
        <div className="relative w-full lg:max-w-2xl xl:max-w-3xl aspect-video bg-zinc-900 rounded-2xl md:rounded-[2rem] p-2 md:p-4 border-4 md:border-[8px] border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.9)] md:shadow-[0_0_80px_rgba(0,0,0,0.9)] shadow-black flex items-center justify-center transition-all duration-300 lg:hover:scale-[1.01]">
          {/* Brand logo space */}
          <div className="absolute bottom-0.5 md:bottom-1 w-full text-center text-[8px] md:text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Vision</div>
          
          {/* Screen */}
          <div className={`relative w-full h-full rounded-lg md:rounded-xl overflow-hidden bg-black transition-all duration-700 ${isPowerOn ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)] md:shadow-[0_0_40px_rgba(255,255,255,0.15)]' : 'brightness-0'}`}>
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
        <div className="bg-zinc-800 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-2xl border-2 border-zinc-700 flex flex-col items-center gap-6 md:gap-8 w-full max-w-[280px] lg:w-[220px] shrink-0">
          <div className="w-8 md:w-10 h-2 md:h-3 bg-zinc-900 rounded-full mb-1 md:mb-2 shadow-inner shadow-black/50"></div> {/* Remote IR sensor */}
          
          {/* Power Button */}
          <button 
            onClick={togglePower}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${isPowerOn ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-red-900 text-red-400 border border-red-800'}`}
          >
            <Power size={24} />
          </button>

          {/* Next/Prev Buttons */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
            <button onClick={prevImage} className="bg-zinc-700 hover:bg-zinc-600 p-4 md:p-5 rounded-2xl flex justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 active:shadow-inner transition-all border border-zinc-600 text-zinc-300">
              <SkipBack size={20} className="md:w-6 md:h-6" />
            </button>
            <button onClick={nextImage} className="bg-zinc-700 hover:bg-zinc-600 p-4 md:p-5 rounded-2xl flex justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 active:shadow-inner transition-all border border-zinc-600 text-zinc-300">
              <SkipForward size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          {/* Play/Pause Button */}
          <button 
            onClick={togglePlay} 
            className="w-full bg-zinc-700 hover:bg-zinc-600 py-5 md:py-6 rounded-2xl flex justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 active:shadow-inner transition-all border border-zinc-600 text-zinc-300"
          >
            {isPlaying ? <Pause size={28} className="md:w-8 md:h-8" /> : <Play size={28} className="md:w-8 md:h-8" />}
          </button>
          
          {/* Remote Label */}
          <div className="mt-2 md:mt-6 text-[10px] md:text-xs text-zinc-500 font-bold tracking-[0.2em] text-center uppercase">
            Controller
          </div>
        </div>

      </div>
    </main>
  );
}
