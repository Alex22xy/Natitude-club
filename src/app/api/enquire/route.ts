import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, type, date, message } = body;

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from('enquiries').insert([
      { name, email, event_type: type, event_date: date, message }
    ]);
    if (dbError) throw dbError;

    // 2. Send Alert Email to You
    await resend.emails.send({
      from: 'Natitude System <system@yourdomain.com>',
      to: 'your-email@example.com',
      subject: `New Hire Enquiry: ${type}`,
      text: `Name: ${name}\nEmail: ${email}\nDate: ${date}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}