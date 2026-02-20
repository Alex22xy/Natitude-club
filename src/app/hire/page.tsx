"use client";

import { useState } from 'react';

export default function HirePage() {
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleHireSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/hire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowSuccess(true);
      } else {
        throw new Error("Transmission failed");
      }
    } catch (err) {
      alert("Transmission interrupted. Please check your signal and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    /* locked-screen + h-[100dvh] ensures zero wiggle on mobile */
    <main className="locked-screen h-[100dvh] w-full bg-black text-white flex flex-col justify-center px-6 relative overflow-hidden">
      
      <div className="max-w-xl mx-auto text-center w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-[0.5em] mb-4 text-white">Private Hire</h1>
          <p className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] leading-loose">
            Secure the sanctuary for exclusive rituals.
          </p>
        </header>

        <form onSubmit={handleHireSubmit} className="space-y-8 text-left border border-white/5 p-6 bg-zinc-900/20 backdrop-blur-sm">
          <div className="group">
            <label className="text-[7px] uppercase tracking-[0.3em] text-zinc-600 mb-1 block group-focus-within:text-natitude-pink transition-colors">Identification</label>
            <input 
              name="name" 
              required 
              placeholder="NAME / ORGANIZATION" 
              className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white transition-colors" 
            />
          </div>
          
          <div className="group">
            <label className="text-[7px] uppercase tracking-[0.3em] text-zinc-600 mb-1 block group-focus-within:text-natitude-pink transition-colors">Digital Path</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white transition-colors" 
            />
          </div>

          <div className="group">
            <label className="text-[7px] uppercase tracking-[0.3em] text-zinc-600 mb-1 block group-focus-within:text-natitude-pink transition-colors">The Vision</label>
            <textarea 
              name="message" 
              rows={2} 
              required 
              placeholder="DESCRIBE THE TRANSMISSION..." 
              className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white transition-colors resize-none" 
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting} 
            className="w-full py-4 bg-white text-black text-[9px] font-bold uppercase tracking-[0.5em] hover:bg-natitude-pink hover:text-white transition-all duration-700 disabled:opacity-50"
          >
            {submitting ? 'Authenticating...' : 'Request Access'}
          </button>
        </form>
      </div>

      {/* SUCCESS OVERLAY */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
          <div className="space-y-8 max-w-sm">
            <div className="space-y-4">
              <h2 className="text-natitude-pink text-2xl font-bold uppercase tracking-[0.6em] animate-pulse">Received</h2>
              <p className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] leading-relaxed">
                Our curators have received your transmission. <br /> We will respond shortly.
              </p>
            </div>
            
            <button 
              onClick={() => {
                window.location.href = '/';
              }} 
              className="px-12 py-4 border border-white/10 text-[9px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500"
            >
              Return to Sanctuary
            </button>
          </div>
        </div>
      )}
    </main>
  );
}