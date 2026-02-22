"use server";

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function joinTribe(email: string) {
  console.log("--- SIGNAL START: " + email + " ---");

  try {
    // Check for keys first
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("DEBUG: Missing Supabase Environment Variables");
      return { success: false, error: "System Config Missing" };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL, 
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    console.log("DEBUG: Supabase Client Initialized");

    // 1. Database Check
    console.log("DEBUG: Attempting DB Select...");
    const { data: existing, error: checkError } = await supabase
      .from('members')
      .select('member_id')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error("DEBUG: DB Check Error:", checkError.message);
    }
    
    if (existing) {
      console.log("DEBUG: Member exists: " + existing.member_id);
      return { success: true, memberId: existing.member_id };
    }

    console.log("DEBUG: New Member detected. Fetching count...");

    // 2. ID Generation
    const { count, error: countError } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error("DEBUG: Count Error:", countError.message);
      throw countError;
    }

    const memberId = `NT-${(count || 0) + 1001}`;
    console.log("DEBUG: Generated ID: " + memberId);

    // 3. Insert
    console.log("DEBUG: Attempting DB Insert...");
    const { error: insertError } = await supabase
      .from('members')
      .insert([{ email, member_id: memberId, rank: 'ORIGIN' }]);

    if (insertError) {
      console.error("DEBUG: Insert Error:", insertError.message);
      throw insertError;
    }

    console.log("DEBUG: DB Saved. Handing off to Resend...");

    // 4. Email (Fire and Forget)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      resend.emails.send({
        from: 'NATITUDE <onboarding@resend.dev>',
        to: email,
        subject: 'SIGNAL RECEIVED',
        html: `<h1>ID: ${memberId}</h1>`
      }).then(() => console.log("DEBUG: Resend Accepted Email"))
        .catch((e) => console.error("DEBUG: Resend Error:", e));
    }

    console.log("--- SIGNAL COMPLETE ---");
    return { success: true, memberId };

  } catch (error: any) {
    console.error("CRITICAL ERROR:", error);
    return { success: false, error: error.message || "Unknown Connection Error" };
  }
}