"use client";

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Public keys are fine for the client side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminCheckIn() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyTicket = async () => {
    setLoading(true);
    setStatus('Checking...');

    // We look for a ticket that matches the code and hasn't been scanned
    const { data, error } = await supabase
      .from('tickets')
      .update({ is_scanned: true })
      .eq('ticket_code', code.trim().toUpperCase())
      .eq('is_scanned', false) 
      .select();

    if (error) {
      setStatus(`Error: ${error.message}`);
    } else if (data && data.length > 0) {
      setStatus(`✅ VALID: ${data[0].email} checked in!`);
    } else {
      setStatus('❌ INVALID: Code not found or already used.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md border border-white/10 p-8 bg-zinc-900/50 backdrop-blur-md">
        <h1 className="text-xl font-bold uppercase tracking-[0.3em] mb-8 text-center text-natitude-pink">
          Door Check-In
        </h1>
        
        <input 
          className="w-full bg-transparent border-b border-white/20 p-4 text-white text-center text-2xl outline-none focus:border-natitude-pink transition-all uppercase tracking-widest mb-6" 
          placeholder="ENTER CODE"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button 
          onClick={verifyTicket} 
          disabled={loading}
          className="w-full bg-white text-black py-4 font-bold uppercase tracking-[0.2em] hover:bg-natitude-pink hover:text-white transition-all disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify Ticket'}
        </button>

        {status && (
          <div className="mt-8 p-4 text-center border border-white/5 bg-white/5 text-sm tracking-widest uppercase">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}