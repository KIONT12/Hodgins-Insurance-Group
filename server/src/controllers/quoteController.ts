import { Request, Response } from 'express';
import { QuoteService } from '../services/quoteService';
import { EmailService } from '../services/emailService';

export const quoteController = {
  // Submit a new quote
  async submitQuote(req: Request, res: Response) {
    try {
      const quoteData = req.body;
      
      // Save quote to database/storage
      const savedQuote = await QuoteService.saveQuote(quoteData);
      
      // Send email notification
      try {
        await EmailService.sendQuoteNotification(quoteData);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the request if email fails
      }
      
      // Send webhook if configured
      if (process.env.WEBHOOK_URL) {
        try {
          await QuoteService.sendWebhook(quoteData);
        } catch (webhookError) {
          console.error('Webhook failed:', webhookError);
          // Don't fail the request if webhook fails
        }
      }
      
      res.status(201).json({
        success: true,
        message: 'Quote submitted successfully. An agent will contact you shortly.',
        quoteId: savedQuote.id
      });
    } catch (error) {
      console.error('Quote submission error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit quote'
      });
    }
  },

  // Get all quotes
  async getQuotes(req: Request, res: Response) {
    try {
      const quotes = await QuoteService.getAllQuotes();
      res.json({
        success: true,
        count: quotes.length,
        quotes
      });
    } catch (error) {
      console.error('Error fetching quotes:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch quotes'
      });
    }
  },

  // Get a specific quote by ID
  async getQuoteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const quote = await QuoteService.getQuoteById(id);
      
      if (!quote) {
        return res.status(404).json({
          success: false,
          error: 'Quote not found'
        });
      }
      
      res.json({
        success: true,
        quote
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch quote'
      });
    }
  }
};

