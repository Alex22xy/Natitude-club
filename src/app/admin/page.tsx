"use client";

import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminDashboardContent from '@/components/AdminDashboardContent'; // We'll move your old code here

export default function AdminPage() {
  const { authorized, login } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (!authorized) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-xl font-bold uppercase tracking-[0.6em] text-white">Restricted Area</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Identify yourself to enter the sanctuary.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER ACCESS KEY"
              className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-natitude-pink transition-all text-center tracking-[0.5em] text-xs"
            />
            {error && <p className="text-natitude-pink text-[8px] uppercase tracking-widest animate-shake">Invalid Credentials</p>}
            <button className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-natitude-pink hover:text-white transition-all">
              Verify
            </button>
          </form>
        </div>
      </main>
    );
  }

  // If authorized, show the dashboard we built earlier
  return <AdminDashboardContent />;
}