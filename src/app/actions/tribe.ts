"use server";

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function joinTribe(email: string) {
  // 1. Force pull variables inside the scope
  const SB_URL = process.env.SUPABASE_URL;
  const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const RS_KEY = process.env.RESEND_API_KEY;

  console.log("--- INITIATING TRIBE JOIN ---");
  console.log("Environment Probe:", { 
    hasUrl: !!SB_URL, 
    hasKey: !!SB_KEY, 
    hasResend: !!RS_KEY 
  });

  // 2. Immediate Configuration Guard
  if (!SB_URL || !SB_KEY) {
    console.error("CRITICAL CONFIG ERROR: Supabase credentials missing from process.env");
    return { 
      success: false, 
      error: `Config Error: URL(${!!SB_URL}) KEY(${!!SB_KEY}). Check Vercel Environment Settings.` 
    };
  }

  try {
    const supabase = createClient(SB_URL, SB_KEY);
    
    // 3. Check for existing member
    const { data: existing, error: checkError } = await supabase
      .from('members')
      .select('member_id')
      .eq('email', email)
      .single();

    // PGRST116 is the Supabase code for "No rows found" - we only care about other errors
    if (checkError && checkError.code !== 'PGRST116') {
      console.error("Supabase Select Error:", checkError.message);
      throw new Error("Database handshake failed");
    }

    if (existing) {
      return { success: true, memberId: existing.member_id };
    }

    // 4. Get Current Tribe Count
    const { count, error: countError } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true });

    if (countError) throw new Error("Could not calculate Tribe ID");
    
    const memberId = `NT-${(count || 0) + 1001}`;

    // 5. Anchor to Database
    const { error: insertError } = await supabase
      .from('members')
      .insert([{ email, member_id: memberId, rank: 'ORIGIN' }]);

    if (insertError) throw new Error("Failed to anchor identity");

    // 6. Dispatch Email (Background Task)
    if (RS_KEY) {
      const resend = new Resend(RS_KEY);
      resend.emails.send({
        from: 'NATITUDE <onboarding@resend.dev>',
        to: email,
        subject: 'SIGNAL RECEIVED // IDENTITY ANCHORED',
        html: `
          <div style="background:#000; color:#fff; padding:40px; font-family:sans-serif;">
            <h1 style="letter-spacing:0.5em;">NATITUDE</h1>
            <p style="color:#ff00ff;">SIGNAL ACTIVE</p>
            <hr style="border:1px solid #222;" />
            <p style="font-size:24px;">ID: ${memberId}</p>
          </div>
        `
      }).catch(e => console.error("Resend Background Error:", e));
    }

    return { success: true, memberId };

  } catch (error: any) {
    console.error("TRIBE ACTION CRASH:", error.message);
    return { success: false, error: error.message };
  }
}