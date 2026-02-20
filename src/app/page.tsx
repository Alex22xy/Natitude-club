"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function WildPage() {
  const [isJoining, setIsJoining] = useState(false);
  const [email, setEmail] = useState("");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to push to Supabase 'members' table
    console.log("Signal Registered:", email);
  };

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
    
      {/* PERSISTENT SYSTEM INFO */}
      <div className="absolute bottom-36 left-0 w-full text-center z-20">
         <p className="text-[8px] text-zinc-400 uppercase tracking-[0.6em] font-medium">
          Est. MMXXIV
        </p>
      </div>

      <div className="relative z-20 w-full max-w-[90vw] md:max-w-[650px] px-6 flex flex-col items-center">
        {!isJoining ? (
          /* STATE 1: THE HERO LOGO */
          <div className="flex flex-col items-center animate-in fade-in duration-1000">
            <div className="w-full transition-all duration-1000 ease-out active:scale-95">
              <Image src="/logo.svg" alt="NATITUDE" width={800} height={266} priority className="w-full h-auto drop-shadow-[0_0_25px_rgba(255,0,255,0.2)]" />
            </div>
            
            <button 
              onClick={() => setIsJoining(true)}
              className="mt-12 text-[8px] uppercase tracking-[0.6em] text-natitude-pink border border-natitude-pink/30 px-6 py-2 hover:bg-natitude-pink hover:text-white transition-all duration-500"
            >
              Join the Tribe
            </button>
          </div>
        ) : (
          /* STATE 2: THE SIGNAL INPUT */
          <form onSubmit={handleJoin} className="w-full max-w-[400px] space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-2">
              <h2 className="text-white text-[10px] uppercase tracking-[0.8em]">Register Signal</h2>
              <p className="text-zinc-500 text-[7px] uppercase tracking-[0.3em]">Enter your digital path to claim your ID</p>
            </div>
            
            <input 
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL@DOMAIN.COM"
              className="w-full bg-transparent border-b border-natitude-pink/50 py-4 text-center outline-none text-white text-[11px] uppercase tracking-[0.4em] focus:border-natitude-pink transition-all"
            />
            
            <div className="flex justify-center gap-8">
              <button type="submit" className="text-[8px] uppercase tracking-[0.4em] text-white hover:text-natitude-pink transition-colors">Confirm</button>
              <button type="button" onClick={() => setIsJoining(false)} className="text-[8px] uppercase tracking-[0.4em] text-zinc-600 hover:text-white transition-colors">Cancel</button>
            </div>
          </form>
        )}
          <div className="relative z-20 w-full max-w-[90vw] md:max-w-[650px] px-6 flex flex-col items-center">
        
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
      </div>
    </main>
  );
}