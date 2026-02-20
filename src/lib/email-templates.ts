export const ritualConfirmationTemplate = (name: string, eventName: string) => `
  <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif; text-align: center;">
    <h1 style="color: #ff00ff; letter-spacing: 5px; text-transform: uppercase;">Ritual Confirmed</h1>
    <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 12px; color: #888;">Identification: ${name}</p>
    <div style="margin: 40px 0; border: 1px solid #333; padding: 20px;">
      <p style="font-size: 18px; letter-spacing: 3px;">${eventName}</p>
    </div>
    <p style="font-size: 10px; color: #555; text-transform: uppercase;">Lost in the smoke, found in the bass.</p>
  </div>
`;

export const hireReceivedTemplate = (name: string) => `
  <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif; text-align: center;">
    <h1 style="color: #ff00ff; letter-spacing: 5px; text-transform: uppercase;">Transmission Received</h1>
    <p style="font-size: 14px; letter-spacing: 1px;">We have received your request for a private sanctuary, ${name}.</p>
    <p style="margin-top: 30px; font-size: 12px; color: #888;">Our curators will contact you shortly.</p>
  </div>
`;