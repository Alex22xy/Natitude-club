"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  // --- AUTH STATE ---
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // --- DASHBOARD STATE ---
  const [activeTab, setActiveTab] = useState<'rituals' | 'hire'>('rituals');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Check for existing session on load
  useEffect(() => {
    const session = localStorage.getItem('natitude_admin_access');
    if (session === 'jungle_vip_2026') {
      setAuthorized(true);
    }
  }, []);

  // 2. Fetch data when authorized or tab changes
  useEffect(() => {
    if (authorized) {
      fetchData();
    }
  }, [authorized, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const table = activeTab === 'rituals' ? 'registrations' : 'enquiries';
    const { data: result } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    setData(result || []);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'jungle_vip_2026') {
      localStorage.setItem('natitude_admin_access', 'jungle_vip_2026');
      setAuthorized(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('natitude_admin_access');
    setAuthorized(false);
  };

  // --- RENDER LOGIN SCREEN ---
  if (!authorized) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8 text-center">
          <h1 className="text-xl font-bold uppercase tracking-[0.6em] text-white text-natitude-pink">Restricted Area</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ACCESS KEY"
              className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-natitude-pink text-center tracking-[0.5em] text-xs text-white"
            />
            {loginError && <p className="text-natitude-pink text-[8px] uppercase tracking-widest animate-pulse">Invalid Credentials</p>}
            <button className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-natitude-pink hover:text-white transition-all">
              Enter Sanctuary
            </button>
          </form>
        </div>
      </main>
    );
  }

  // --- RENDER DASHBOARD ---
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-12 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <h1 className="text-2xl font-bold uppercase tracking-[0.4em]">Control Room</h1>
          
          <div className="flex items-center gap-8">
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
                Hire Leads
              </button>
            </div>
            <button onClick={handleLogout} className="text-[8px] text-zinc-500 uppercase border border-white/10 px-3 py-1 hover:border-natitude-pink">Exit</button>
          </div>
        </div>

        {loading ? (
          <p className="text-zinc-500 animate-pulse text-[10px] uppercase tracking-widest">Scanning...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-zinc-500">
                  <th className="pb-4 font-medium text-natitude-pink">Name</th>
                  <th className="pb-4 font-medium">Contact</th>
                  <th className="pb-4 font-medium">{activeTab === 'rituals' ? 'Event' : 'Type'}</th>
                  <th className="pb-4 font-medium">Date Sent</th>
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