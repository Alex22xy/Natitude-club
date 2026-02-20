"use client";
import { useState } from 'react';

export default function HirePage() {
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleHireSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/hire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        })
      });
      if (res.ok) setShowSuccess(true);
    } catch (err) {
      alert("Transmission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-60 px-6">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold uppercase tracking-[0.5em] mb-6">Private Hire</h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mb-20 leading-loose">
          Secure the sanctuary for exclusive rituals.
        </p>

        <form onSubmit={handleHireSubmit} className="space-y-12 text-left border border-white/5 p-8 bg-zinc-900/20">
          <div className="group">
            <label className="text-[8px] uppercase tracking-widest text-zinc-600 mb-2 block">Identity</label>
            <input name="name" required placeholder="NAME / ORG" className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase" />
          </div>
          <div className="group">
            <label className="text-[8px] uppercase tracking-widest text-zinc-600 mb-2 block">Digital Path</label>
            <input name="email" type="email" required placeholder="EMAIL" className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase" />
          </div>
          <div className="group">
            <label className="text-[8px] uppercase tracking-widest text-zinc-600 mb-2 block">The Vision</label>
            <textarea name="message" rows={3} required placeholder="DESCRIBE THE TRANSMISSION..." className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase resize-none" />
          </div>
          <button type="submit" disabled={submitting} className="w-full py-4 bg-white text-black text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-natitude-pink hover:text-white transition-all disabled:opacity-50">
            {submitting ? 'Sending...' : 'Request Access'}
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-natitude-pink text-xl font-bold uppercase tracking-[0.4em] mb-4">Received</h2>
          <button onClick={() => setShowSuccess(false)} className="px-8 py-3 border border-white/10 text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">Back</button>
        </div>
      )}
    </main>
  );
}