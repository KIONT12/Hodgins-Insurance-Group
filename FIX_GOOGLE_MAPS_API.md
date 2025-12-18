# Fix Google Maps API Issues

## Quick Fix Guide

Your API key is: `AIzaSyAXC5jsJFwYqx_D5ZfpiolxqLY28O0KhPg`

### Step 1: Enable Places API (REQUIRED)

1. Go to: https://console.cloud.google.com/apis/library/places-backend.googleapis.com
2. Click **"ENABLE"** button
3. Wait for it to enable (takes a few seconds)

### Step 2: Enable Maps JavaScript API (REQUIRED)

1. Go to: https://console.cloud.google.com/apis/library/maps-javascript-backend.googleapis.com
2. Click **"ENABLE"** button
3. Wait for it to enable

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
   - Add these referrers:
     - `localhost:3000/*`
     - `localhost:*/*`
     - `127.0.0.1:*/*`
     - `http://localhost:3000/*`
     - `https://localhost:3000/*`
   - For production, also add your domain:
     - `yourdomain.com/*`
     - `*.yourdomain.com/*`
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
- **Fix**: Add `localhost:3000/*` to API key restrictions (Step 3)

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

1. Check browser console (F12) for specific error messages
2. Verify API key in `.env.local` matches the one above
3. Make sure you restarted the dev server after changes
4. Try clearing browser cache (Ctrl+Shift+Delete)
5. Check Google Cloud Console for API usage/quota issues

## Need Help?

- Google Maps Platform Docs: https://developers.google.com/maps/documentation
- API Status: https://status.cloud.google.com/
- Support: https://developers.google.com/maps/support

