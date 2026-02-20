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
  
  // --- CLUB STATUS STATE ---
  const [isFull, setIsFull] = useState(false);

  // 1. Check for existing session & Club Status on load
  useEffect(() => {
    const session = localStorage.getItem('natitude_admin_access');
    if (session === 'jungle_vip_2026') {
      setAuthorized(true);
    }
    // Fetch initial club status (optional: store this in a 'settings' table in Supabase)
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

  // --- CSV EXPORT LOGIC ---
  const downloadCSV = () => {
    if (data.length === 0) return;

    const headers = activeTab === 'rituals' 
      ? ['Name', 'Email', 'Event', 'Date Registered'] 
      : ['Name', 'Email', 'Inquiry Type', 'Event Date', 'Message'];

    const rows = data.map(item => {
      if (activeTab === 'rituals') {
        return [item.name, item.email, item.event_name, new Date(item.created_at).toLocaleDateString()];
      }
      return [item.name, item.email, item.event_type, item.event_date, (item.message || '').replace(/,/g, ' ')];
    });

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `natitude_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-[0.4em]">Control Room</h1>
            <p className="text-[8px] text-zinc-500 uppercase tracking-widest mt-2">Operational Data & Logistics</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Live Status Toggle */}
            <button 
              onClick={() => setIsFull(!isFull)}
              className={`text-[8px] px-4 py-2 uppercase tracking-widest border transition-all ${isFull ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-zinc-800 text-zinc-500'}`}
            >
              {isFull ? '● Club Full (Live)' : '○ Club Status: Open'}
            </button>

            <button 
              onClick={downloadCSV}
              className="text-[8px] border border-natitude-pink text-natitude-pink px-4 py-2 uppercase tracking-widest hover:bg-natitude-pink hover:text-black transition-all"
            >
              Export CSV
            </button>
            
            <button onClick={handleLogout} className="text-[8px] text-zinc-500 uppercase border border-white/10 px-4 py-2 hover:border-white">Log Out</button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-8 mb-8 border-b border-white/5">
          <button 
            onClick={() => setActiveTab('rituals')}
            className={`text-[10px] uppercase tracking-widest pb-4 transition-all ${activeTab === 'rituals' ? 'text-natitude-pink border-b border-natitude-pink' : 'text-zinc-600'}`}
          >
            Ritual Registrations ({activeTab === 'rituals' ? data.length : '...'})
          </button>
          <button 
            onClick={() => setActiveTab('hire')}
            className={`text-[10px] uppercase tracking-widest pb-4 transition-all ${activeTab === 'hire' ? 'text-natitude-pink border-b border-natitude-pink' : 'text-zinc-600'}`}
          >
            Hire Enquiries ({activeTab === 'hire' ? data.length : '...'})
          </button>
        </div>

        {/* Table Content */}
        {loading ? (
          <p className="text-zinc-500 animate-pulse text-[10px] uppercase tracking-widest">Scanning jungle data...</p>
        ) : (
          <div className="overflow-x-auto bg-zinc-900/10 border border-white/5 p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-zinc-500 border-b border-white/5">
                  <th className="pb-4 font-medium">Name</th>
                  <th className="pb-4 font-medium">Contact</th>
                  <th className="pb-4 font-medium">{activeTab === 'rituals' ? 'Event' : 'Inquiry Type'}</th>
                  <th className="pb-4 font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.map((item) => (
                  <tr key={item.id} className="text-xs group hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 uppercase tracking-wider font-bold text-zinc-200">{item.name}</td>
                    <td className="py-4 text-zinc-400 font-mono">{item.email}</td>
                    <td className="py-4 uppercase text-[10px] tracking-tighter text-natitude-pink">
                      {activeTab === 'rituals' ? item.event_name : item.event_type}
                    </td>
                    <td className="py-4 text-zinc-600 text-[10px]">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && (
              <div className="py-20 text-center text-[10px] text-zinc-700 uppercase tracking-widest">
                No data records found in this sector.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}