import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { hireReceivedTemplate } from '@/lib/email-templates';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, type, date, message } = await req.json();

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from('enquiries').insert([
      { name, email, event_type: type, event_date: date, message }
    ]);
    if (dbError) throw dbError;

    // 2. Send to YOUR email (Sandbox Restriction)
    // Note: We use onboarding@resend.dev and send it to YOU
    // even if the 'email' variable is the user's email.
    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: 'alex.john.norton9@gmail.com', 
      subject: `HIRE REQUEST: ${name}`,
      html: `
        <p><strong>User Email:</strong> ${email}</p>
        <hr />
        ${hireReceivedTemplate(name)}
        <p><strong>Details:</strong> ${type} on ${date}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Resend Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}