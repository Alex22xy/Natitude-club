"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function WildPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      
      {/* 1. HERO VIDEO CONTAINER - FULL WIDTH */}
      <section className="relative w-screen h-[60vh] md:h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* 2. MASSIVE LOGO - SCALES WITH SCREEN */}
        <div className="relative z-20 w-full px-6 flex flex-col items-center">
          <div className="w-[80%] md:w-[70%] lg:w-[60%] max-w-[1200px] transition-all duration-700 hover:scale-105">
            <Image
              src="/logo.png"
              alt="NATITUDE"
              width={1200}
              height={400}
              priority
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,0,255,0.3)]"
            />
          </div>
          
          {/* Subtitle */}
          <p className="mt-8 text-[10px] md:text-xs uppercase tracking-[0.8em] text-white/80 animate-pulse">
            Lost in the smoke, found in the bass
          </p>
        </div>
      </section>

      {/* 3. NAVIGATION SECTION */}
      <section className="relative z-30 py-24 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Link href="/rituals" className="group relative overflow-hidden border border-white/5 bg-zinc-900/20 p-12 text-center transition-all hover:border-natitude-pink/50">
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.3em] group-hover:text-natitude-pink transition-colors">Rituals</h2>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-500">View Events & Secure Entry</p>
          </Link>

          <Link href="/hire" className="group relative overflow-hidden border border-white/5 bg-zinc-900/20 p-12 text-center transition-all hover:border-natitude-pink/50">
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.3em] group-hover:text-natitude-pink transition-colors">Hire</h2>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-500">Private Sanctuaries & Bookings</p>
          </Link>

        </div>
      </section>

      {/* 4. FOOTER INFO */}
      <footer className="py-12 text-center border-t border-white/5">
        <p className="text-[9px] text-zinc-700 uppercase tracking-[0.5em]">
          Natitude Sanctuary | Bury St Edmunds
        </p>
      </footer>
    </main>
  );
}