# Agent Setup Guide - Receiving Quote Submissions

## ✅ What's Already Working

I've created an API route at `/app/api/quote/route.ts` that receives all quote submissions. The form now sends data to this endpoint automatically.

## 📧 Option 1: Email Notifications (Recommended)

### Using Resend (Easiest - Free tier available)

1. **Sign up for Resend**: https://resend.com
2. **Get your API key** from the dashboard
3. **Add to `.env.local`**:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   AGENT_EMAIL=your-email@example.com
   ```
4. **Update the API route** - Uncomment the Resend code in `app/api/quote/route.ts` (lines 60-70)
5. **Restart your server**: `npm run dev`

### Using SendGrid

1. **Sign up for SendGrid**: https://sendgrid.com
2. **Get your API key**
3. **Add to `.env.local`**:
   ```env
   SENDGRID_API_KEY=SG.your_api_key_here
   AGENT_EMAIL=your-email@example.com
   ```
4. **Install SendGrid**: `npm install @sendgrid/mail`
5. **Update the API route** to use SendGrid

### Using Gmail SMTP (Free but less reliable)

1. **Enable 2FA on your Gmail account**
2. **Generate an App Password**: https://myaccount.google.com/apppasswords
3. **Add to `.env.local`**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your_app_password
   AGENT_EMAIL=your-email@gmail.com
   ```
4. **Install Nodemailer**: `npm install nodemailer`
5. **Update the API route** to use Nodemailer

---

## 🔗 Option 2: Webhook Integration (Zapier/Make.com)

### Using Zapier (No coding required)

1. **Create a Zapier account**: https://zapier.com
2. **Create a new Zap**:
   - Trigger: "Webhooks by Zapier" → "Catch Hook"
   - Copy the webhook URL
3. **Add to `.env.local`**:
   ```env
   WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url
   ```
4. **Set up actions** in Zapier:
   - Send email
   - Add to Google Sheets
   - Add to CRM
   - Send SMS
   - etc.

### Using Make.com (formerly Integromat)

1. **Create a Make.com account**: https://make.com
2. **Create a new scenario** with a webhook trigger
3. **Copy the webhook URL**
4. **Add to `.env.local`**:
   ```env
   WEBHOOK_URL=https://hook.integromat.com/your-webhook-url
   ```

---

## 📊 Option 3: Database Storage

### Using Supabase (Free tier available)

1. **Create a Supabase project**: https://supabase.com
2. **Create a table** for quotes
3. **Get your API URL and key**
4. **Add to `.env.local`**:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-key
   ```
5. **Update the API route** to save to Supabase

### Using Google Sheets

1. **Use Zapier/Make.com** (Option 2) to send to Google Sheets
2. **Or use Google Sheets API** directly

---

## 🚀 Quick Start (Immediate Solution)

**For now, submissions are being logged to the console.** To see them:

1. **Check your terminal** where `npm run dev` is running
2. **Look for "New quote submission:" logs**
3. **All data is also stored in browser sessionStorage** (temporary)

**To get email notifications immediately:**

1. **Use Zapier** (Option 2) - it's the fastest setup (5 minutes)
2. **Or set up Resend** (Option 1) - more reliable long-term

---

## 📝 What Data is Sent?

Each submission includes:
- ✅ Full contact information (name, phone, email)
- ✅ Complete property address
- ✅ Property details (square feet, year built)
- ✅ Preferred contact date/time
- ✅ Google Maps coordinates (if available)
- ✅ Timestamp and source

---

## 🔧 Testing

1. **Fill out the form** on your site
2. **Submit it**
3. **Check your email/webhook/database** for the new submission
4. **Check the browser console** (F12) for any errors

---

## 💡 Recommended Setup

**Best for most users:**
1. **Resend** for email notifications (free tier: 3,000 emails/month)
2. **Zapier** for additional automation (add to CRM, send SMS, etc.)

This gives you:
- ✅ Email notifications immediately
- ✅ Automatic CRM updates
- ✅ SMS notifications (optional)
- ✅ Google Sheets backup
- ✅ All without coding!

---

## ❓ Need Help?

- Check the API route: `app/api/quote/route.ts`
- Check server logs in your terminal
- Check browser console (F12) for errors
- All submissions are logged with: `console.log('New quote submission:', ...)`

