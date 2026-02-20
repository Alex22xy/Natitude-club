"use server";

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinTribe(email: string) {
  try {
    // 1. Check if they are already in the Tribe
    const { data: existing } = await supabase
      .from('members')
      .select('member_id')
      .eq('email', email)
      .single();

    if (existing) return { success: true, message: "Signal already active." };

    // 2. Generate a unique ID (Count + Offset)
    const { count } = await supabase.from('members').select('*', { count: 'exact', head: true });
    const memberNumber = (count || 0) + 1001;
    const memberId = `NT-${memberNumber}`;

    // 3. Save to Supabase
    const { error: dbError } = await supabase
      .from('members')
      .insert([{ email, member_id: memberId, rank: 'ORIGIN' }]);

    if (dbError) throw dbError;

    // 4. Send the High-End Welcome Email via Resend
    await resend.emails.send({
      from: 'NATITUDE <tribe@yourdomain.com>',
      to: email,
      subject: 'SIGNAL RECEIVED // WELCOME TO THE TRIBE',
      html: `
        <div style="background: #000; color: #fff; padding: 40px; font-family: sans-serif; border: 1px solid #ff00ff;">
          <h1 style="letter-spacing: 0.5em; text-transform: uppercase; color: #ff00ff;">Confirmed</h1>
          <p style="letter-spacing: 0.2em; font-size: 10px; color: #666;">YOUR DIGITAL IDENTITY HAS BEEN ANCHORED.</p>
          <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;" />
          <p style="font-size: 24px; letter-spacing: 0.3em;">ID: ${memberId}</p>
          <p style="font-size: 10px; color: #ff00ff; letter-spacing: 0.2em;">RANK: ORIGIN TRIBE</p>
          <br />
          <p style="font-size: 9px; color: #444; line-height: 2;">SHOW THIS TRANSMISSION AT THE SANCTUARY BAR FOR YOUR WELCOME RITUAL.</p>
        </div>
      `
    });

    return { success: true, memberId };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Transmission Interrupted" };
  }
}