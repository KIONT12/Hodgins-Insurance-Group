# Email Configuration Verification ✅

The quote form is **correctly configured** to use Resend for sending emails with the following environment variables:

## ✅ Environment Variables Used

### Required:
- **`RESEND_API_KEY`** - Your Resend API key (starts with `re_`)
- **`AGENT_EMAIL`** - Email address to receive quote notifications (e.g., `chris@hodgins.insure`)

### Optional:
- **`RESEND_FROM_EMAIL`** - Email address to send from (defaults to `onboarding@resend.dev` for testing)

## 📧 Where Emails Are Sent

### Option 1: Next.js API Route (`/api/quote`)
**File:** `app/api/quote/route.ts`

**Configuration:**
- Uses `process.env.RESEND_API_KEY`
- Uses `process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'`
- Uses `process.env.AGENT_EMAIL || 'agent@example.com'`

**Used when:**
- `NEXT_PUBLIC_API_URL` is NOT set (default behavior)
- Quote form submits to `/api/quote`

### Option 2: Backend Server (`/api/quotes`)
**File:** `server/src/services/emailService.ts`

**Configuration:**
- Uses `process.env.RESEND_API_KEY`
- Uses `process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'`
- Uses `process.env.AGENT_EMAIL || 'agent@example.com'`

**Used when:**
- `NEXT_PUBLIC_API_URL` IS set (points to backend server)
- Quote form submits to `${API_URL}/api/quotes`

## 🔧 Setup Instructions

### 1. Add to `.env.local` (Root Directory)

For **Next.js API route** (default):
```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
AGENT_EMAIL=chris@hodgins.insure
```

### 2. Add to `server/.env` (If Using Backend Server)

For **backend server**:
```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
AGENT_EMAIL=chris@hodgins.insure
```

## ✅ Verification Checklist

- [x] Next.js API route uses `RESEND_API_KEY` ✓
- [x] Next.js API route uses `RESEND_FROM_EMAIL` ✓
- [x] Next.js API route uses `AGENT_EMAIL` ✓
- [x] Backend server uses `RESEND_API_KEY` ✓
- [x] Backend server uses `RESEND_FROM_EMAIL` ✓
- [x] Backend server uses `AGENT_EMAIL` ✓
- [x] Quote form submits to correct endpoint ✓
- [x] Email service properly initialized ✓

## 🧪 Testing

1. **Submit a test quote** through the form
2. **Check console logs** for:
   - `✅ Email sent successfully to: [AGENT_EMAIL]` (success)
   - `⚠️  RESEND_API_KEY not set` (missing key)
   - `❌ Email sending failed: [error]` (error)
3. **Check email inbox** at `AGENT_EMAIL`
4. **Check Resend dashboard**: https://resend.com/emails

## 📝 Notes

- Both API endpoints use the **same environment variable names**
- If `RESEND_API_KEY` is not set, emails are skipped but form submission still succeeds
- Default `from` email is `onboarding@resend.dev` (for testing)
- For production, verify your domain in Resend and use your domain email

