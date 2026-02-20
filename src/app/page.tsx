"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function WildPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      
      {/* 1. HERO VIDEO SECTION */}
      <section className="relative w-screen h-[70vh] md:h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{ filter: 'brightness(0.6)' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-10" />

        {/* Balanced Centered Logo */}
        <div className="relative z-20 w-full max-w-[80vw] md:max-w-[50vw] lg:max-w-[800px] px-6">
          <div className="transition-all duration-1000 ease-out hover:scale-[1.02] hover:brightness-110">
            <Image
              src="/logo.svg"
              alt="NATITUDE"
              width={800}
              height={266}
              priority
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,0,255,0.15)]"
            />
          </div>
          
          <p className="text-center mt-8 text-[9px] md:text-xs uppercase tracking-[0.6em] text-white/50 animate-pulse font-light">
            Bury St Edmunds &bull; Sanctuary
          </p>
        </div>
      </section>

      {/* 2. FOOTER INFO */}
      <footer className="py-12 text-center border-t border-white/5">
        <p className="text-[9px] text-zinc-700 uppercase tracking-[0.5em]">
          Natitude Sanctuary | Bury St Edmunds
        </p>
      </footer>

    </main>
  );
}