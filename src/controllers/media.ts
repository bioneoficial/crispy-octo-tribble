import { NextFunction, Request, Response } from 'express';

export const upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      
        res.status(201).json(req.files);
    } catch (e) {
      const error = e as Error
      next(error);
    }
  }  