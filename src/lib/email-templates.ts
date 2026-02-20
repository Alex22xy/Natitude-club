/**
 * RITUAL CONFIRMATION (Sent to the User)
 */
export const ritualConfirmationTemplate = (name: string, eventName: string) => {
  const safeName = name || 'Seeker';
  const safeEvent = eventName || 'The Ritual';
  
  return `
    <div style="background-color: #000000; color: #ffffff; padding: 50px 20px; font-family: 'Helvetica', Arial, sans-serif; text-align: center; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ff00ff; letter-spacing: 8px; text-transform: uppercase; font-size: 24px; margin-bottom: 20px;">Ritual Confirmed</h1>
      <p style="text-transform: uppercase; letter-spacing: 3px; font-size: 11px; color: #666666; margin-bottom: 40px;">Guest Identification: ${safeName}</p>
      
      <div style="margin: 40px 0; border: 1px solid #222222; padding: 30px; background-color: #050505;">
        <p style="font-size: 10px; color: #ff00ff; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 10px;">Access Granted To</p>
        <p style="font-size: 20px; letter-spacing: 4px; text-transform: uppercase; margin: 0; font-weight: bold;">${safeEvent}</p>
      </div>
      
      <p style="font-size: 10px; color: #444444; text-transform: uppercase; letter-spacing: 5px; margin-top: 50px;">Lost in the smoke, found in the bass.</p>
      <div style="margin-top: 20px; border-top: 1px solid #111; padding-top: 20px;">
        <p style="font-size: 9px; color: #333; text-transform: uppercase;">Natitude Sanctuary</p>
      </div>
    </div>
  `;
};

/**
 * HIRE ENQUIRY CONFIRMATION (Sent to the User)
 */
export const hireReceivedTemplate = (name: string) => {
  const safeName = name || 'Guest';
  
  return `
    <div style="background-color: #000000; color: #ffffff; padding: 50px 20px; font-family: 'Helvetica', Arial, sans-serif; text-align: center; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ff00ff; letter-spacing: 8px; text-transform: uppercase; font-size: 24px; margin-bottom: 20px;">Transmission Received</h1>
      <p style="font-size: 14px; letter-spacing: 1px; color: #dddddd; line-height: 1.6;">We have received your request for a private sanctuary, ${safeName}.</p>
      <p style="margin-top: 30px; font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 2px;">Our curators will review your transmission and contact you shortly.</p>
      
      <div style="margin-top: 60px; border-top: 1px solid #111; padding-top: 20px;">
        <p style="font-size: 9px; color: #333; text-transform: uppercase; letter-spacing: 3px;">Natitude Operations</p>
      </div>
    </div>
  `;
};

/**
 * INTERNAL ADMIN NOTIFICATION (Sent to YOU)
 * Dark mode styling for your personal inbox summary
 */
export const adminNotificationTemplate = (type: 'RITUAL' | 'HIRE', details: any) => `
  <div style="background-color: #0a0a0a; color: #ffffff; padding: 30px; font-family: 'Helvetica', Arial, sans-serif; border: 1px solid #ff00ff;">
    <h2 style="color: #ff00ff; text-transform: uppercase; letter-spacing: 3px; font-size: 18px; border-bottom: 1px solid #222; padding-bottom: 15px;">New ${type} Lead</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      ${Object.entries(details).map(([key, value]) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; width: 120px;">${key.replace('_', ' ')}</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; font-size: 13px; color: #eee;">${value}</td>
        </tr>
      `).join('')}
    </table>
    <p style="font-size: 9px; color: #333; margin-top: 20px; text-transform: uppercase;">Sent via NATITUDE System</p>
  </div>
`;