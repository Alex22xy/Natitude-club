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
        
        {/* The Classic Header */}
        <header className="text-center mb-32">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">
            natitude<span className="text-natitude-pink">.</span>
          </h1>
          <p className="text-gray-500 mt-6 uppercase tracking-[0.5em] text-[10px]">
            london underground culture
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