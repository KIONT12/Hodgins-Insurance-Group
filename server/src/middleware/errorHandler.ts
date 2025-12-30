import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction // Prefix with _ to indicate intentionally unused
) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Log error with context
  console.error(`[${new Date().toISOString()}] Error on ${req.method} ${req.path}:`, {
    message: err.message,
    stack: isDevelopment ? err.stack : undefined,
    body: isDevelopment ? req.body : undefined
  });

  // Don't expose internal errors in production
  const errorMessage = isDevelopment 
    ? err.message 
    : 'An internal server error occurred';

  res.status(500).json({
    success: false,
    error: errorMessage,
    ...(isDevelopment && { 
      stack: err.stack,
      details: err.message 
    })
  });
}

