import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { hireReceivedTemplate, adminNotificationTemplate } from '@/lib/email-templates';

// 1. Initialize Supabase (Service Role for backend bypass)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // 2. Safety check for API Key
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, type, date, message } = await req.json();

    // 3. Save to Supabase
    const { error: dbError } = await supabase.from('enquiries').insert([
      { 
        name, 
        email, 
        event_type: type, 
        event_date: date, 
        message 
      }
    ]);
    
    if (dbError) {
      console.error("Supabase Error:", dbError);
      throw new Error("Failed to save enquiry to database.");
    }

    // 4. Send Unified Notification to YOU (Sandbox restriction bypass)
    // In Sandbox, we send everything to alex.john.norton9@gmail.com
    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: 'alex.john.norton9@gmail.com', 
      subject: `NEW TRANSMISSION: Hire Request from ${name}`,
      html: `
        ${adminNotificationTemplate('HIRE', { name, email, type, date, message })}
        <hr style="border: 1px solid #eee; margin: 30px 0;" />
        <p style="text-align: center; color: #666; font-size: 10px;">PREVIEW OF CUSTOMER EMAIL BELOW:</p>
        ${hireReceivedTemplate(name)}
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    // This console.log will show up in your Vercel/Terminal logs
    console.error("Enquiry API Error:", err.message);
    
    return NextResponse.json(
      { error: err.message || "Transmission interrupted. Please try again." }, 
      { status: 500 }
    );
  }
}