# Fix Google Maps API Issues

## Quick Fix Guide

Your API key is: `AIzaSyAXC5jsJFwYqx_D5ZfpiolxqLY28O0KhPg`

### Step 1: Enable Places API (REQUIRED)

**Method 1: Direct Link (if page loads)**
1. Go to: https://console.cloud.google.com/apis/library/places-backend.googleapis.com
2. Click **"ENABLE"** button
3. Wait for it to enable (takes a few seconds)

**Method 2: Via API Library (if direct link fails)**
1. Go to: https://console.cloud.google.com/apis/library
2. Search for "Places API"
3. Click on "Places API"
4. Click **"ENABLE"** button

**Method 3: Via API Dashboard**
1. Go to: https://console.cloud.google.com/apis/dashboard
2. Click **"+ ENABLE APIS AND SERVICES"** at the top
3. Search for "Places API"
4. Click on it and click **"ENABLE"**

### Step 2: Enable Maps JavaScript API (REQUIRED)

**Method 1: Direct Link (if page loads)**
1. Go to: https://console.cloud.google.com/apis/library/maps-javascript-backend.googleapis.com
2. Click **"ENABLE"** button
3. Wait for it to enable

**Method 2: Via API Library (if direct link fails)**
1. Go to: https://console.cloud.google.com/apis/library
2. Search for "Maps JavaScript API"
3. Click on "Maps JavaScript API"
4. Click **"ENABLE"** button

**Method 3: Via API Dashboard**
1. Go to: https://console.cloud.google.com/apis/dashboard
2. Click **"+ ENABLE APIS AND SERVICES"** at the top
3. Search for "Maps JavaScript API"
4. Click on it and click **"ENABLE"**

**If pages won't load:**
- Try refreshing the page (F5)
- Try a different browser
- Clear browser cache
- Try incognito/private mode
- Wait a few minutes and try again (Google Cloud Console can have temporary issues)

### Step 3: Fix API Key Restrictions

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your API key: `AIzaSyAXC5jsJFwYqx_D5ZfpiolxqLY28O0KhPg`
3. Click on the key name to edit it
4. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Check these APIs:
     - ✅ Places API
     - ✅ Maps JavaScript API
5. Under **"Application restrictions"**:
   - Select **"HTTP referrers (web sites)"**
   - Click **"ADD AN ITEM"**
   - **Add these referrers (choose what you need):**
     - **Required for development:**
       - `localhost:3000/*` ← **MUST ADD** (your dev server runs on port 3000)
     - **Optional but recommended (explained below):**
       - `localhost:*/*` ← Allows any port (useful if you change ports)
       - `127.0.0.1:*/*` ← IP address version (backup)
     - **Usually not needed (but safe to add):**
       - `http://localhost:3000/*`
       - `https://localhost:3000/*`
   
   **What "Optional but recommended" means:**
   - **You don't NEED them** - Your app will work with just `localhost:3000/*`
   - **But they're helpful** - They prevent issues if:
     - You run the server on a different port (like 3001, 3002, etc.)
     - Your browser uses `127.0.0.1` instead of `localhost`
     - You switch between different development setups
   - **Think of it like:** Required = "Must have", Optional but recommended = "Nice to have, prevents future headaches"
   - **For production, also add your domain:**
     - `yourdomain.com/*`
     - `*.yourdomain.com/*`
   - **💡 Tip:** Start with just `localhost:3000/*` - you can add more later if needed
6. Click **"SAVE"**

### Step 4: Enable Billing (REQUIRED - But FREE!)

1. Go to: https://console.cloud.google.com/billing
2. If you don't have a billing account:
   - Click **"LINK A BILLING ACCOUNT"**
   - Click **"CREATE BILLING ACCOUNT"**
   - Fill in your information (credit card required, but won't be charged)
   - Google gives $200 FREE credit per month
   - This covers ~28,000 map loads - plenty for development!
3. Link the billing account to your project

### Step 5: Verify Everything Works

1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Open: http://localhost:3000
3. Open browser console (F12)
4. Look for:
   - ✅ "Autocomplete initialized successfully" = Working!
   - ❌ Any red errors = Check the error message

## Common Error Messages & Fixes

### "This API project is not authorized to use this API"
- **Fix**: Enable Places API (Step 1 above)

### "RefererNotAllowedMapError"
- **Fix**: Add referrers to API key restrictions (Step 3)
- **Minimum required:** `localhost:3000/*`
- **Recommended:** Also add `localhost:*/*` and `127.0.0.1:*/*` for flexibility
### "BillingNotEnabledMapError"
- **Fix**: Enable billing (Step 4 above)

### "InvalidKeyMapError"
- **Fix**: Check that your API key is correct in `.env.local`

## Test Your API Key

Run this in your browser console (on your site):
```javascript
fetch(`https://maps.googleapis.com/maps/api/js?key=AIzaSyAXC5jsJFwYqx_D5ZfpiolxqLY28O0KhPg&libraries=places`)
  .then(r => r.text())
  .then(console.log)
  .catch(console.error)
```

If you see errors, check the message and follow the fixes above.

## Still Not Working?

### If Google Cloud Console pages won't load:
1. **Try a different browser** (Chrome, Firefox, Edge)
2. **Clear browser cache** (Ctrl+Shift+Delete)
3. **Try incognito/private mode**
4. **Wait 5-10 minutes** - Google Cloud Console can have temporary outages
5. **Use the API Dashboard method** instead of direct links

### If APIs are enabled but autocomplete still doesn't work:
1. Check browser console (F12) for specific error messages
2. Verify API key in `.env.local` matches: `AIzaSyAXC5jsJFwYqx_D5ZfpiolxqLY28O0KhPg`
3. Make sure you restarted the dev server after changes: `npm run dev`
4. Check Google Cloud Console for API usage/quota issues
5. Verify billing is enabled (even if free tier)
6. Double-check API key restrictions allow `localhost:3000/*`

## Need Help?

- Google Maps Platform Docs: https://developers.google.com/maps/documentation
- API Status: https://status.cloud.google.com/
- Support: https://developers.google.com/maps/support

