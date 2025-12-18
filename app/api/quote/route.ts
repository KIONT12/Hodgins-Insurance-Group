import { NextRequest, NextResponse } from 'next/server';

// Email configuration - you can use services like:
// - Resend (recommended): https://resend.com
// - SendGrid: https://sendgrid.com
// - Nodemailer with Gmail/SMTP
// - Or a webhook service like Zapier/Make.com

const AGENT_EMAIL = process.env.AGENT_EMAIL || 'agent@example.com';
const WEBHOOK_URL = process.env.WEBHOOK_URL; // Optional: Zapier, Make.com, etc.

// Lazy load Resend to avoid build-time errors
let Resend: any = null;
async function getResend() {
  if (!Resend && process.env.RESEND_API_KEY) {
    try {
      const resendModule = await import('resend');
      Resend = resendModule.Resend;
    } catch (error) {
      console.warn('Resend package not available:', error);
    }
  }
  return Resend;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.fullName || !data.phone || !data.email || !data.address) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the email content
    const emailContent = formatEmailContent(data);
    
    // Log the submission (for debugging and immediate visibility)
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('📧 NEW QUOTE SUBMISSION RECEIVED');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('👤 Name:', data.fullName);
    console.log('📞 Phone:', data.phone);
    console.log('📧 Email:', data.email);
    console.log('🏠 Address:', data.address);
    console.log('📍 City:', data.city, '| Zip:', data.zipCode);
    console.log('📐 Square Feet:', data.squareFeet || 'Not provided');
    console.log('🏗️  Year Built:', data.yearBuilt || 'Not provided');
    console.log('📅 Preferred Date:', data.reviewDate || 'Not specified');
    console.log('⏰ Preferred Time:', data.reviewTime || 'Not specified');
    console.log('🕐 Submitted:', new Date(data.timestamp || Date.now()).toLocaleString());
    console.log('═══════════════════════════════════════════════════════════\n');

    // Option 1: Send to webhook (Zapier, Make.com, etc.)
    if (WEBHOOK_URL) {
      try {
        const webhookResponse = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (webhookResponse.ok) {
          return NextResponse.json({ 
            success: true, 
            message: 'Quote submitted successfully' 
          });
        }
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
        // Continue to email fallback
      }
    }

    // Option 2: Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const ResendClass = await getResend();
        if (ResendClass) {
          const resend = new ResendClass(process.env.RESEND_API_KEY);
          
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev', // Use your verified domain in production
            to: AGENT_EMAIL,
            subject: `New Home Insurance Quote Request - ${data.fullName}`,
            html: emailContent,
          });
          
          console.log('✅ Email sent successfully to:', AGENT_EMAIL);
        } else {
          console.log('⚠️  Resend package not available - email notifications disabled');
        }
      } catch (emailError: any) {
        console.error('❌ Email sending failed:', emailError.message);
        // Don't fail the request if email fails - still return success
      }
    } else {
      console.log('⚠️  RESEND_API_KEY not set - email notifications disabled');
      console.log('   Set RESEND_API_KEY in .env.local to enable email notifications');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Quote submitted successfully. An agent will contact you shortly.' 
    });

  } catch (error: any) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit quote' },
      { status: 500 }
    );
  }
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
            ${data.streetAddress ? `<div class="field"><div class="label">Street:</div><div class="value">${data.streetAddress}</div></div>` : ''}
            <div class="field">
              <div class="label">City:</div>
              <div class="value">${data.city}</div>
            </div>
            <div class="field">
              <div class="label">State:</div>
              <div class="value">${data.state}</div>
            </div>
            <div class="field">
              <div class="label">Zip Code:</div>
              <div class="value">${data.zipCode}</div>
            </div>
            ${data.county ? `<div class="field"><div class="label">County:</div><div class="value">${data.county}</div></div>` : ''}
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
            <div class="field">
              <div class="label">Square Feet:</div>
              <div class="value">${data.squareFeet ? data.squareFeet.toLocaleString() : 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Year Built:</div>
              <div class="value">${data.yearBuilt || 'Not provided'}</div>
            </div>
          </div>

          <div class="section">
            <h2>Preferred Contact</h2>
            <div class="field">
              <div class="label">Review Date:</div>
              <div class="value">${data.reviewDate || 'Not specified'}</div>
            </div>
            <div class="field">
              <div class="label">Review Time:</div>
              <div class="value">${data.reviewTime || 'Not specified'}</div>
            </div>
          </div>

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

