"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function WildPage() {
  const [isJoining, setIsJoining] = useState(false);
  const [email, setEmail] = useState("");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signal Registered:", email);
  };

  return (
    <main className="locked-screen h-[100dvh] w-full bg-black relative flex items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND VIDEO - Darkened slightly more for contrast */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          style={{ filter: 'brightness(0.3) contrast(1.2)' }} 
        >
          <source src="/jungle.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" /> 
      </div>

      {/* 2. PERSISTENT SYSTEM INFO (Bottom) */}
      <div className="absolute bottom-36 left-0 w-full text-center z-20">
         <p className="text-[9px] text-zinc-400 uppercase tracking-[0.6em] font-bold drop-shadow-lg">
          Est. MMXXIV
        </p>
      </div>

      {/* 3. MAIN INTERACTION AREA */}
      <div className="relative z-20 w-full max-w-[90vw] md:max-w-[650px] px-6 flex flex-col items-center">
        
        <div className="w-full min-h-[250px] flex items-center justify-center">
          {!isJoining ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
              <div className="w-full transition-all duration-1000 ease-out active:scale-95">
                <Image 
                  src="/logo.svg" 
                  alt="NATITUDE" 
                  width={1000} 
                  height={333} 
                  priority 
                  className="w-full h-auto drop-shadow-[0_0_40px_rgba(255,0,255,0.4)]" 
                />
              </div>
              
              {/* JOIN BUTTON - High visibility version */}
              <button 
                onClick={() => setIsJoining(true)}
                className="mt-12 text-[10px] uppercase tracking-[0.5em] text-white font-bold border-2 border-white/40 px-10 py-4 hover:border-natitude-pink hover:text-natitude-pink transition-all duration-500 bg-black/60 backdrop-blur-md shadow-2xl"
              >
                Join the Tribe
              </button>
            </div>
          ) : (
            /* STATE 2: THE SIGNAL INPUT - High contrast */
            <form onSubmit={handleJoin} className="w-full max-w-[400px] space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/5">
              <div className="text-center space-y-3">
                <h2 className="text-white text-[12px] uppercase tracking-[0.8em] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Register Signal</h2>
                <p className="text-zinc-300 text-[9px] uppercase tracking-[0.3em] font-semibold drop-shadow-md">Enter your digital path to claim your ID</p>
              </div>
              
              <input 
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL@DOMAIN.COM"
                className="w-full bg-transparent border-b-2 border-natitude-pink/60 py-4 text-center outline-none text-white text-[14px] font-bold uppercase tracking-[0.4em] focus:border-natitude-pink transition-all placeholder:text-zinc-700"
              />
              
              <div className="flex justify-center gap-12 pt-4">
                <button type="submit" className="text-[10px] uppercase tracking-[0.4em] text-white font-bold hover:text-natitude-pink drop-shadow-lg transition-colors">Confirm</button>
                <button type="button" onClick={() => setIsJoining(false)} className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold hover:text-white transition-colors">Cancel</button>
              </div>
            </form>
          )}
        </div>

        {/* 4. LOCATION INFO - Bolded for readability */}
        <div className="mt-16 space-y-4 text-center w-full max-w-[300px]">
          <p className="text-[12px] md:text-[14px] uppercase tracking-[0.8em] text-white font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
            Bury St Edmunds
          </p>
          <div className="h-[2px] w-20 bg-natitude-pink mx-auto shadow-[0_0_15px_#ff00ff]" />
          <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-200 font-bold drop-shadow-lg">
            Sonic Sanctuary
          </p>
        </div>
      </div>
    </main>
  );
}