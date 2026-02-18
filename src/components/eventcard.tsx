"use client";

import { useState } from 'react';

export default function EventCard({ event }: { event: any }) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProceed = async () => {
    if (!email) return alert("Please enter your email");
    
    setLoading(true);
    try {
      // 1. Save the ticket to Supabase via your API
      const response = await fetch('/api/create-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, eventName: event.title }),
      });

      if (!response.ok) throw new Error('Service busy');

      // 2. Redirect to SumUp with your Success Page link attached
      // We append the redirect_url to the end of your SumUp link
      const sumUpBaseUrl = event.payment_link; 
      const successUrl = "https://natitude-club.vercel.app/payment-success";
      
      window.location.href = `${sumUpBaseUrl}?redirect_url=${successUrl}`;
      
    } catch (err) {
      alert("Ticketing service is busy. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="group border border-white/10 p-6 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:border-natitude-pink/50 relative">
      <div className="flex justify-between items-baseline mb-6">
        <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-white">
          {event.title}
        </h3>
        <span className="text-natitude-pink font-mono text-sm">£{event.price}</span>
      </div>
      
      <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-10">
        {event.date} — 22:00 til late
      </p>

      {/* Button triggers the Modal instead of opening a link immediately */}
      <button 
        onClick={() => setShowModal(true)}
        className="block w-full py-3 border border-white/40 text-center text-[10px] uppercase tracking-[0.4em] text-white hover:bg-white hover:text-black transition-all duration-500"
      >
        get ticket
      </button>

      {/* EMAIL MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="w-full max-w-sm border border-white/10 bg-zinc-900 p-8 space-y-6">
            <h2 className="text-white text-center text-sm uppercase tracking-[0.3em]">Enter Email for Ticket</h2>
            
            <input 
              type="email"
              placeholder="YOUR@EMAIL.COM"
              className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-natitude-pink transition-colors text-center text-xs tracking-widest"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleProceed}
                disabled={loading}
                className="w-full py-3 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-natitude-pink hover:text-white transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
              
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-[8px] uppercase tracking-widest hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}