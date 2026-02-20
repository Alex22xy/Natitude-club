"use client";

import React, { useState } from 'react';

// Define the structure for our hire options
interface HireOption {
  id: string;
  title: string;
  desc: string;
  image: string;
}

const hireOptions: HireOption[] = [
  { id: 'stag', title: 'Stag Parties', desc: 'The ultimate jungle send-off with private booth access.', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80' },
  { id: 'hen', title: 'Hen Parties', desc: 'Vibrant energy and custom cocktails for the tribe.', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80' },
  { id: 'creative', title: 'Content & Film', desc: 'A brutalist sanctuary for music videos and fashion shoots.', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80' },
  { id: 'birthday', title: 'Birthdays', desc: 'Another year in the wild. Full venue hire available.', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80' },
];

export default function HirePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      date: formData.get('date'),
      message: formData.get('message'),
      type: selectedType
    };

    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Enquiry sent. Our scouts will contact you shortly.");
        setSelectedType(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pb-40">
      <section className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.5em] mb-6">Private Rituals</h1>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] max-w-md mx-auto">
          Secure the sanctuary for your own tribe.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {hireOptions.map((option) => (
          <div key={option.id} className="group border border-white/5 bg-zinc-900/20">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={option.image} alt={option.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold uppercase tracking-widest">{option.title}</h3>
              <p className="text-zinc-400 text-xs mt-2 uppercase">{option.desc}</p>
              <button 
                onClick={() => setSelectedType(option.title)}
                className="mt-6 text-[10px] text-natitude-pink uppercase tracking-[0.4em] font-bold"
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
            <h2 className="text-sm uppercase tracking-[0.4em] mb-8 text-center">{selectedType} Enquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input name="name" placeholder="NAME" required className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white" />
              <input name="email" type="email" placeholder="EMAIL" required className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-natitude-pink text-[10px] uppercase tracking-widest text-white" />
              <input name="date" type="date" required className="w-full bg-transparent border-b border-white/10 py-3 outline-none text-[10px] uppercase text-white" />
              <textarea name="message" placeholder="DETAILS" rows={3} className="w-full bg-transparent border-b border-white/10 py-3 outline-none text-[10px] uppercase text-white" />
              <button disabled={loading} className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em]">
                {loading ? 'Sending...' : 'Submit'}
              </button>
              <button type="button" onClick={() => setSelectedType(null)} className="w-full text-[8px] text-zinc-600 uppercase mt-4">Close</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}