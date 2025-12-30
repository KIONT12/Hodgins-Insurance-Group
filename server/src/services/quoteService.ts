import fs from 'fs/promises';
import path from 'path';

interface Quote {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  squareFeet?: number;
  yearBuilt?: number;
  ownership?: string;
  reviewDate?: string;
  reviewTime?: string;
  timestamp: string;
  source?: string;
  [key: string]: any;
}

// Use absolute path for production compatibility
const QUOTES_FILE = process.env.QUOTES_DATA_FILE || 
  path.join(process.cwd(), 'data', 'quotes.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(QUOTES_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Load quotes from file
async function loadQuotes(): Promise<Quote[]> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(QUOTES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, return empty array
    return [];
  }
}

// Save quotes to file
async function saveQuotes(quotes: Quote[]): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2), 'utf-8');
}

export const QuoteService = {
  // Save a new quote
  async saveQuote(quoteData: Partial<Quote> & { fullName: string; phone: string; email: string; address: string }): Promise<Quote> {
    const quotes = await loadQuotes();
    
    const newQuote: Quote = {
      ...quoteData,
      id: `quote-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    } as Quote;
    
    quotes.push(newQuote);
    await saveQuotes(quotes);
    
    console.log('✅ Quote saved:', newQuote.id);
    return newQuote;
  },

  // Get all quotes
  async getAllQuotes(): Promise<Quote[]> {
    return await loadQuotes();
  },

  // Get a quote by ID
  async getQuoteById(id: string): Promise<Quote | null> {
    const quotes = await loadQuotes();
    return quotes.find(q => q.id === id) || null;
  },

  // Send webhook notification
  async sendWebhook(quoteData: any): Promise<void> {
    if (!process.env.WEBHOOK_URL) {
      return;
    }

    const response = await fetch(process.env.WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteData),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.statusText}`);
    }

    console.log('✅ Webhook sent successfully');
  }
};

