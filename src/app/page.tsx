import { ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-white/30">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full flex justify-center items-center py-4 bg-black/70 backdrop-blur-md z-50 border-b border-white/10">
        <div className="flex gap-8 text-xs font-medium text-gray-300 tracking-wide">
          <a href="#" className="hover:text-white transition-colors">Vision</a>
          <a href="#" className="hover:text-white transition-colors">Mac</a>
          <a href="#" className="hover:text-white transition-colors">iPad</a>
          <a href="#" className="hover:text-white transition-colors">iPhone</a>
          <a href="#" className="hover:text-white transition-colors">Watch</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-4 pt-16">
        <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">
          Introducing
        </h2>
        <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Visionary.
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light mb-10">
          The most advanced experience we have ever created. Now in your hands.
        </p>
        <div className="flex gap-6 items-center">
          <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-transform hover:scale-105">
            Buy
          </button>
          <a href="#" className="text-white hover:underline flex items-center gap-1 text-lg group">
            Learn more <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-4">
          Pro performance.
        </h1>
        <p className="text-xl text-gray-400 max-w-xl font-light mb-12">
          A chip so fast, it feels like the future.
        </p>
        <div className="w-full max-w-4xl h-96 bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <span className="text-gray-500 font-light z-20">Your Product Image Here</span>
          {/* Subtle glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
      </section>

      {/* Grid Features Section */}
      <section className="min-h-screen bg-black py-24 px-8 flex justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-zinc-900 rounded-3xl p-10 flex flex-col justify-between h-[500px] border border-white/5 hover:border-white/10 transition-colors">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight mb-2">Incredible design.</h3>
              <p className="text-gray-400 font-light">Crafted from aerospace-grade titanium.</p>
            </div>
            <div className="w-full flex-1 mt-8 bg-black/50 rounded-2xl border border-white/5 flex items-center justify-center">
               <span className="text-gray-600 text-sm">Image / Graphic</span>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-10 flex flex-col justify-between h-[500px] border border-white/5 hover:border-white/10 transition-colors">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight mb-2">All-day battery.</h3>
              <p className="text-gray-400 font-light">Power that keeps up with you.</p>
            </div>
            <div className="w-full flex-1 mt-8 bg-black/50 rounded-2xl border border-white/5 flex items-center justify-center">
               <span className="text-gray-600 text-sm">Image / Graphic</span>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
