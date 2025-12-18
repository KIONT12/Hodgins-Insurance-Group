# Fix: ApiNotActivatedMapError

## The Problem
The error "ApiNotActivatedMapError" means the **Maps JavaScript API** is not enabled for your API key.

## Quick Fix (2 minutes)

### Step 1: Enable Maps JavaScript API
👉 **Click here:** https://console.cloud.google.com/apis/library/maps-backend.googleapis.com

1. Make sure you're in the correct project (check the dropdown at the top)
2. Click the blue **"ENABLE"** button
3. Wait a few seconds for it to enable

### Step 2: Enable Places API (if not already enabled)
👉 **Click here:** https://console.cloud.google.com/apis/library/places-backend.googleapis.com

1. Click the blue **"ENABLE"** button
2. Wait for it to enable

### Step 3: Verify Both APIs are Enabled
👉 **Check here:** https://console.cloud.google.com/apis/dashboard

You should see:
- ✅ Maps JavaScript API
- ✅ Places API

### Step 4: Restart Your Dev Server
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test Again
- Refresh your browser
- Try typing an address
- The error should be gone!

---

## Alternative: Enable via Search

1. Go to: https://console.cloud.google.com/apis/library
2. Search for "Maps JavaScript API"
3. Click on it → Click "ENABLE"
4. Search for "Places API"
5. Click on it → Click "ENABLE"

---

## Still Not Working?

1. **Check your project**: Make sure you're enabling APIs in the same project where your API key was created
2. **Wait a moment**: Sometimes it takes 30-60 seconds for changes to propagate
3. **Clear browser cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check API key restrictions**: Make sure your key isn't restricted from these APIs

---

## Need to Check Your API Key?

Go to: https://console.cloud.google.com/apis/credentials

Click on your API key to see:
- Which APIs it has access to
- Any restrictions

