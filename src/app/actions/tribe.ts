"use server";

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Clients
const supabase = createClient(
  process.env.SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinTribe(email: string) {
  try {
    // 1. Check if the signal is already active
    const { data: existing, error: checkError } = await supabase
      .from('members')
      .select('member_id')
      .eq('email', email)
      .single();

    // If they exist, return the ID immediately to stop the hang
    if (existing) {
      return { 
        success: true, 
        memberId: existing.member_id, 
        message: "Signal already active." 
      };
    }

    // 2. Generate a unique ID (Starting from NT-1001)
    const { count } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true });
    
    const memberNumber = (count || 0) + 1001;
    const memberId = `NT-${memberNumber}`;

    // 3. Anchor the Identity in Supabase
    const { error: dbError } = await supabase
      .from('members')
      .insert([{ 
        email, 
        member_id: memberId, 
        rank: 'ORIGIN' 
      }]);

    if (dbError) {
      console.error("Database Insert Error:", dbError.message);
      throw new Error("Database insertion failed");
    }

    // 4. Dispatch the Welcome Transmission (Wrapped so it doesn't block the UI if it fails)
    try {
      await resend.emails.send({
        // IMPORTANT: Use 'onboarding@resend.dev' until your domain is verified in Resend
        from: 'NATITUDE <onboarding@resend.dev>', 
        to: email,
        subject: 'SIGNAL RECEIVED // YOUR IDENTITY IS ANCHORED',
        html: `
          <!DOCTYPE html>
          <html>
            <body style="background-color: #000000; margin: 0; padding: 0; font-family: sans-serif;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table width="100%" style="max-width: 500px; border: 1px solid #1a1a1a; background-color: #050505;">
                      <tr>
                        <td align="center" style="padding: 50px 40px 30px 40px;">
                          <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 0.8em; text-transform: uppercase; margin: 0; border-bottom: 2px solid #ff00ff; padding-bottom: 20px; display: inline-block;">
                            NATITUDE
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding: 0 40px 20px 40px;">
                          <p style="color: #ff00ff; font-size: 10px; font-weight: bold; letter-spacing: 0.5em; text-transform: uppercase; margin: 0;">
                            ● SIGNAL ACTIVE
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 30px 40px;">
                          <div style="border: 1px solid #333; padding: 30px; background-color: #000; text-align: left;">
                            <p style="color: #666; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 5px 0;">Identity Code</p>
                            <p style="color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 0.2em; margin: 0;">${memberId}</p>
                            <p style="color: #666; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; margin: 20px 0 5px 0;">Classification</p>
                            <p style="color: #ffffff; font-size: 12px; font-weight: normal; letter-spacing: 0.4em; margin: 0;">ORIGIN TRIBE</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 40px 40px 40px;">
                          <p style="color: #999; font-size: 11px; line-height: 1.8; letter-spacing: 0.1em; margin: 0 0 20px 0;">
                            You are now part of the sanctuary. This digital ID is your key to hidden rituals and sonic experiments.
                          </p>
                          <p style="color: #ffffff; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; margin: 0;">
                            PERK: WELCOME RITUAL
                          </p>
                          <p style="color: #666; font-size: 9px; letter-spacing: 0.1em; margin: 5px 0 0 0;">
                            Present this transmission at the bar to claim your first credit.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding: 30px 40px; background-color: #0a0a0a; border-top: 1px solid #1a1a1a;">
                          <p style="color: #444; font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase; margin: 0;">
                            BURY ST EDMUNDS &bull; SONIC SANCTUARY &bull; MMXXIV
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `
      });
    } catch (emailError) {
      // We log the error but don't stop the success return
      console.error("Resend Email Error:", emailError);
    }

    return { success: true, memberId };
  } catch (error) {
    console.error("Tribe Join Error:", error);
    return { success: false, error: "Transmission Interrupted" };
  }
}