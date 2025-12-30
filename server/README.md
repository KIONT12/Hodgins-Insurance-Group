# Hodgins Insurance Group - Backend Server

Backend API server for handling insurance quote submissions.

## Features

- ✅ RESTful API for quote submissions
- ✅ Email notifications via Resend
- ✅ Webhook support (Zapier, Make.com, etc.)
- ✅ Data persistence (JSON file storage)
- ✅ Input validation with Zod
- ✅ CORS enabled for frontend integration
- ✅ TypeScript for type safety

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Your frontend URL for CORS
- `AGENT_EMAIL` - Email to receive quote notifications
- `RESEND_API_KEY` - Resend API key for email (optional)
- `WEBHOOK_URL` - Webhook URL for integrations (optional)

### 3. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

## API Endpoints

### POST `/api/quotes`
Submit a new insurance quote.

**Request Body:**
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
Get all submitted quotes.

### GET `/api/quotes/:id`
Get a specific quote by ID.

### GET `/health`
Health check endpoint.

## Data Storage

Quotes are stored in `server/data/quotes.json`. For production, consider using a proper database (PostgreSQL, MongoDB, etc.).

## Integration with Frontend

Update your frontend to point to the backend server:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const response = await fetch(`${API_URL}/api/quotes`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(quoteData)
});
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS
- `RESEND_API_KEY` - Resend API key
- `RESEND_FROM_EMAIL` - Email sender address
- `AGENT_EMAIL` - Email to receive notifications
- `WEBHOOK_URL` - Webhook URL for integrations

