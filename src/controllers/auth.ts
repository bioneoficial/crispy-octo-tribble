import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth';
import { validateAuthPayload } from '../validators/auth';

const authService = new AuthService();

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginPayload = validateAuthPayload(req.body);
      const authValidated = await authService.authenticate(loginPayload);
      await authService.createLoginToken(authValidated);

      res.status(201).json(authValidated);
    } catch (e) {
      const error = e as Error
      next(error);
    }
  }  
  