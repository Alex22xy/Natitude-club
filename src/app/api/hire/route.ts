import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. This handles browser testing (GET request)
export async function GET() {
  return NextResponse.json({ message: "API Path Found - Awaiting POST request" });
}

// 2. This handles the actual form submission (POST request)
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: 'YOUR_EMAIL@GMAIL.COM', // REPLACE THIS with your actual email
      subject: `HIRE REQUEST: ${name}`,
      html: `
        <div style="background: #000; color: #fff; padding: 20px; font-family: sans-serif;">
          <h1 style="color: #ff00ff; text-transform: uppercase;">New Hire Transmission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}