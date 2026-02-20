"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Wild', path: '/' },
    { name: 'Rituals', path: '/rituals' },
    { name: 'Hire', path: '/hire' },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] p-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent">
      {/* Brand - Keep it small and sleek in the corner */}
      <Link href="/" className="text-lg font-bold tracking-[0.3em] uppercase">
        Natitude
      </Link>

      {/* Hamburger Toggle */}
      <button 
        onClick={() => setIsOpen(true)}
        className="flex flex-col gap-1.5 p-2 group"
        aria-label="Open Menu"
      >
        <div className="w-6 h-[1px] bg-white group-hover:bg-natitude-pink transition-colors" />
        <div className="w-6 h-[1px] bg-white group-hover:bg-natitude-pink transition-colors" />
      </button>

      {/* FULL SCREEN MOBILE OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-xl z-[110] flex flex-col items-center justify-center p-12">
          
          {/* Centered Navigation Links (The Thumb Zone) */}
          <div className="flex flex-col items-center space-y-12 w-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-4xl font-bold uppercase tracking-[0.4em] transition-all duration-300 ${
                  pathname === link.path 
                    ? 'text-natitude-pink' 
                    : 'text-white/60 hover:text-white hover:tracking-[0.5em]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Close Button - Positioned at the bottom for one-handed thumb access */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute bottom-16 flex flex-col items-center group"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-600 group-hover:text-white transition-colors mb-4">
              Close Transmission
            </span>
            <div className="w-10 h-[1px] bg-zinc-800 group-hover:bg-natitude-pink transition-all w-16" />
          </button>
        </div>
      )}
    </nav>
  );
}