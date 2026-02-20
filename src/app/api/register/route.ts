import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { ritualConfirmationTemplate } from '@/lib/email-templates'; // Make sure the path is correct

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // 1. Initialize Resend inside the function
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, eventId, eventTitle, isPaid, paymentLink } = await req.json();

    // 2. Generate a unique ticket code
    const ticketCode = `NAT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // 3. Insert into Supabase
    const { error: dbError } = await supabase
      .from('registrations')
      .insert([{
        name,
        email,
        event_id: eventId,
        event_name: eventTitle,
        ticket_code: ticketCode,
        status: isPaid ? 'pending' : 'confirmed', 
      }]);

    if (dbError) throw dbError;

    // 4. Send Confirmation Email (Sandbox Mode Logic)
    // We send it to YOUR email because Resend is in sandbox mode.
    try {
      await resend.emails.send({
        from: 'NATITUDE <onboarding@resend.dev>',
        to: 'alex.john.norton9@gmail.com', // Your verified sandbox email
        subject: `RITUAL CONFIRMED: ${eventTitle}`,
        html: ritualConfirmationTemplate(name, eventTitle),
      });
    } catch (mailError) {
      console.error('Email failed but DB saved:', mailError);
      // We don't crash the whole request if only the email fails
    }

    // 5. Handle Response
    if (isPaid && paymentLink) {
      return NextResponse.json({ 
        success: true, 
        type: 'PAYMENT_REDIRECT', 
        url: `${paymentLink}?redirect_url=https://natitude-club.vercel.app/payment-success` 
      });
    }

    return NextResponse.json({ 
      success: true, 
      type: 'FREE_CONFIRMED' 
    });

  } catch (err: any) {
    console.error('Registration Error:', err.message);
    return NextResponse.json({ error: 'System busy. Try again.' }, { status: 500 });
  }
}