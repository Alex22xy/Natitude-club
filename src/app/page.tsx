// src/app/page.tsx
import { supabase } from '@/lib/supabase';
import EventCard from '../components/eventcard';

export default async function Home() {
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) return <div className="text-white p-20 text-center">system offline.</div>;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 selection:bg-natitude-pink selection:text-black">
      <div className="max-w-5xl mx-auto">
        
        {/* The Moody Jungle Hero Section */}
<header className="relative h-[60vh] w-full flex flex-col items-center justify-center overflow-hidden mb-20">
  
  {/* 1. The Video Background */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute z-0 w-full h-full object-cover opacity-60"
  >
    <source src="/jungle.mp4" type="video/mp4" />
  </video>

  {/* 2. Dark Overlay for "Moody" feel */}
  <div className="absolute inset-0 bg-black/40 z-10" />

  {/* 3. Your Transparent SVG Logo */}
  <div className="relative z-20 w-64 md:w-96">
    <img 
      src="/logo.svg" 
      alt="Natitude Logo" 
      className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,0,255,0.3)]"
    />
  </div>

  {/* 4. The Subtitle */}
  <p className="relative z-20 text-gray-400 mt-6 uppercase tracking-[0.5em] text-[10px] animate-pulse">
    Natitude – Home of underground jungle culture
  </p>
</header>

        {/* The Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Footer info if you had any */}
        <footer className="mt-32 text-center text-gray-700 text-[9px] uppercase tracking-widest">
          est. 2024 — limited capacity
        </footer>
      </div>
    </main>
  );
}