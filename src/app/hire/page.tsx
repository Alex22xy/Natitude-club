import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { hireReceivedTemplate, adminNotificationTemplate } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Send confirmation to the User
    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: email,
      subject: 'Transmission Received | NATITUDE',
      html: hireReceivedTemplate(name),
    });

    // 2. Send notification to YOU (The Admin)
    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: 'your-admin-email@gmail.com', // Put your actual email here
      subject: 'NEW HIRE ENQUIRY',
      html: adminNotificationTemplate('HIRE', { name, email, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Hire API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}