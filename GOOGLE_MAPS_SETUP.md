# Google Maps API Key Setup Guide

## Step 1: Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Places API** (required for address autocomplete)
   - **Maps JavaScript API** (required for maps display)
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key

## Step 2: Secure Your API Key (Important!)

1. Click on your API key to edit it
2. Under "API restrictions", select "Restrict key"
3. Choose these APIs:
   - Places API
   - Maps JavaScript API
4. Under "Application restrictions", add your domain:
   - For development: `localhost:3000`
   - For production: your actual domain (e.g., `yourdomain.com`)
5. Save the restrictions

## Step 3: Add Key to Your Project

1. Open the `.env.local` file in the root of your project
2. Replace `your_google_maps_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyC...your_actual_key_here
   ```
3. Save the file

## Step 4: Restart Your Development Server

1. Stop your current dev server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

## Step 5: Test It

1. Open your browser to `http://localhost:3000`
2. Start typing an address in the quote form
3. You should see autocomplete suggestions appear!

## Troubleshooting

### "Autocomplete not working"
- Check browser console (F12) for errors
- Verify your API key is correct in `.env.local`
- Make sure you've enabled "Places API" in Google Cloud Console
- Restart your dev server after adding the key

### "API key error" in console
- Check that your API key restrictions allow `localhost:3000`
- Verify the Places API is enabled for your project
- Check your Google Cloud billing (some APIs require billing to be enabled)

### "Maps not loading"
- Make sure "Maps JavaScript API" is enabled
- Check that your API key has the correct restrictions

## Free Tier Limits

Google Maps Platform offers a free tier:
- $200 credit per month
- Usually covers ~28,000 map loads or ~40,000 autocomplete requests
- Perfect for development and small sites

## Need Help?

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [Google Cloud Console](https://console.cloud.google.com/)

