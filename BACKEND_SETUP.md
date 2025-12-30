# Backend Server Setup Guide

A standalone Express.js backend server has been created for handling insurance quote submissions.

## 📁 Backend Structure

```
server/
├── src/
│   ├── index.ts              # Main server entry point
│   ├── routes/
│   │   └── quote.ts          # Quote API routes
│   ├── controllers/
│   │   └── quoteController.ts # Quote business logic
│   ├── services/
│   │   ├── quoteService.ts   # Quote data management
│   │   └── emailService.ts   # Email notifications
│   └── middleware/
│       ├── validation.ts     # Input validation
│       └── errorHandler.ts   # Error handling
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Set Up Environment Variables

Create `server/.env` file:

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
AGENT_EMAIL=chris@hodgins.insure
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url
```

### 3. Run the Backend Server

**Development (with auto-reload):**
```bash
cd server
npm run dev
```

**Production:**
```bash
cd server
npm run build
npm start
```

The server will run on `http://localhost:3001`

## 🔌 Update Frontend to Use Backend

### Option 1: Update Environment Variable

Add to your `.env.local` (in the root directory):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Option 2: Update the Quote Widget

In `app/components/EnhancedQuoteWidget.tsx`, update the API URL:

```typescript
// Change from:
const apiRoute = '/api/quote';

// To:
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const apiRoute = `${API_URL}/api/quotes`;
```

## 📡 API Endpoints

### POST `/api/quotes`
Submit a new quote.

**Request:**
```json
{
  "fullName": "John Doe",
  "phone": "7722444350",
  "email": "john@example.com",
  "address": "123 Main St, Miami, FL 33101",
  "city": "Miami",
  "state": "FL",
  "zipCode": "33101",
  "squareFeet": 1500,
  "yearBuilt": 2010,
  "ownership": "own"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quote submitted successfully. An agent will contact you shortly.",
  "quoteId": "quote-1234567890-abc123"
}
```

### GET `/api/quotes`
Get all quotes (for admin dashboard).

### GET `/api/quotes/:id`
Get a specific quote by ID.

### GET `/health`
Health check endpoint.

## 💾 Data Storage

Quotes are stored in `server/data/quotes.json`. 

**For production**, consider upgrading to:
- PostgreSQL
- MongoDB
- Supabase
- Firebase

## 🔧 Features

- ✅ RESTful API
- ✅ Input validation with Zod
- ✅ Email notifications (Resend)
- ✅ Webhook support
- ✅ CORS enabled
- ✅ Error handling
- ✅ TypeScript
- ✅ File-based storage (easy to upgrade to database)

## 🚢 Deployment

### Deploy Backend Separately

You can deploy the backend to:
- **Railway**: https://railway.app
- **Render**: https://render.com
- **Fly.io**: https://fly.io
- **DigitalOcean App Platform**: https://www.digitalocean.com/products/app-platform

### Update Frontend Environment

After deploying, update your frontend's `NEXT_PUBLIC_API_URL` to point to your deployed backend URL.

## 📝 Notes

- The backend runs independently from the Next.js frontend
- Quotes are stored in JSON files (upgrade to database for production)
- Email notifications require Resend API key
- Webhook is optional but recommended for integrations

