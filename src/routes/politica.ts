import { Router } from 'express';
import * as controller from '../controllers/politica';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { roles, getAllRoles } from '../repositories/auth';

const politicaRouter = Router();

politicaRouter.post('/', authMiddleware.auth([roles.ROOT, roles.ADMIN]), controller.createPolitica);
politicaRouter.put('/:id', authMiddleware.auth([roles.ROOT, roles.ADMIN]), controller.updatePolitica);
politicaRouter.get('/', authMiddleware.auth(getAllRoles), controller.getAllPoliticas);
politicaRouter.put('/delete/:id', authMiddleware.auth([roles.ROOT, roles.ADMIN]), controller.deletePoliticaById);
politicaRouter.get('/tipo', authMiddleware.auth([roles.ROOT, roles.ADMIN]), controller.getPoliticaByTipo);

export default politicaRouter;
