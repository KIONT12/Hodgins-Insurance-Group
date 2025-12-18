# Resend Email Setup - Step by Step

## Step 1: Sign Up for Resend (2 minutes)

1. Go to: https://resend.com
2. Click "Sign Up" (you can use Google/GitHub to sign in quickly)
3. Verify your email address
4. **Free tier**: 3,000 emails/month, 100 emails/day - perfect for getting started!

## Step 2: Get Your API Key

1. Once logged in, go to: https://resend.com/api-keys
2. Click "Create API Key"
3. Give it a name (e.g., "Quote Form")
4. **Copy the API key** - it starts with `re_` (you'll only see it once!)

## Step 3: Verify Your Domain (Optional but Recommended)

**For production:**
1. Go to: https://resend.com/domains
2. Click "Add Domain"
3. Add your domain (e.g., `yourdomain.com`)
4. Add the DNS records they provide to your domain

**For testing/development:**
- You can use Resend's test domain: `onboarding@resend.dev`
- Or skip domain verification for now (emails will come from Resend's domain)

## Step 4: Install Resend Package

Run this command in your project:

```bash
npm install resend
```

## Step 5: Add API Key to .env.local

1. Open `.env.local` in your project root
2. Add these lines:

```env
RESEND_API_KEY=re_your_api_key_here
AGENT_EMAIL=your-email@example.com
```

Replace:
- `re_your_api_key_here` with the API key you copied from Resend
- `your-email@example.com` with the email where you want to receive quote submissions

## Step 6: Update the API Route

The API route is already set up! Just need to uncomment the Resend code.

Open `app/api/quote/route.ts` and find lines 70-79. Uncomment them (remove the `/*` and `*/`):

**Change this:**
```typescript
/*
if (process.env.RESEND_API_KEY) {
  const resend = require('resend').Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'quotes@yourdomain.com',
    to: AGENT_EMAIL,
    subject: `New Home Insurance Quote Request - ${data.fullName}`,
    html: emailContent,
  });
}
*/
```

**To this:**
```typescript
if (process.env.RESEND_API_KEY) {
  const { Resend } = require('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: 'onboarding@resend.dev', // Use your domain after verification: 'quotes@yourdomain.com'
    to: AGENT_EMAIL,
    subject: `New Home Insurance Quote Request - ${data.fullName}`,
    html: emailContent,
  });
}
```

## Step 7: Restart Your Server

1. Stop your dev server (Ctrl+C)
2. Start it again:
```bash
npm run dev
```

## Step 8: Test It!

1. Fill out the quote form on your site
2. Submit it
3. Check your email inbox (and spam folder)
4. You should receive a beautifully formatted email with all the quote details!

---

## Troubleshooting

### "Invalid API Key"
- Make sure you copied the full API key (starts with `re_`)
- Check that there are no extra spaces in `.env.local`
- Restart your server after adding the key

### "Domain not verified"
- For testing, use `onboarding@resend.dev` as the `from` address
- For production, verify your domain in Resend dashboard

### "Email not received"
- Check spam folder
- Check Resend dashboard → Logs to see if email was sent
- Check your terminal for any error messages

### "Module not found: resend"
- Run: `npm install resend`
- Make sure you're in the project root directory

---

## What You'll Receive

Each email will include:
- ✅ Contact information (name, phone, email)
- ✅ Complete property address with Google Maps link
- ✅ Property details (square feet, year built)
- ✅ Preferred contact date/time
- ✅ Formatted in a nice HTML email template

---

## Next Steps

Once it's working:
1. **Verify your domain** for production use
2. **Update the `from` address** to use your domain
3. **Set up email filters** in your inbox to organize quotes
4. **Consider adding SMS notifications** (via Zapier/Make.com)

---

## Need Help?

- Resend Docs: https://resend.com/docs
- Resend Dashboard: https://resend.com/emails (see all sent emails)
- Check your terminal logs for detailed error messages

