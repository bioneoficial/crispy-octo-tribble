import { Router } from 'express';
import * as AuthController from '../controllers/auth';

const authRouter = Router();

authRouter.post('/', AuthController.login);

export default authRouter;