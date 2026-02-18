import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, eventName } = await req.json();
    
    // Generate a simple unique code for the door
    const ticketCode = `NAT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Save to the 'tickets' table
    const { error } = await supabase
      .from('tickets')
      .insert([{ 
        email, 
        event_name: eventName, 
        ticket_code: ticketCode,
        payment_status: 'pending' 
      }]);

    if (error) {
      console.error('Supabase Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, ticketCode });
  } catch (err: any) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}