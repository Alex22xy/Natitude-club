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
        throw new Error("Transmission failed");
      }
    } catch (err) {
      alert("Transmission interrupted. Please check your signal and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 pt-32 pb-64">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-20">
          <h1 className="text-4xl font-bold uppercase tracking-[0.6em] mb-4 text-white">Private Hire</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] leading-loose">
            Secure the sanctuary for your own tribe. <br/> Private events, film, and sonic experiments.
          </p>
        </header>

        {/* Hire Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="border border-white/5 bg-zinc-900/20 p-8 space-y-4">
            <h3 className="text-natitude-pink text-xs uppercase tracking-widest">The Sanctuary</h3>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">
              Full venue access. Immersive lighting. High-fidelity sound system. Capacity: 150.
            </p>
          </div>
          <div className="border border-white/5 bg-zinc-900/20 p-8 space-y-4">
            <h3 className="text-natitude-pink text-xs uppercase tracking-widest">Sonic Lab</h3>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">
              Private booth access & dedicated host. Perfect for smaller rituals and focused transmissions.
            </p>
          </div>
        </div>

        {/* Transmission Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleHireSubmit} className="space-y-12 bg-zinc-900/10 p-10 border border-white/5">
            <div className="space-y-8">
              <div className="group">
                <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 group-focus-within:text-natitude-pink transition-colors">Identification</label>
                <input name="name" required placeholder="NAME / ORGANIZATION" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-natitude-pink transition-colors text-[10px] uppercase tracking-[0.2em] text-white" />
              </div>
              
              <div className="group">
                <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 group-focus-within:text-natitude-pink transition-colors">Digital Path</label>
                <input name="email" type="email" required placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-natitude-pink transition-colors text-[10px] uppercase tracking-[0.2em] text-white" />
              </div>

              <div className="group">
                <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 group-focus-within:text-natitude-pink transition-colors">The Brief</label>
                <textarea name="message" rows={4} required placeholder="DESCRIBE YOUR RITUAL..." className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-natitude-pink transition-colors text-[10px] uppercase tracking-[0.2em] resize-none text-white" />
              </div>
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-natitude-pink hover:text-white transition-all duration-700 disabled:opacity-50"
            >
              {submitting ? 'Authenticating...' : 'Send Request'}
            </button>
          </form>
        </div>
      </div>

      {/* SUCCESS OVERLAY */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center p-6 text-center">
          <div className="space-y-6 max-w-sm">
            <h2 className="text-natitude-pink text-2xl font-bold uppercase tracking-[0.5em] animate-pulse">Transmission Received</h2>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">
              Our curators have received your request. <br /> We will respond via the digital path shortly.
            </p>
            <button onClick={() => setShowSuccess(false)} className="mt-8 px-12 py-4 border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Return
            </button>
          </div>
        </div>
      )}
    </main>
  );
}