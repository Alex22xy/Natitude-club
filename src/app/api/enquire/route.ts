import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Keep Supabase outside as it handles empty strings more gracefully 
// or use the ! non-null assertion
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // 1. Initialize Resend ONLY when the request happens
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ error: "Email configuration missing" }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const body = await req.json();
    const { name, email, type, date, message } = body;

    // 2. Save to Supabase
    const { error: dbError } = await supabase.from('enquiries').insert([
      { name, email, event_type: type, event_date: date, message }
    ]);
    if (dbError) throw dbError;

    // 3. Send Alert Email
    await resend.emails.send({
      from: 'Natitude System <system@yourdomain.com>', // Ensure this domain is verified in Resend
      to: 'your-email@example.com', // Your personal email
      subject: `New Hire Enquiry: ${type}`,
      text: `Name: ${name}\nEmail: ${email}\nDate: ${date}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Enquiry Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}