"use client";

import Image from 'next/image';

export default function WildPage() {
  return (
    /* h-[100dvh] + locked-screen prevents the mobile 'wiggle' and URL bar issues */
    <main className="locked-screen h-[100dvh] w-full bg-black relative flex items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND VIDEO - Now fills the 100dvh container perfectly */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          style={{ filter: 'brightness(0.5) contrast(1.1)' }}
        >
          <source src="/jungle.mp4" type="video/mp4" />
        </video>
        
        {/* Cinematic Vignette: Darkens edges to focus on the logo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      {/* 2. CENTERED BRANDING */}
      <div className="relative z-20 w-full max-w-[85vw] md:max-w-[500px] px-6 flex flex-col items-center">
        <div className="w-full transition-all duration-1000 ease-out active:scale-95">
          <Image
            src="/logo.svg"
            alt="NATITUDE"
            width={800}
            height={266}
            priority
            className="w-full h-auto drop-shadow-[0_0_25px_rgba(255,0,255,0.2)]"
          />
        </div>
        
        <div className="mt-8 space-y-2 text-center">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.8em] text-white/60 font-light">
            Bury St Edmunds
          </p>
          <div className="h-[1px] w-12 bg-natitude-pink/30 mx-auto mt-4" />
          <p className="text-[7px] uppercase tracking-[0.4em] text-zinc-500 pt-2">
            Sonic Sanctuary
          </p>
        </div>
      </div>

      {/* 3. PERSISTENT SYSTEM INFO (Replaces the chunky footer) */}
      <div className="absolute bottom-32 left-0 w-full text-center z-20">
         <p className="text-[7px] text-zinc-600 uppercase tracking-[0.6em]">
          Est. MMXXIV
        </p>
      </div>

    </main>
  );
}