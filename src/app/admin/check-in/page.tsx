"use client";
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AdminCheckIn() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const supabase = createClientComponentClient();

  const verifyTicket = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .update({ is_scanned: true })
      .eq('ticket_code', code)
      .eq('is_scanned', false) // Won't work if already scanned
      .select();

    if (data && data.length > 0) {
      setStatus('✅ VALID - CHECKED IN');
    } else {
      setStatus('❌ INVALID OR ALREADY USED');
    }
  };

  return (
    <div className="p-10 bg-black h-screen text-white flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Door Check-In</h1>
      <input 
        className="text-black p-4 text-xl" 
        placeholder="Enter Ticket Code"
        onChange={(e) => setCode(e.target.value.toUpperCase())}
      />
      <button onClick={verifyTicket} className="bg-green-600 p-4 font-bold">Verify Ticket</button>
      <div className="text-2xl mt-10">{status}</div>
    </div>
  );
}