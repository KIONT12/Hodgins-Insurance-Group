# Test Your Autocomplete Setup

## Quick Test Steps

1. **Make sure your dev server is running:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Go to: http://localhost:3000

3. **Open Browser Console (F12):**
   - Press F12 or right-click → "Inspect" → "Console" tab
   - Look for these messages:

   **✅ Success messages:**
   - "✅ Autocomplete initialized successfully"
   - No red error messages

   **❌ Error messages to watch for:**
   - "❌ Google Maps API key error"
   - "RefererNotAllowedMapError"
   - "BillingNotEnabledMapError"
   - "This API project is not authorized to use this API"

4. **Test the address input:**
   - Click on the address input field
   - Start typing: "123 Main St, Miami, FL"
   - You should see **autocomplete suggestions appear** as you type
   - Click on a suggestion to select it

## What Should Happen

✅ **Working correctly:**
- As you type, a dropdown appears with address suggestions
- Suggestions are real addresses
- Clicking a suggestion fills in the address
- Form moves to the next step (map view)

❌ **Not working:**
- No suggestions appear when typing
- Console shows error messages
- Yellow warning box appears saying "Enter your complete address manually"

## If It's Still Not Working

### Check Console Errors

1. Open browser console (F12)
2. Look for specific error messages
3. Common errors and fixes:

**"RefererNotAllowedMapError"**
- Fix: Add `localhost:3000/*` to API key restrictions

**"BillingNotEnabledMapError"**
- Fix: Enable billing in Google Cloud Console

**"This API project is not authorized to use this API"**
- Fix: Enable Places API and Maps JavaScript API

**"InvalidKeyMapError"**
- Fix: Check your API key in `.env.local`

### Verify Your Setup

Run this in your browser console (on localhost:3000):
```javascript
// Check if API key is loaded
console.log('API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'Not found');

// Test Google Maps API
if (window.google && window.google.maps) {
  console.log('✅ Google Maps loaded');
  if (window.google.maps.places) {
    console.log('✅ Places API available');
  } else {
    console.log('❌ Places API not available');
  }
} else {
  console.log('❌ Google Maps not loaded');
}
```

### Still Having Issues?

1. **Restart your dev server:**
   - Press Ctrl+C to stop
   - Run `npm run dev` again

2. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Refresh the page (F5)

3. **Check Google Cloud Console:**
   - Go to: https://console.cloud.google.com/apis/dashboard
   - Verify both APIs show as "Enabled"
   - Check API key restrictions are saved

4. **Wait a few minutes:**
   - Sometimes changes take 1-2 minutes to propagate

## Success Checklist

- [ ] Places API is enabled
- [ ] Maps JavaScript API is enabled  
- [ ] API key restrictions allow `localhost:3000/*`
- [ ] Billing is enabled
- [ ] Dev server is running
- [ ] Browser console shows "✅ Autocomplete initialized successfully"
- [ ] Typing in address field shows suggestions

If all checkboxes are ✅, autocomplete should be working!

