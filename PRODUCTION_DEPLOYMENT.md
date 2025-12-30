# Production Deployment Guide

This guide ensures your backend and frontend work correctly when deployed to production.

## 🚀 Backend Deployment

### Option 1: Railway (Recommended - Easy Setup)

1. **Sign up**: https://railway.app
2. **Create new project** → "Deploy from GitHub repo"
3. **Select your repository**
4. **Set root directory** to `server`
5. **Add environment variables**:
   ```
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://yourdomain.com,https://www.yourdomain.com
   AGENT_EMAIL=chris@hodgins.insure
   RESEND_API_KEY=re_your_key_here
   RESEND_FROM_EMAIL=noreply@hodgins.insure
   WEBHOOK_URL=https://hooks.zapier.com/...
   ```
6. **Deploy** - Railway auto-detects Node.js and runs `npm start`

### Option 2: Render

1. **Sign up**: https://render.com
2. **New** → "Web Service"
3. **Connect GitHub** and select your repo
4. **Settings**:
   - Root Directory: `server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. **Add environment variables** (same as Railway)
6. **Deploy**

### Option 3: Fly.io

1. **Install Fly CLI**: https://fly.io/docs/getting-started/installing-flyctl/
2. **Login**: `fly auth login`
3. **In server directory**: `fly launch`
4. **Add environment variables**: `fly secrets set KEY=value`
5. **Deploy**: `fly deploy`

## 🌐 Frontend Deployment

### Vercel (Recommended for Next.js)

1. **Sign up**: https://vercel.com
2. **Import your GitHub repository**
3. **Add environment variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```
4. **Deploy** - Vercel auto-detects Next.js

### Netlify

1. **Sign up**: https://netlify.com
2. **New site from Git**
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Add environment variables** (same as Vercel)

## ✅ Pre-Deployment Checklist

### Backend

- [ ] Environment variables set in hosting platform
- [ ] `NODE_ENV=production` set
- [ ] `FRONTEND_URL` includes all production domains
- [ ] `AGENT_EMAIL` is correct
- [ ] `RESEND_API_KEY` is set (if using email)
- [ ] `WEBHOOK_URL` is set (if using webhooks)
- [ ] Data directory is writable (or use database)
- [ ] Health check endpoint works: `/health`

### Frontend

- [ ] `NEXT_PUBLIC_API_URL` points to production backend
- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
- [ ] Google Maps API key restrictions include production domain
- [ ] All environment variables are set in hosting platform

## 🔧 Environment Variables Reference

### Backend (.env)

```env
# Server
PORT=3001
NODE_ENV=production

# CORS - Add all your domains (comma-separated)
FRONTEND_URL=https://hodgins.insure,https://www.hodgins.insure

# Email
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=noreply@hodgins.insure
AGENT_EMAIL=chris@hodgins.insure

# Webhook (optional)
WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...

# Data storage (optional - defaults to data/quotes.json)
QUOTES_DATA_FILE=/path/to/quotes.json

# Logging (optional)
ENABLE_LOGGING=true
```

### Frontend (.env.local or hosting platform)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://your-backend.railway.app

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## 🧪 Testing Production

### 1. Test Backend Health

```bash
curl https://your-backend.railway.app/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Hodgins Insurance Backend"
}
```

### 2. Test Quote Submission

```bash
curl -X POST https://your-backend.railway.app/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "phone": "7722444350",
    "email": "test@example.com",
    "address": "123 Main St, Miami, FL 33101"
  }'
```

### 3. Test Frontend Connection

1. Open browser console (F12)
2. Submit a quote form
3. Check Network tab for API calls
4. Verify no CORS errors

## 🐛 Common Production Issues

### CORS Errors

**Problem**: Frontend can't connect to backend

**Solution**: 
- Add your frontend domain to `FRONTEND_URL` in backend
- Use comma-separated list: `https://domain.com,https://www.domain.com`
- Restart backend after changing

### 404 Errors

**Problem**: API routes not found

**Solution**:
- Verify backend is running: check `/health` endpoint
- Check `NEXT_PUBLIC_API_URL` in frontend matches backend URL
- Ensure no trailing slashes in URLs

### Email Not Sending

**Problem**: No email notifications

**Solution**:
- Verify `RESEND_API_KEY` is set correctly
- Check `AGENT_EMAIL` is correct
- Verify Resend domain is verified (for production emails)
- Check backend logs for email errors

### Data Not Persisting

**Problem**: Quotes not saved

**Solution**:
- Check file permissions on `data/quotes.json`
- Verify `QUOTES_DATA_FILE` path is correct
- Consider upgrading to database (PostgreSQL, MongoDB)

## 📊 Monitoring

### Backend Logs

Most platforms provide logs:
- **Railway**: Dashboard → Logs tab
- **Render**: Dashboard → Logs
- **Fly.io**: `fly logs`

### Health Checks

Set up monitoring to ping `/health` endpoint:
- UptimeRobot (free)
- Pingdom
- StatusCake

## 🔒 Security Checklist

- [ ] `NODE_ENV=production` set
- [ ] API keys stored as environment variables (not in code)
- [ ] CORS configured for specific domains only
- [ ] HTTPS enabled (most platforms do this automatically)
- [ ] Rate limiting considered (add if needed)
- [ ] Input validation working (Zod schema)
- [ ] Error messages don't expose sensitive info

## 📝 Post-Deployment

1. **Test quote submission** from production frontend
2. **Verify email notifications** are received
3. **Check webhook** (if configured) receives data
4. **Monitor logs** for first few days
5. **Set up alerts** for errors

## 🆘 Support

If issues persist:
1. Check backend logs
2. Check frontend browser console
3. Verify all environment variables
4. Test health endpoint
5. Verify CORS configuration

