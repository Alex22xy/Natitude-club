// src/app/page.tsx
import { supabase } from '@/lib/supabase';
import EventCard from '../components/eventcard';

export default async function Home() {
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) return <div className="text-white p-20 text-center uppercase tracking-widest text-xs">system offline.</div>;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* The Moody Jungle Hero Section */}
      <header className="relative h-[70vh] md:h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* 1. The Video Background - Constraints added */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-50"
        >
          <source src="/jungle.mp4" type="video/mp4" />
        </video>

        {/* 2. Dark Overlay - Slightly heavier on mobile for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-10" />

        {/* 3. Logo - Responsive width: w-48 on mobile, w-96 on desktop */}
        <div className="relative z-20 w-48 md:w-96 px-4">
          <img 
            src="/logo.svg" 
            alt="Natitude Logo" 
            className="w-full h-auto drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]"
          />
        </div>

        {/* 4. The Subtitle - Smaller text for mobile scaling */}
        <p className="relative z-20 text-gray-400 mt-8 uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-[10px] animate-pulse px-6 text-center leading-loose">
          Home of underground jungle culture
        </p>
      </header>

      {/* Content Container - px-4 for mobile safety */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 pb-32">
        
        {/* The Events Grid - Gap added for mobile visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-px bg-transparent md:bg-white/5 border-0 md:border md:border-white/5">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Footer info */}
        <footer className="mt-32 pb-10 text-center text-gray-700 text-[8px] md:text-[9px] uppercase tracking-widest">
          est. 2024 — limited capacity — london
        </footer>
      </div>
    </main>
  );
}