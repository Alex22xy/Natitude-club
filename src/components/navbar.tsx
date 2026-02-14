import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-6">
      <nav className="flex items-center gap-8 px-8 py-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        
        <Link href="/" className="group flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-widest text-white group-hover:text-natitude-pink transition-colors">
            home
          </span>
          <div className="w-1 h-1 bg-natitude-pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        <Link href="/events" className="group flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
            events
          </span>
          <div className="w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        <Link href="/about" className="group flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
            about
          </span>
          <div className="w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

      </nav>
    </div>
  );
}