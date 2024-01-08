import { Router } from 'express';
import * as VitrineConteudoController from '../controllers/vitrineConteudo';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { roles } from '../repositories/auth';
import { cacheMiddleware } from '../middlewares/CacheMiddleware';

const vitrineConteudoRouter = Router();

vitrineConteudoRouter.post('/', authMiddleware.auth([roles.ROOT, roles.ADMIN]), VitrineConteudoController.create);
vitrineConteudoRouter.get('/:id', VitrineConteudoController.getById);
vitrineConteudoRouter.get('/', cacheMiddleware.checkCache, VitrineConteudoController.getAll);
vitrineConteudoRouter.delete('/delete/:id', authMiddleware.auth([roles.ROOT, roles.ADMIN]), VitrineConteudoController.deleteById);
vitrineConteudoRouter.put('/:id', authMiddleware.auth([roles.ROOT, roles.ADMIN]), VitrineConteudoController.update);
vitrineConteudoRouter.get('/content/vitrine', cacheMiddleware.checkCache, VitrineConteudoController.getByName);
vitrineConteudoRouter.get('/content/home', cacheMiddleware.checkCache, VitrineConteudoController.getHome);
vitrineConteudoRouter.get('/content/selecoes', cacheMiddleware.checkCache, VitrineConteudoController.getSelecoes);
vitrineConteudoRouter.get('/content/independentes', cacheMiddleware.checkCache, VitrineConteudoController.getIndependentes);
vitrineConteudoRouter.get('/content/bombando', cacheMiddleware.checkCache, VitrineConteudoController.getBombando);
vitrineConteudoRouter.get('/content/premium', cacheMiddleware.checkCache, VitrineConteudoController.getPremium);

export default vitrineConteudoRouter;
