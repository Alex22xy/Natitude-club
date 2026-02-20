"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [status, setStatus] = useState('OFFLINE');

  // ... (keep your existing useEffect for status logic) ...

  return (
    <nav className="fixed bottom-0 left-0 w-full z-[100] px-6 pb-8 pt-10 pointer-events-none">
      <div className="max-w-md mx-auto flex flex-col items-center gap-4 pointer-events-auto">
        
        {/* STATUS INDICATOR */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-1000 ${
          status === 'LIVE' ? 'bg-green-500/10 border-green-500/20' : 'bg-zinc-900/80 border-white/5'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'LIVE' ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
          <span className={`text-[7px] uppercase tracking-[0.4em] ${status === 'LIVE' ? 'text-green-500' : 'text-zinc-500'}`}>
            System {status}
          </span>
        </div>

        {/* MAIN NAV DOCK */}
        <div className="relative w-full border border-white/10 bg-black/80 backdrop-blur-xl rounded-2xl overflow-hidden">
          
          {/* THE MINIMALIST PULSE LINE */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-natitude-pink to-transparent opacity-50 animate-pulse" />

          <div className="flex items-center justify-around w-full">
            {[
              { name: 'Rituals', path: '/rituals' },
              { name: 'Wild', path: '/' },
              { name: 'Hire', path: '/hire' },
            ].map((link) => (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`flex-1 text-center py-5 text-[9px] uppercase tracking-[0.3em] transition-all duration-500 ${
                  pathname === link.path 
                    ? 'text-natitude-pink bg-white/[0.03]' 
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}