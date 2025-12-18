#!/usr/bin/env node

/**
 * Google Maps API Key Setup Helper
 * This script helps you set up your Google Maps API key
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n📍 Google Maps API Key Setup\n');
  console.log('This will help you add your Google Maps API key to .env.local\n');

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Check if key already exists
  if (envContent.includes('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=') && 
      !envContent.includes('your_google_maps_api_key_here')) {
    const existingKey = envContent.match(/NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=(.+)/)?.[1]?.trim();
    if (existingKey) {
      console.log('✅ You already have an API key set:', existingKey.substring(0, 20) + '...');
      const replace = await question('\nDo you want to replace it? (y/n): ');
      if (replace.toLowerCase() !== 'y') {
        console.log('\nKeeping existing key. Setup complete!');
        rl.close();
        return;
      }
    }
  }

  console.log('\n📋 Step 1: Get your Google Maps API Key');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('1. Go to: https://console.cloud.google.com/');
  console.log('2. Sign in with your Google account');
  console.log('3. Create a new project (or select existing)');
  console.log('4. Enable these APIs:');
  console.log('   - Places API');
  console.log('   - Maps JavaScript API');
  console.log('5. Go to: APIs & Services > Credentials');
  console.log('6. Click: Create Credentials > API Key');
  console.log('7. Copy your API key\n');

  const hasKey = await question('Do you already have an API key? (y/n): ');
  
  if (hasKey.toLowerCase() === 'y') {
    const apiKey = await question('\nPaste your API key here: ');
    
    if (!apiKey || apiKey.trim().length < 10) {
      console.log('\n❌ Invalid API key. Please try again.');
      rl.close();
      return;
    }

    // Update .env.local
    let newEnvContent = envContent;
    
    if (newEnvContent.includes('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=')) {
      // Replace existing key
      newEnvContent = newEnvContent.replace(
        /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=.*/,
        `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${apiKey.trim()}`
      );
    } else {
      // Add new key
      if (newEnvContent && !newEnvContent.endsWith('\n')) {
        newEnvContent += '\n';
      }
      newEnvContent += `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${apiKey.trim()}\n`;
    }

    fs.writeFileSync(envPath, newEnvContent);
    console.log('\n✅ API key added to .env.local!');
    console.log('\n📋 Next Steps:');
    console.log('1. Restart your dev server: npm run dev');
    console.log('2. Test the address autocomplete in your form');
    console.log('\n✨ Setup complete!\n');
    
  } else {
    console.log('\n📖 Quick Guide to Get Your API Key:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('1. Visit: https://console.cloud.google.com/google/maps-apis/credentials');
    console.log('2. Click "Create Credentials" > "API Key"');
    console.log('3. Copy the key that appears');
    console.log('4. Run this script again and paste your key');
    console.log('\n💡 Tip: Google gives $200 free credit per month (usually enough for development)');
    console.log('\nOnce you have your key, run: node setup-google-maps.js\n');
  }

  rl.close();
}

main().catch(console.error);

