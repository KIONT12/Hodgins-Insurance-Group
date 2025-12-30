# Quick Start - Production Deployment

## 🚀 Fastest Way to Go Live

### Step 1: Deploy Backend (5 minutes)

**Using Railway (Easiest):**

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Click on the service → Settings
5. Set **Root Directory** to: `server`
6. Go to **Variables** tab and add:

```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com,https://www.yourdomain.com
AGENT_EMAIL=chris@hodgins.insure
RESEND_API_KEY=re_your_resend_key
RESEND_FROM_EMAIL=noreply@hodgins.insure
```

7. Railway will auto-deploy. Copy the URL (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend (5 minutes)

**Using Vercel (Recommended for Next.js):**

1. Go to https://vercel.com and sign up
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Go to **Settings** → **Environment Variables** and add:

```env
NEXT_PUBLIC_API_URL=https://your-app.railway.app
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

5. Click **Deploy**

### Step 3: Test (2 minutes)

1. Visit your Vercel URL
2. Fill out the quote form
3. Submit and verify:
   - ✅ Form submits successfully
   - ✅ Email notification received
   - ✅ No errors in browser console

## ✅ That's It!

Your site is now live. Both backend and frontend are deployed and working.

## 🔧 Troubleshooting

**CORS Error?**
- Add your Vercel domain to `FRONTEND_URL` in Railway
- Format: `https://your-app.vercel.app,https://yourdomain.com`

**404 Error?**
- Check `NEXT_PUBLIC_API_URL` matches your Railway URL exactly
- No trailing slashes

**Email Not Working?**
- Verify Resend API key is correct
- Check `AGENT_EMAIL` is set
- Verify Resend domain is verified (for custom domains)

## 📚 More Details

See `PRODUCTION_DEPLOYMENT.md` for:
- Alternative hosting platforms
- Detailed configuration
- Advanced setup
- Monitoring and logging

