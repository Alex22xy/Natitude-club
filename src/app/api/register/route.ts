import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase with Service Role Key for database write access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { name, email, eventId, eventTitle, isPaid, paymentLink } = await req.json();

    // 1. Generate a unique ticket code
    const ticketCode = `NAT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // 2. Prepare the registration data
    // status is 'confirmed' for free events, 'pending' for paid
    const registrationData = {
      name,
      email,
      event_id: eventId,
      event_name: eventTitle,
      ticket_code: ticketCode,
      status: isPaid ? 'pending' : 'confirmed', 
    };

    // 3. Insert into your Supabase 'registrations' table
    const { error } = await supabase
      .from('registrations')
      .insert([registrationData]);

    if (error) throw error;

    // 4. Determine the response
    if (isPaid && paymentLink) {
      // If paid, tell the frontend to redirect to SumUp
      return NextResponse.json({ 
        success: true, 
        type: 'PAYMENT_REDIRECT', 
        url: `${paymentLink}?redirect_url=https://natitude-club.vercel.app/payment-success` 
      });
    } else {
      // If free, tell the frontend we are done
      return NextResponse.json({ 
        success: true, 
        type: 'FREE_CONFIRMED' 
      });
    }

  } catch (err: any) {
    console.error('Registration Error:', err.message);
    return NextResponse.json({ error: 'System busy. Try again.' }, { status: 500 });
  }
}