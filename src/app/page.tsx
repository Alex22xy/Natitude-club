"use client";

import Image from 'next/image';

export default function WildPage() {
  return (
    <main className="locked-screen h-[100dvh] w-full bg-black relative flex items-center justify-center overflow-hidden">
      
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          style={{ filter: 'brightness(0.4) contrast(1.2)' }} // Slightly darker to let logo shine
        >
          <source src="/jungle.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" /> {/* Extra dim layer */}
      </div>

      {/* CENTERED BRANDING - Increased size and brightness */}
      <div className="relative z-20 w-full max-w-[90vw] md:max-w-[650px] px-6 flex flex-col items-center">
        <div className="w-full transition-all duration-1000 ease-out hover:scale-[1.03]">
          <Image
            src="/logo.svg"
            alt="NATITUDE"
            width={1000} // Increased base size
            height={333}
            priority
            className="w-full h-auto drop-shadow-[0_0_40px_rgba(255,0,255,0.3)]" // Brighter pink glow
          />
        </div>
        
        <div className="mt-10 space-y-3 text-center">
          <p className="text-[11px] md:text-[13px] uppercase tracking-[0.8em] text-white font-medium drop-shadow-md">
            Bury St Edmunds
          </p>
          <div className="h-[1px] w-20 bg-natitude-pink mx-auto mt-4 shadow-[0_0_10px_#ff00ff]" />
          <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-300 pt-2 font-light">
            Sonic Sanctuary
          </p>
        </div>
      </div>

      {/* PERSISTENT SYSTEM INFO */}
      <div className="absolute bottom-36 left-0 w-full text-center z-20">
         <p className="text-[8px] text-zinc-400 uppercase tracking-[0.6em] font-medium">
          Est. MMXXIV
        </p>
      </div>

    </main>
  );
}