import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: 'YOUR_EMAIL@GMAIL.COM', // Replace with your email
      subject: `NEW HIRE REQUEST: ${name}`,
      html: `
        <div style="background: #000; color: #fff; padding: 20px; font-family: sans-serif;">
          <h1 style="color: #ff00ff; text-transform: uppercase;">New Transmission</h1>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Path:</strong> ${email}</p>
          <p><strong>Brief:</strong> ${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Hire API Error:", error);
    return NextResponse.json({ success: false, error: "Transmission Interrupted" }, { status: 500 });
  }
}