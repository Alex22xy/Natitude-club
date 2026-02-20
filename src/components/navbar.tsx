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
      const ukTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London', weekday: 'long', hour: 'numeric', hour12: false
      }).formatToParts(now);
      const day = ukTime.find(p => p.type === 'weekday')?.value;
      const hour = parseInt(ukTime.find(p => p.type === 'hour')?.value || '0');
      
      let currentState = 'OFFLINE';
      if (((day === 'Wednesday' || day === 'Friday' || day === 'Saturday') && (hour >= 21 || hour < 4)) ||
          ((day === 'Thursday') && (hour >= 22 || hour < 4)) ||
          ((day === 'Sunday') && (hour < 4))) {
        currentState = 'LIVE';
      }
      setStatus(currentState);
    };
    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 w-full z-[100] px-6 pb-8 pt-10 pointer-events-none">
      <div className="max-w-md mx-auto flex flex-col items-center gap-4 pointer-events-auto">
        
        {/* STATUS INDICATOR - Moved higher with gap-4 */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-1000 ${
          status === 'LIVE' ? 'bg-green-500/10 border-green-500/20' : 'bg-zinc-900/80 border-white/5'
        }`}>
          <div className={`w-1 h-1 rounded-full ${status === 'LIVE' ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
          <span className={`text-[7px] uppercase tracking-[0.4em] ${status === 'LIVE' ? 'text-green-500' : 'text-zinc-500'}`}>
            System {status}
          </span>
        </div>

        {/* NAV BAR */}
        <div className="flex items-center justify-around w-full border border-white/10 bg-black/80 backdrop-blur-lg rounded-lg overflow-hidden">
          {[
            { name: 'Rituals', path: '/rituals' },
            { name: 'Wild', path: '/' },
            { name: 'Hire', path: '/hire' },
          ].map((link) => (
            <Link key={link.name} href={link.path} className={`flex-1 text-center py-4 text-[9px] uppercase tracking-[0.3em] transition-all ${
              pathname === link.path ? 'text-natitude-pink bg-white/5' : 'text-zinc-500 hover:text-white'
            }`}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}