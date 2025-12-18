# Hodgins Insurance Group

This is a [Next.js](https://nextjs.org) project for a Florida Home Insurance Quotes landing page.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Maps API Key (optional - for address autocomplete)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# API Endpoint for quote submissions
NEXT_PUBLIC_API_URL=http://localhost:3001

# QuoteRush Integration (optional - for quote comparison like harvest.insure)
NEXT_PUBLIC_USE_QUOTERUSH=false
NEXT_PUBLIC_QUOTERUSH_WIDGET_ID=your_widget_id
NEXT_PUBLIC_QUOTERUSH_AGENCY=your_agency_name
```

### QuoteRush Integration

To use QuoteRush API (similar to [harvest.insure](https://harvest.insure/)):

1. Set `NEXT_PUBLIC_USE_QUOTERUSH=true`
2. Add your `NEXT_PUBLIC_QUOTERUSH_WIDGET_ID` and `NEXT_PUBLIC_QUOTERUSH_AGENCY`
3. The form will automatically submit to QuoteRush API and display premium estimates

### Required Images

Add these images to the `public` folder:
- `612F94E0-6851-4913-8B87-1CE8E8735A0E.png` - Florida silhouette background
- `jpeg.jpg` - HODGINS Insurance Group logo

## Features

- **Google Places Autocomplete**: Real-time address suggestions while typing
- **Multi-step Quote Form**: Address → Map → Property Details → Contact Info
- **Quote Comparison**: Integrates with QuoteRush API to compare multiple carriers
- **Responsive Design**: Works on all devices
- **Address Validation**: Ensures complete Florida addresses for accurate quotes

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
