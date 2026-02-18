"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'The Wild', href: '/' },
    { name: 'Rituals', href: '/rituals' },
    { name: 'Hire', href: '/hire' },
    { name: 'Gallery', href: '/gallery' },
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 md:px-6">
      <nav className="flex items-center gap-4 md:gap-8 px-6 md:px-10 py-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          
          return (
            <Link 
              key={link.name} 
              href={link.href} 
              className="group flex flex-col items-center gap-1"
            >
              <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive ? 'text-natitude-pink' : 'text-white/50 group-hover:text-white'
              }`}>
                {link.name}
              </span>
              
              {/* Active Indicator Dot */}
              <div className={`w-1 h-1 rounded-full transition-all duration-500 ${
                isActive 
                  ? 'bg-natitude-pink opacity-100 scale-125' 
                  : 'bg-white opacity-0 group-hover:opacity-40 scale-50 group-hover:scale-100'
              }`} />
            </Link>
          );
        })}

      </nav>
    </div>
  );
}