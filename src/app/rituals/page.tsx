"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RitualsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setFetching(true);
      setError(null);
      const { data, error: sbError } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      
      if (sbError) throw sbError;
      setEvents(data || []);
    } catch (err) {
      console.error("Error fetching rituals:", err);
      setError("TRANSMISSION INTERRUPTED. CHECK YOUR CONNECTION.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
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
        setSelectedEvent(null);
        setShowSuccess(true);
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

  // --- SKELETON STATE ---
  if (fetching) {
    return (
      <main className="min-h-screen bg-black text-white p-6 pt-24 pb-40">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-10 w-48 bg-zinc-900 mx-auto mb-16 animate-pulse" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-white/5 p-6 h-32 bg-zinc-900/40 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
               <div className="flex justify-between items-center">
                  <div className="space-y-3">
                    <div className="h-6 w-40 bg-zinc-800" />
                    <div className="h-3 w-64 bg-zinc-800" />
                  </div>
                  <div className="h-10 w-24 bg-zinc-800" />
               </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-red-500 text-[10px] uppercase tracking-[0.5em] mb-6">{error}</h2>
        <button 
          onClick={fetchEvents}
          className="border border-white/20 px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Retry Connection
        </button>
      </main>
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
              className="relative border border-white/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900/20 backdrop-blur-sm gap-4 group"
            >
              <div className="absolute -top-3 left-6 flex gap-2">
                {event.is_sold_out && (
                  <span className="bg-zinc-800 text-zinc-400 text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-zinc-700">
                    Ritual Full
                  </span>
                )}
                {event.low_capacity && !event.is_sold_out && (
                  <span className="bg-red-600 text-white text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                    Low Capacity
                  </span>
                )}
              </div>

              <div>
                <h2 className={`text-xl uppercase tracking-widest font-bold ${event.is_sold_out ? 'text-zinc-600' : 'text-white'}`}>
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
                disabled={event.is_sold_out}
                className={`w-full md:w-auto px-8 py-3 text-[10px] uppercase tracking-widest transition-all duration-500 ${
                  event.is_sold_out 
                  ? 'border border-zinc-800 text-zinc-700 cursor-not-allowed' 
                  : 'border border-natitude-pink text-natitude-pink hover:bg-natitude-pink hover:text-white'
                }`}
              >
                {event.is_sold_out ? 'Full' : 'Join'}
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

      {/* SUCCESS OVERLAY */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center p-6 text-center">
          <div className="space-y-6 max-w-sm">
            <h2 className="text-natitude-pink text-2xl font-bold uppercase tracking-[0.5em] animate-pulse">Access Granted</h2>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">
              Your registration is complete. <br /> Check your transmission (email) for confirmation.
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="mt-8 px-12 py-4 border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Return to Site
            </button>
          </div>
        </div>
      )}
    </main>
  );
}