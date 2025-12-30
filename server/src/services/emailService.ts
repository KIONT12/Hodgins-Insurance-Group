import { Resend } from 'resend';

const AGENT_EMAIL = process.env.AGENT_EMAIL || 'agent@example.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

let resend: Resend | null = null;

if (RESEND_API_KEY) {
  resend = new Resend(RESEND_API_KEY);
}

function formatEmailContent(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f97316; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; margin-top: 5px; }
        .section { background: white; padding: 15px; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #f97316; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Home Insurance Quote Request</h1>
        </div>
        <div class="content">
          <div class="section">
            <h2>Contact Information</h2>
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.fullName}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Ownership:</div>
              <div class="value">${data.ownership === 'own' ? 'Own' : 'Rent'}</div>
            </div>
          </div>

          <div class="section">
            <h2>Property Address</h2>
            <div class="field">
              <div class="label">Full Address:</div>
              <div class="value">${data.address}</div>
            </div>
            ${data.city ? `<div class="field"><div class="label">City:</div><div class="value">${data.city}</div></div>` : ''}
            ${data.state ? `<div class="field"><div class="label">State:</div><div class="value">${data.state}</div></div>` : ''}
            ${data.zipCode ? `<div class="field"><div class="label">Zip Code:</div><div class="value">${data.zipCode}</div></div>` : ''}
            ${data.latitude && data.longitude ? `
            <div class="field">
              <div class="label">Location:</div>
              <div class="value">
                <a href="https://www.google.com/maps?q=${data.latitude},${data.longitude}" target="_blank">
                  View on Google Maps
                </a>
              </div>
            </div>
            ` : ''}
          </div>

          <div class="section">
            <h2>Property Details</h2>
            ${data.squareFeet ? `<div class="field"><div class="label">Square Feet:</div><div class="value">${data.squareFeet.toLocaleString()}</div></div>` : ''}
            ${data.yearBuilt ? `<div class="field"><div class="label">Year Built:</div><div class="value">${data.yearBuilt}</div></div>` : ''}
          </div>

          ${data.reviewDate || data.reviewTime ? `
          <div class="section">
            <h2>Preferred Contact</h2>
            ${data.reviewDate ? `<div class="field"><div class="label">Review Date:</div><div class="value">${data.reviewDate}</div></div>` : ''}
            ${data.reviewTime ? `<div class="field"><div class="label">Review Time:</div><div class="value">${data.reviewTime}</div></div>` : ''}
          </div>
          ` : ''}

          <div class="section">
            <p><strong>Submitted:</strong> ${new Date(data.timestamp || Date.now()).toLocaleString()}</p>
            <p><strong>Source:</strong> ${data.source || 'Hodgins Insurance Group'}</p>
            ${data.addressVerified ? '<p><strong>✓ Address Verified via Google Maps</strong></p>' : ''}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export const EmailService = {
  async sendQuoteNotification(quoteData: any): Promise<void> {
    if (!resend) {
      console.log('⚠️  Resend not configured - skipping email notification');
      return;
    }

    if (!AGENT_EMAIL) {
      console.log('⚠️  AGENT_EMAIL not set - skipping email notification');
      return;
    }

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: AGENT_EMAIL,
        subject: `New Home Insurance Quote Request - ${quoteData.fullName}`,
        html: formatEmailContent(quoteData),
      });

      console.log('✅ Email notification sent to:', AGENT_EMAIL);
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw error;
    }
  }
};

