export default function AdvicePage() {
  const advices = [
    { 
      id: 1, 
      quote: "Always play Barbie Girl at max volume. If your neighbors complain, they simply have no taste.", 
      author: "Kawoz" 
    },
    { 
      id: 2, 
      quote: "If someone tells you a secret, immediately tell Israel. Better safe than sorry. (Just kidding)", 
      author: "Kawoz" 
    },
    { 
      id: 3, 
      quote: "Never trust anyone who doesn't like playing chess. They are probably hiding something.", 
      author: "Kawoz" 
    },
    { 
      id: 4, 
      quote: "Pro tip: If you turn the TV on and off enough times, it eventually fixes all of your life problems.", 
      author: "Kawoz" 
    },
    {
      id: 5,
      quote: "When in doubt, just copy the message ID and report it. Justice never sleeps.",
      author: "Kawoz"
    },
    {
      id: 6,
      quote: "My business ideas are perfect. The world just isn't ready for them yet.",
      author: "Kawoz"
    }
  ];

  return (
    <main className="flex-1 flex flex-col items-center p-6 md:p-12 font-sans overflow-x-hidden w-full max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-widest uppercase text-center mt-8">
        Kawoz Advice
      </h1>
      <p className="text-zinc-400 mb-12 text-center text-sm md:text-base tracking-wide">
        Life lessons, business strategies, and comedy gold straight from the source.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {advices.map((advice) => (
          <div 
            key={advice.id} 
            className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-zinc-600 transition-colors shadow-lg flex flex-col justify-between group"
          >
            <p className="text-lg md:text-xl font-medium text-zinc-200 leading-relaxed italic">
              "{advice.quote}"
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-xs text-zinc-300">
                K
              </div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">
                {advice.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
