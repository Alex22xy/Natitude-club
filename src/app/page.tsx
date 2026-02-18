// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-natitude-pink selection:text-black">
      <div className="max-w-5xl mx-auto">
        
        {/* The Moody Jungle Hero Section */}
        <header className="relative h-[85vh] md:h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* 1. The Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 z-0 w-full h-full object-cover opacity-50"
          >
            <source src="/jungle.mp4" type="video/mp4" />
          </video>

          {/* 2. Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10" />

          {/* 3. Your Transparent SVG Logo - Scaled Up */}
          <div className="relative z-20 w-64 md:w-[32rem] px-4 transition-all duration-700">
            <img 
              src="/logo.svg" 
              alt="Natitude Logo" 
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,0,255,0.35)]"
            />
          </div>

          {/* 4. The Subtitle - Larger & More Spaced */}
          <p className="relative z-20 text-gray-300 mt-10 uppercase tracking-[0.4em] md:tracking-[0.7em] text-[10px] md:text-[14px] animate-pulse px-6 text-center leading-loose">
            Home of underground jungle culture
          </p>
        </header>

        {/* Brand Statement / Intro Section */}
        <section className="px-6 py-20 text-center space-y-8 relative z-20">
          <div className="h-[1px] w-12 bg-natitude-pink mx-auto mb-10 opacity-50" />
          <h2 className="text-xs md:text-sm uppercase tracking-[0.6em] text-white/80 leading-relaxed max-w-lg mx-auto">
            A sanctuary for the rhythmically possessed. 
            Lost in the smoke, found in the bass.
          </h2>
          <div className="h-[1px] w-12 bg-natitude-pink mx-auto mt-10 opacity-50" />
        </section>

        {/* Footer info */}
        <footer className="mt-20 pb-40 text-center text-gray-800 text-[8px] uppercase tracking-widest">
          est. 2024 — limited capacity — london
        </footer>
      </div>
    </main>
  );
}