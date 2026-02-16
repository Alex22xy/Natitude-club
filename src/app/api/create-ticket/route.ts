import { createClient } from '@supabase/supabase-admin'; // Use service role key
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, eventName } = await req.json();
  
  // Generate a random 6-digit ticket code
  const ticketCode = `NAT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from('tickets')
    .insert([{ email, event_name: eventName, ticket_code: ticketCode }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ticketCode });
}