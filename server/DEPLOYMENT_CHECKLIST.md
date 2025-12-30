# Deployment Checklist

Use this checklist before going live to ensure everything works.

## Pre-Deployment

### Backend Setup
- [ ] All dependencies installed (`npm install`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables configured
- [ ] Health check works (`/health` endpoint)
- [ ] CORS configured for production domains
- [ ] Email service configured (Resend API key)
- [ ] Webhook URL set (if using)

### Frontend Setup
- [ ] Build succeeds (`npm run build`)
- [ ] `NEXT_PUBLIC_API_URL` set to production backend
- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` configured
- [ ] Google Maps API key restrictions include production domain

## Deployment Steps

### 1. Deploy Backend
- [ ] Choose hosting platform (Railway, Render, Fly.io)
- [ ] Connect GitHub repository
- [ ] Set root directory to `server`
- [ ] Configure build command: `npm install && npm run build`
- [ ] Configure start command: `npm start`
- [ ] Add all environment variables
- [ ] Deploy and verify health check

### 2. Deploy Frontend
- [ ] Choose hosting platform (Vercel, Netlify)
- [ ] Connect GitHub repository
- [ ] Add environment variables
- [ ] Deploy

### 3. Post-Deployment Testing
- [ ] Test health endpoint: `https://your-backend.com/health`
- [ ] Test quote submission from production site
- [ ] Verify email notification received
- [ ] Check browser console for errors
- [ ] Test address autocomplete
- [ ] Verify all form steps work
- [ ] Test on mobile device

## Environment Variables

### Backend (Production)
```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com,https://www.yourdomain.com
AGENT_EMAIL=chris@hodgins.insure
RESEND_API_KEY=re_your_key
RESEND_FROM_EMAIL=noreply@hodgins.insure
WEBHOOK_URL=https://hooks.zapier.com/...
```

### Frontend (Production)
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## Quick Test Commands

```bash
# Test backend health
curl https://your-backend.com/health

# Test quote submission
curl -X POST https://your-backend.com/api/quotes \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","phone":"7722444350","email":"test@example.com","address":"123 Main St, Miami, FL 33101"}'
```

## Common Issues

- **CORS Error**: Add frontend domain to `FRONTEND_URL`
- **404 Error**: Check `NEXT_PUBLIC_API_URL` matches backend URL
- **Email Not Sending**: Verify Resend API key and domain
- **Maps Not Working**: Check API key restrictions include production domain

