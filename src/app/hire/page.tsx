"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HirePage() {
  const router = useRouter();
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
    <main className="min-h-screen bg-black text-white pt-32 pb-60 px-6">
      <div className="max-w-xl mx-auto text-center">
        <header className="mb-20">
          <h1 className="text-4xl font-bold uppercase tracking-[0.5em] mb-6 text-white">Private Hire</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] leading-loose">
            Secure the sanctuary for exclusive rituals. <br/> Private events, film, and sonic experiments.
          </p>
        </header>

        <form onSubmit={handleHireSubmit} className="space-y-12 text-left border border-white/5 p-8 bg-zinc-900/20 backdrop-blur-sm">
          <div className="group">
            <label className="text-[8px] uppercase tracking-[0.3em] text-zinc-600 mb-2 block group-focus-within:text-natitude-pink transition-colors">Identification</label>
            <input 
              name="name" 
              required 
              placeholder="NAME / ORGANIZATION" 
              className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white transition-colors" 
            />
          </div>
          
          <div className="group">
            <label className="text-[8px] uppercase tracking-[0.3em] text-zinc-600 mb-2 block group-focus-within:text-natitude-pink transition-colors">Digital Path</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white transition-colors" 
            />
          </div>

          <div className="group">
            <label className="text-[8px] uppercase tracking-[0.3em] text-zinc-600 mb-2 block group-focus-within:text-natitude-pink transition-colors">The Vision</label>
            <textarea 
              name="message" 
              rows={3} 
              required 
              placeholder="DESCRIBE THE TRANSMISSION..." 
              className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white transition-colors resize-none" 
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting} 
            className="w-full py-5 bg-white text-black text-[9px] font-bold uppercase tracking-[0.5em] hover:bg-natitude-pink hover:text-white transition-all duration-700 disabled:opacity-50"
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
          // This forces a hard refresh to the home page, clearing all form data
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