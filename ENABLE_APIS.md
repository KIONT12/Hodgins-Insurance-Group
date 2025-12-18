# How to Enable Google Maps APIs

## Step-by-Step Guide

### Step 1: Go to API Library
1. Go to: https://console.cloud.google.com/apis/library
2. Make sure you're in the correct project (top dropdown)

### Step 2: Enable Places API
1. In the search bar, type: **"Places API"**
2. Click on **"Places API"** (by Google)
3. Click the blue **"ENABLE"** button
4. Wait for it to enable (takes a few seconds)

### Step 3: Enable Maps JavaScript API
1. Go back to the API Library (or search again)
2. In the search bar, type: **"Maps JavaScript API"**
3. Click on **"Maps JavaScript API"** (by Google)
4. Click the blue **"ENABLE"** button
5. Wait for it to enable

### Step 4: Verify APIs are Enabled
1. Go to: https://console.cloud.google.com/apis/dashboard
2. You should see both APIs listed:
   - ✅ Places API
   - ✅ Maps JavaScript API

### Step 5: Create API Key (if you haven't already)
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click **"Create Credentials"** → **"API Key"**
3. Copy your API key

---

## Direct Links

**Enable Places API:**
👉 https://console.cloud.google.com/apis/library/places-backend.googleapis.com

**Enable Maps JavaScript API:**
👉 https://console.cloud.google.com/apis/library/maps-backend.googleapis.com

**View All Enabled APIs:**
👉 https://console.cloud.google.com/apis/dashboard

**Create API Key:**
👉 https://console.cloud.google.com/apis/credentials

---

## Quick Search Method

If the direct links don't work:
1. Go to: https://console.cloud.google.com/apis/library
2. Use the search bar at the top
3. Search for:
   - "Places API"
   - "Maps JavaScript API"
4. Click on each one and click "ENABLE"

---

## Troubleshooting

**"API not found"**
- Make sure you're in the correct Google Cloud project
- Check the project dropdown at the top of the page

**"Enable button is grayed out"**
- You might need to set up billing (free tier is available)
- Or you might already have it enabled - check the dashboard

**"Permission denied"**
- Make sure you're signed in with a Google account that has project access
- You might need to be the project owner or have Editor permissions

