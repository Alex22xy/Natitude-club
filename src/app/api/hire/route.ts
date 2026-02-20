import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// This function allows us to test if the file is found via the browser
export async function GET() {
  return NextResponse.json({ message: "API Path Found - Awaiting POST request" });
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: 'YOUR_EMAIL@GMAIL.COM', // Change this to your email
      subject: `HIRE REQUEST: ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}