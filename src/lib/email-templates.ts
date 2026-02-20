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
        <p style="font-size: 9px; color: #333; text-transform: uppercase;">Natitude Sanctuary | London</p>
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
 */
export const adminNotificationTemplate = (type: 'RITUAL' | 'HIRE', details: any) => `
  <div style="background-color: #f4f4f4; color: #333; padding: 20px; font-family: sans-serif;">
    <h2 style="color: #000;">New ${type} Notification</h2>
    <table style="width: 100%; border-collapse: collapse;">
      ${Object.entries(details).map(([key, value]) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; text-transform: capitalize;">${key.replace('_', ' ')}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${value}</td>
        </tr>
      `).join('')}
    </table>
  </div>
`;