import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: 'alex.john.norton9@gmail.com', 
      replyTo: email,
      subject: `HIRE REQUEST: ${name}`,
      html: `
        <div style="background: #000; color: #fff; padding: 20px; font-family: sans-serif; border: 1px solid #333;">
          <h1 style="color: #ff00ff; text-transform: uppercase; font-size: 18px;">New Hire Transmission</h1>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Client Email:</strong> ${email}</p>
          <p style="border-top: 1px solid #222; padding-top: 10px;"><strong>Brief:</strong></p>
          <p style="color: #ccc;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}