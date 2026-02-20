"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [status, setStatus] = useState('OFFLINE');

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Calculate based on UK Time (GMT/BST)
      const ukTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        weekday: 'long',
        hour: 'numeric',
        hour12: false
      }).formatToParts(now);

      const day = ukTime.find(p => p.type === 'weekday')?.value;
      const hour = parseInt(ukTime.find(p => p.type === 'hour')?.value || '0');

      let currentState = 'OFFLINE';

      // Automated Schedule Logic
      if (
        ((day === 'Wednesday' || day === 'Friday' || day === 'Saturday') && (hour >= 21 || hour < 4)) ||
        ((day === 'Thursday') && (hour >= 22 || hour < 4)) ||
        ((day === 'Sunday') && (hour < 4)) 
      ) {
        currentState = 'LIVE';
      }

      setStatus(currentState);
    };

    checkStatus();
    const timer = setInterval(checkStatus, 60000); 
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'Rituals', path: '/rituals' },
    { name: 'Wild', path: '/' },
    { name: 'Hire', path: '/hire' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-[100] px-6 pb-10 pt-16 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto flex flex-col items-center gap-6 pointer-events-auto">
        
        {/* AUTOMATED STATUS INDICATOR */}
        <div className={`flex items-center gap-3 px-4 py-1.5 rounded-full border transition-all duration-1000 ${
          status === 'LIVE' 
            ? 'bg-green-500/5 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
            : 'bg-zinc-900/40 border-white/5'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${
            status === 'LIVE' 
              ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' 
              : 'bg-zinc-700'
          }`} />
          <span className={`text-[8px] uppercase tracking-[0.4em] font-medium transition-colors ${
            status === 'LIVE' ? 'text-green-500' : 'text-zinc-500'
          }`}>
            System {status}
          </span>
        </div>

        {/* BOTTOM NAVIGATION PANEL */}
        <div className="flex items-center justify-between w-full border border-white/10 bg-zinc-900/40 backdrop-blur-xl p-1.5 rounded-sm shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`flex-1 text-center py-4 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${
                pathname === link.path 
                  ? 'text-natitude-pink font-bold' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}