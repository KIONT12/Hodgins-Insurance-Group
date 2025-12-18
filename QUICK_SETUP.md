# Quick Google Maps API Key Setup

## 🚀 Fastest Way (2 minutes)

### Step 1: Get Your API Key
Click this link and follow the prompts:
👉 **https://console.cloud.google.com/google/maps-apis/credentials**

1. Sign in with Google
2. Create a new project (or use existing)
3. Click "Create Credentials" → "API Key"
4. Copy the key (starts with `AIza...`)

### Step 2: Add It to Your Project

**Option A: Edit the file directly**
- Open `.env.local` in your project
- Replace `your_google_maps_api_key_here` with your actual key
- Save the file

**Option B: Use this command** (replace YOUR_KEY with your actual key):
```bash
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_KEY" > .env.local
```

### Step 3: Restart Server
```bash
npm run dev
```

### Step 4: Test It
- Go to http://localhost:3000
- Start typing an address
- You should see autocomplete suggestions! ✨

---

## 📝 What APIs Do I Need?

Enable these in Google Cloud Console:
- ✅ **Places API** (for address autocomplete)
- ✅ **Maps JavaScript API** (for map display)

## 💰 Cost?

- **FREE**: $200 credit per month
- Usually covers ~28,000 map loads
- Perfect for development and small sites
- No credit card required for free tier

## 🔒 Security

After creating your key:
1. Click on the key to edit it
2. Under "API restrictions" → Select only:
   - Places API
   - Maps JavaScript API
3. Under "Application restrictions" → Add:
   - `localhost:3000` (for development)
   - Your domain (for production)

---

## ❓ Need Help?

- [Google Maps Platform Docs](https://developers.google.com/maps/documentation)
- Check `GOOGLE_MAPS_SETUP.md` for detailed instructions

