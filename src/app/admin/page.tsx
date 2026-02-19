"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'rituals' | 'hire'>('rituals');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const table = activeTab === 'rituals' ? 'registrations' : 'enquiries';
    const { data: result } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    setData(result || []);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h1 className="text-2xl font-bold uppercase tracking-[0.4em]">Control Room</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('rituals')}
              className={`text-[10px] uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === 'rituals' ? 'border-natitude-pink text-white' : 'border-transparent text-zinc-600'}`}
            >
              Registrations
            </button>
            <button 
              onClick={() => setActiveTab('hire')}
              className={`text-[10px] uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === 'hire' ? 'border-natitude-pink text-white' : 'border-transparent text-zinc-600'}`}
            >
              Hire Enquiries
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-zinc-500 animate-pulse text-[10px] uppercase tracking-widest">Scanning database...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-zinc-500">
                  <th className="pb-4 font-medium text-natitude-pink">Name</th>
                  <th className="pb-4 font-medium">Contact</th>
                  <th className="pb-4 font-medium">{activeTab === 'rituals' ? 'Ritual' : 'Type'}</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.map((item) => (
                  <tr key={item.id} className="text-xs group hover:bg-white/[0.02]">
                    <td className="py-6 uppercase tracking-wider font-bold">{item.name}</td>
                    <td className="py-6 text-zinc-400">{item.email}</td>
                    <td className="py-6 uppercase text-[10px] tracking-tighter">
                      {activeTab === 'rituals' ? item.event_name : item.event_type}
                    </td>
                    <td className="py-6">
                      <span className={`px-3 py-1 rounded-full text-[8px] uppercase font-bold ${
                        item.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-natitude-pink/20 text-natitude-pink'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-6 text-zinc-600 text-[10px]">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}