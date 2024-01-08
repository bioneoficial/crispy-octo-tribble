import { Request, Response, NextFunction } from 'express';
import { ValidationError, DatabaseError } from '../commons/utils';
import logMiddleware from './LogMiddleware';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  let errorMessage = err.message
  let errorCause = err.cause

  if (err instanceof ValidationError) {
    res.status(400);
  } else if (err instanceof DatabaseError) {
    errorMessage = "Database error. See on server error log for more details"
    res.status(500);
  } else {
    res.status(500);
  }  

  logMiddleware.notify(err.message, {
      context: { method: 'ErrorMiddleware', headers: req.headers, body: req.body, cause: errorCause },                    
    }
  );  

  res.json({ 
    success: false, 
    message: errorMessage,
    errorCause: errorCause
  });
};

export default errorMiddleware;
