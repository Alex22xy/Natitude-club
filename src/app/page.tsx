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
      
      {/* 1. BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          style={{ filter: 'brightness(0.35) contrast(1.2)' }} 
        >
          <source src="/jungle.mp4" type="video/mp4" />
        </video>
        {/* Deeper vignette for better text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-60" />
      </div>

      {/* 2. PERSISTENT SYSTEM INFO (Bottom) */}
      <div className="absolute bottom-36 left-0 w-full text-center z-20">
         <p className="text-[8px] text-zinc-500 uppercase tracking-[0.6em] font-medium">
          Est. MMXXIV
        </p>
      </div>

      {/* 3. MAIN INTERACTION AREA */}
      <div className="relative z-20 w-full max-w-[90vw] md:max-w-[650px] px-6 flex flex-col items-center">
        
        <div className="w-full min-h-[200px] flex items-center justify-center">
          {!isJoining ? (
            /* STATE 1: THE HERO LOGO */
            <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
              <div className="w-full transition-all duration-1000 ease-out active:scale-95">
                <Image 
                  src="/logo.svg" 
                  alt="NATITUDE" 
                  width={1000} 
                  height={333} 
                  priority 
                  className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,0,255,0.25)]" 
                />
              </div>
              
              <button 
                onClick={() => setIsJoining(true)}
                className="mt-12 text-[9px] uppercase tracking-[0.6em] text-white border border-white/20 px-8 py-3 hover:border-natitude-pink hover:text-natitude-pink transition-all duration-500 bg-black/20 backdrop-blur-sm"
              >
                Join the Tribe
              </button>
            </div>
          ) : (
            /* STATE 2: THE SIGNAL INPUT */
            <form onSubmit={handleJoin} className="w-full max-w-[400px] space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="text-center space-y-3">
                <h2 className="text-white text-[11px] uppercase tracking-[0.8em] drop-shadow-sm">Register Signal</h2>
                <p className="text-zinc-500 text-[8px] uppercase tracking-[0.4em]">Enter your digital path to claim your ID</p>
              </div>
              
              <input 
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL@DOMAIN.COM"
                className="w-full bg-transparent border-b border-natitude-pink/40 py-4 text-center outline-none text-white text-[12px] uppercase tracking-[0.5em] focus:border-natitude-pink transition-all placeholder:text-zinc-800"
              />
              
              <div className="flex justify-center gap-12">
                <button type="submit" className="text-[9px] uppercase tracking-[0.4em] text-white hover:text-natitude-pink transition-colors">Confirm</button>
                <button type="button" onClick={() => setIsJoining(false)} className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 hover:text-white transition-colors">Cancel</button>
              </div>
            </form>
          )}
        </div>

        {/* 4. LOCATION INFO - Stays fixed below the dynamic content */}
        <div className="mt-16 space-y-4 text-center border-t border-white/5 pt-8 w-full max-w-[300px]">
          <p className="text-[11px] md:text-[13px] uppercase tracking-[0.8em] text-white font-medium drop-shadow-md">
            Bury St Edmunds
          </p>
          <div className="h-[1px] w-16 bg-natitude-pink mx-auto shadow-[0_0_10px_#ff00ff]" />
          <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-400 font-light">
            Sonic Sanctuary
          </p>
        </div>
      </div>
    </main>
  );
}