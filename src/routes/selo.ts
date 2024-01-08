import { Router } from 'express';
import * as SeloController from '../controllers/selo';
import { multerMiddleware } from '../middlewares/MulterMiddleware';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { roles } from '../repositories/auth';

const seloRouter = Router();

//seloRouter.post('/', authMiddleware.auth([roles.ROOT, roles.ADMIN]), multerMiddleware.uploadMedia('Imagem'), SeloController.createSelo);
seloRouter.put('/:id', authMiddleware.auth([roles.ROOT, roles.ADMIN]), SeloController.updateSelo);
seloRouter.get('/', authMiddleware.auth([roles.ROOT, roles.ADMIN]), SeloController.getAllSelos);
seloRouter.put('/delete/:id', authMiddleware.auth([roles.ROOT, roles.ADMIN]), SeloController.deleteSeloById);


export default seloRouter;
