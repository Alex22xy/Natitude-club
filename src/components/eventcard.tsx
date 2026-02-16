"use client";

import { useState } from 'react';

export default function EventCard({ event }: { event: any }) {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save info to Supabase via our API
      const res = await fetch('/api/create-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          eventName: event.title 
        }),
      });

      if (res.ok) {
        // 2. Redirect to SumUp once the DB entry is created
        window.location.href = event.payment_link || "#";
      } else {
        alert("Ticketing service is busy. Please try again.");
      }
    } catch (err) {
      console.error("Error creating ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group border border-white/10 p-6 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:border-natitude-pink/50 relative">
      
      {/* Header: Title and Price */}
      <div className="flex justify-between items-baseline mb-6">
        <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-white">
          {event.title}
        </h3>
        <span className="text-natitude-pink font-mono text-sm">
          £{event.price}
        </span>
      </div>
      
      {/* Date */}
      <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-10">
        {event.date} — 22:00 til late
      </p>

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="block w-full py-3 border border-white/40 text-center text-[10px] uppercase tracking-[0.4em] text-white hover:bg-white hover:text-black transition-all duration-500"
      >
        get ticket
      </button>

      {/* --- EMAIL MODAL --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-none max-w-sm w-full relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white text-xs tracking-widest"
            >
              [ CLOSE ]
            </button>
            
            <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-2">Registration</h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-8 leading-relaxed">
              Enter your email to receive your digital ticket after payment.
            </p>

            <form onSubmit={handleCheckout} className="space-y-6">
              <input 
                required
                type="email" 
                placeholder="EMAIL@ADDRESS.COM" 
                className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-natitude-pink transition-colors placeholder:text-white/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-natitude-pink hover:text-white transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}