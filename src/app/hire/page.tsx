"use client";

import React, { useState } from 'react';

const hireOptions = [
  { 
    id: 'stag', 
    title: 'Stag Parties', 
    desc: 'The ultimate jungle send-off with private booth access and bottle service.', 
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    id: 'hen', 
    title: 'Hen Parties', 
    desc: 'Vibrant energy, custom cocktails, and a dedicated soundtrack for the night.', 
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    id: 'work', 
    title: 'After Work', 
    desc: 'Escape the corporate grind. Team socials hosted in the heart of the wild.', 
    image: 'https://images.unsplash.com/photo-1514525253361-bee8a19740c1?q=80&w=1974&auto=format&fit=crop' 
  },
  { 
    id: 'birthday', 
    title: 'Birthdays', 
    desc: 'Another year in the jungle. Full venue hire or private area bookings available.', 
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    id: 'creative', 
    title: 'Content & Film', 
    desc: 'The perfect brutalist backdrop for music videos, fashion editorials, and cinematic production.', 
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop' 
  },
  { 
    id: 'launch', 
    title: 'Listening Parties', 
    desc: 'Studio-grade acoustics for album launches and exclusive press previews.', 
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop' 
  }
];

export default function HirePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          date: formData.get('date'),
          message: formData.get('message'),
          type: selectedType
        }),
      });

      if (res.ok) {
        alert("Enquiry sent. Our scouts will contact you shortly.");
        setSelectedType(null);
      }
    } catch (err) {
      console.error(err);
      alert("System error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pb-40">
      <section className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.5em] mb-6">Private Rituals</h1>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] max-w-md mx-auto leading-loose">
          Secure the sanctuary for your own tribe. 
          Full venue hire and private area bookings.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {hireOptions.map((option) => (
          <div key={option.id} className="group border border-white/5 bg-zinc-900/20 hover:border-natitude-pink/50 transition-colors">
            <div className="aspect-[16/9] overflow-hidden">
              <img 
                src={option.image} 
                alt={option.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" 
              />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold uppercase tracking-widest">{option.title}</h3>
              <p className="text-zinc-400 text-xs mt-2 uppercase">{option.desc}</p>
              <button 
                onClick={() => setSelectedType(option.title)}
                className="mt-6 text-[10px] text-natitude-pink uppercase tracking-[0.4em] font-bold hover:translate-x-2 transition-transform block"
              >
                Enquire Now —&gt;
              </button>
            </div>
          </div>
        ))}
      </section>

      {selectedType && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-6 z-[100] backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 p-8 w-full max-w-lg">
            <h2 className="text-sm uppercase tracking-[0.4em] mb-8 text-center">Booking: {selectedType}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input name="name" placeholder="FULL NAME" required className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white" />
              <input name="email" type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white" />
              <input name="date" type="date" required className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white" />
              <textarea name="message" placeholder="MESSAGE" rows={3} className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white" />
              
              <button disabled={loading} className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-natitude-pink hover:text-white transition-all">
                {loading ? 'Transmitting...' : 'Send Enquiry'}
              </button>
              <button type="button" onClick={() => setSelectedType(null)} className="w-full text-[8px] text-zinc-600 uppercase mt-4">Close</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}