import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: 'YOUR_EMAIL@GMAIL.COM', // Make sure this is your real email
      subject: `NEW HIRE REQUEST: ${name}`,
      html: `<p>New message from ${name} (${email}): ${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}