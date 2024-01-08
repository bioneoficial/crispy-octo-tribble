import { Router } from 'express';
import * as CupomController from '../controllers/cupom';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { roles } from '../repositories/auth';

const cupomRouter = Router();

cupomRouter.post('/', authMiddleware.auth([roles.ROOT, roles.ADMIN]), CupomController.createCupom);
cupomRouter.get('/', authMiddleware.auth([roles.ROOT, roles.ADMIN]), CupomController.getAllCupons);
cupomRouter.put('/delete/:id', authMiddleware.auth([roles.ROOT, roles.ADMIN]), CupomController.deleteCupomById);
cupomRouter.put('/:id', authMiddleware.auth([roles.ROOT, roles.ADMIN]), CupomController.updateCupom);

export default cupomRouter;
