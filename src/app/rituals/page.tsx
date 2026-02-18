"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RitualsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from('events').select('*').order('date');
      if (data) setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      isPaid: selectedEvent.is_paid,
      paymentLink: selectedEvent.payment_link
    };

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.type === 'PAYMENT_REDIRECT') {
      window.location.href = data.url;
    } else {
      alert("Registration Confirmed! See you in the wild.");
      setSelectedEvent(null);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 pt-24">
      <h1 className="text-3xl font-bold uppercase tracking-[0.4em] text-center mb-16">Rituals</h1>
      
      <div className="max-w-4xl mx-auto grid gap-8">
        {events.map((event) => (
          <div key={event.id} className="border border-white/10 p-6 flex justify-between items-center bg-zinc-900/20 backdrop-blur-sm">
            <div>
              <h2 className="text-xl uppercase tracking-widest">{event.title}</h2>
              <p className="text-zinc-500 text-[10px] mt-2">{event.date} — {event.location}</p>
            </div>
            <button 
              onClick={() => setSelectedEvent(event)}
              className="border border-natitude-pink text-natitude-pink px-8 py-2 text-[10px] uppercase tracking-widest hover:bg-natitude-pink hover:text-white transition-all"
            >
              Join
            </button>
          </div>
        ))}
      </div>

      {/* REGISTRATION MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-[60]">
          <form onSubmit={handleJoin} className="bg-zinc-900 border border-white/10 p-8 w-full max-w-md space-y-6">
            <h3 className="text-center uppercase tracking-widest text-sm">Register for {selectedEvent.title}</h3>
            <input name="name" placeholder="FULL NAME" required className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-natitude-pink transition-colors text-xs" />
            <input name="email" type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-natitude-pink transition-colors text-xs" />
            
            <button 
              disabled={loading}
              className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-natitude-pink hover:text-white transition-all"
            >
              {loading ? 'Processing...' : selectedEvent.is_paid ? 'Proceed to Payment' : 'Confirm Registration'}
            </button>
            <button type="button" onClick={() => setSelectedEvent(null)} className="w-full text-[8px] text-zinc-500 uppercase tracking-widest">Cancel</button>
          </form>
        </div>
      )}
    </main>
  );
}