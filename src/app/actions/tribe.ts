"use server";

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function joinTribe(email: string) {
  // 1. Initialize inside the function to ensure Vercel sees the ENV variables
  const supabase = createClient(
    process.env.SUPABASE_URL!, 
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log("Starting joinTribe for:", email);

  try {
    // 2. Wrap the DB check in a promise with a timeout
    const { data: existing, error: checkError } = await Promise.race([
      supabase.from('members').select('member_id').eq('email', email).single(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 5000))
    ]) as any;

    if (existing) {
      return { success: true, memberId: existing.member_id };
    }

    // 3. Get count for ID generation
    const { count, error: countError } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true });

    if (countError) throw new Error(countError.message);
    
    const memberId = `NT-${(count || 0) + 1001}`;

    // 4. Insert to DB
    const { error: insertError } = await supabase
      .from('members')
      .insert([{ email, member_id: memberId, rank: 'ORIGIN' }]);

    if (insertError) throw new Error(insertError.message);

    // 5. Fire and Forget Email (Don't await this, let it run in background)
    resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: email,
      subject: 'SIGNAL RECEIVED // IDENTITY ANCHORED',
      html: `<div style="background:#000;color:#fff;padding:20px;"><h1>ID: ${memberId}</h1></div>`
    }).catch(e => console.error("Email background error:", e));

    return { success: true, memberId };

  } catch (error: any) {
    console.error("TRIBE ERROR LOG:", error.message);
    // Return the specific error so you can see it on the screen
    return { success: false, error: error.message };
  }
}