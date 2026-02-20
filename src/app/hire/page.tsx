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

      const data = await res.json();

      if (data.success) {
        setShowSuccess(true);
      } else {
        throw new Error(data.error || "Transmission failed");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 pt-24 pb-48">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold uppercase tracking-[0.4em] text-center mb-8">Private Hire</h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] text-center mb-16 leading-loose">
          Secure the sanctuary for your own rituals. <br/> Private events, film, and sonic experiments.
        </p>

        <form onSubmit={handleHireSubmit} className="space-y-12">
          <div className="space-y-8">
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-zinc-600 group-focus-within:text-natitude-pink transition-colors tracking-[0.2em]">Identification</label>
              <input name="name" required placeholder="NAME / ORGANIZATION" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-natitude-pink transition-colors text-[10px] uppercase tracking-widest text-white" />
            </div>
            
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-zinc-600 group-focus-within:text-natitude-pink transition-colors tracking-[0.2em]">Digital Path</label>
              <input name="email" type="email" required placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-natitude-pink transition-colors text-[10px] uppercase tracking-widest text-white" />
            </div>

            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-zinc-600 group-focus-within:text-natitude-pink transition-colors tracking-[0.2em]">The Brief</label>
              <textarea name="message" rows={4} required placeholder="DESCRIBE THE TRANSMISSION..." className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-natitude-pink transition-colors text-[10px] uppercase tracking-widest resize-none text-white" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-natitude-pink hover:text-white transition-all duration-700 disabled:opacity-50"
          >
            {submitting ? 'Sending Transmission...' : 'Request Access'}
          </button>
        </form>
      </div>

      {/* SUCCESS OVERLAY */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center p-6 text-center">
          <div className="space-y-6 max-w-sm">
            <h2 className="text-natitude-pink text-2xl font-bold uppercase tracking-[0.5em] animate-pulse">Transmission Received</h2>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">
              Our curators have received your request. <br /> We will respond via the digital path shortly.
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="mt-8 px-12 py-4 border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Return
            </button>
          </div>
        </div>
      )}
    </main>
  );
}