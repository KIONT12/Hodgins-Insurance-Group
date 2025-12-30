import express from 'express';
import { quoteController } from '../controllers/quoteController';
import { validateQuoteSubmission } from '../middleware/validation';

const router = express.Router();

// Submit a new quote
router.post('/', validateQuoteSubmission, quoteController.submitQuote);

// Get all quotes (for admin/agent dashboard)
router.get('/', quoteController.getQuotes);

// Get a specific quote by ID
router.get('/:id', quoteController.getQuoteById);

export default router;

