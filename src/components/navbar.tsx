"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const pathname = usePathname();
  const [status, setStatus] = useState('OFFLINE');

  // Fetch the Live Status from Supabase
  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase.from('system_status').select('current_state').single();
      if (data) setStatus(data.current_state);
    };
    fetchStatus();
    
    // Optional: Real-time subscription so it updates without refresh
    const channel = supabase.channel('status_updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'system_status' }, 
      (payload) => setStatus(payload.new.current_state))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const navLinks = [
    { name: 'Rituals', path: '/rituals' },
    { name: 'Wild', path: '/' },
    { name: 'Hire', path: '/hire' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-[100] px-6 pb-8 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto flex flex-col items-center gap-6 pointer-events-auto">
        
        {/* LIVE STATUS INDICATOR */}
        <div className="flex items-center gap-3 bg-zinc-900/40 backdrop-blur-md border border-white/5 px-4 py-1.5 rounded-full">
          <div className={`w-1.5 h-1.5 rounded-full ${
            status === 'LIVE' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 
            status === 'PEAK' ? 'bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]' : 'bg-zinc-600'
          }`} />
          <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 font-medium">
            System {status}
          </span>
        </div>

        {/* BOTTOM NAVIGATION LINKS */}
        <div className="flex items-center justify-between w-full border border-white/10 bg-zinc-900/20 backdrop-blur-xl p-2 rounded-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`flex-1 text-center py-3 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${
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