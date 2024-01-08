import { Router } from 'express';
import * as ConfiguracaoController from '../controllers/configHome';

import { authMiddleware } from '../middlewares/AuthMiddleware';
import { roles } from '../repositories/auth';

const configHomeRouter = Router();

configHomeRouter.post('/', authMiddleware.auth([roles.ROOT, roles.ADMIN]), ConfiguracaoController.createConfiguracao);
configHomeRouter.get('/', authMiddleware.auth([roles.ROOT, roles.ADMIN]), ConfiguracaoController.getConfiguracao);
configHomeRouter.put('/:id', authMiddleware.auth([roles.ROOT, roles.ADMIN]), ConfiguracaoController.updateConfiguracao);

export default configHomeRouter;
