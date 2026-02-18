import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, eventName } = await req.json();
    
    // Create the unique code for the door
    const ticketCode = `NAT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Initialize Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // Use the Secret Key here
    );

    // Insert into Supabase
    const { error } = await supabase
      .from('tickets')
      .insert([{ 
        email, 
        event_name: eventName, 
        ticket_code: ticketCode,
        payment_status: 'pending' 
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true, ticketCode });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}