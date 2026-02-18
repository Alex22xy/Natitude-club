import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, eventName } = await req.json();
    const ticketCode = `NAT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from('tickets')
      .insert([{ 
        email, 
        event_name: eventName,
        ticket_code: ticketCode 
      }]);

    if (error) {
      // This will show up in your Vercel logs so we can see the REAL error
      console.error("SUPABASE_INSERT_ERROR:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}