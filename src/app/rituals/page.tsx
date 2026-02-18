"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RitualsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [fetching, setFetching] = useState(true); // Track initial load
  const [submitting, setSubmitting] = useState(false); // Track form submit

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });
        
        if (error) throw error;
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching rituals:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchEvents();
  }, []);

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        // Fallback to false/empty string if columns don't exist yet
        isPaid: selectedEvent.is_paid ?? false,
        paymentLink: selectedEvent.payment_link ?? ""
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.type === 'PAYMENT_REDIRECT') {
        window.location.href = data.url;
      } else if (data.success) {
        alert("Registration Confirmed! Welcome to the Jungle.");
        setSelectedEvent(null);
      } else {
        throw new Error(data.error || "Registration failed");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-[10px] uppercase tracking-[0.5em] animate-pulse">Loading Rituals...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 pt-24 pb-40">
      <h1 className="text-3xl font-bold uppercase tracking-[0.4em] text-center mb-16">Rituals</h1>
      
      <div className="max-w-4xl mx-auto grid gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div 
              key={event.id} 
              className="border border-white/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900/20 backdrop-blur-sm gap-4"
            >
              <div>
                <h2 className="text-xl uppercase tracking-widest font-bold">
                  {event.title || "Untitled Ritual"}
                </h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                    {event.date || "TBA"}
                  </p>
                  <p className="text-natitude-pink text-[10px] uppercase tracking-widest">
                    {event.location || "Secret Location"}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedEvent(event)}
                className="w-full md:w-auto border border-natitude-pink text-natitude-pink px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-natitude-pink hover:text-white transition-all duration-500"
              >
                Join
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border border-white/5 bg-zinc-900/10">
            <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">No rituals currently scheduled.</p>
          </div>
        )}
      </div>

      {/* REGISTRATION MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-6 z-[100] backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 p-8 w-full max-w-md space-y-8 relative">
            <div className="text-center space-y-2">
              <h3 className="uppercase tracking-[0.3em] text-sm text-white">Entry Request</h3>
              <p className="text-[10px] text-natitude-pink uppercase tracking-widest">{selectedEvent.title}</p>
            </div>

            <form onSubmit={handleJoin} className="space-y-6">
              <div className="space-y-4">
                <input 
                  name="name" 
                  placeholder="YOUR NAME" 
                  required 
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink transition-colors text-[10px] uppercase tracking-widest text-white" 
                />
                <input 
                  name="email" 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  required 
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink transition-colors text-[10px] uppercase tracking-widest text-white" 
                />
              </div>
              
              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-natitude-pink hover:text-white transition-all duration-500 disabled:opacity-50"
              >
                {submitting ? 'Authenticating...' : selectedEvent.is_paid ? 'Secure Ticket' : 'Confirm Entry'}
              </button>
              
              <button 
                type="button" 
                onClick={() => setSelectedEvent(null)} 
                className="w-full text-[8px] text-zinc-600 uppercase tracking-widest hover:text-white transition-colors"
              >
                Go Back
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}