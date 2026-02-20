import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API Key from .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Send an email to YOU (The Admin)
    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: 'YOUR_EMAIL@GMAIL.COM', // <--- REPLACE WITH YOUR ACTUAL EMAIL
      subject: `NEW HIRE REQUEST: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="background: #000; color: #fff; padding: 20px; font-family: sans-serif;">
          <h1 style="color: #ff00ff; text-transform: uppercase;">New Transmission</h1>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Path:</strong> ${email}</p>
          <p><strong>Brief:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Hire API Error:", error);
    return NextResponse.json({ success: false, error: "Transmission Interrupted" }, { status: 500 });
  }
}