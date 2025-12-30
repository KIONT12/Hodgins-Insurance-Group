import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const quoteSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  squareFeet: z.number().optional(),
  yearBuilt: z.number().optional(),
  ownership: z.enum(['own', 'rent']).optional(),
  reviewDate: z.string().optional(),
  reviewTime: z.string().optional(),
  source: z.string().optional(),
  timestamp: z.string().optional(),
  addressVerified: z.boolean().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  placeId: z.string().optional(),
  streetAddress: z.string().optional(),
  route: z.string().optional(),
  streetNumber: z.string().optional(),
  county: z.string().optional(),
});

export function validateQuoteSubmission(req: Request, res: Response, next: NextFunction) {
  try {
    quoteSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      });
    }
    next(error);
  }
}

