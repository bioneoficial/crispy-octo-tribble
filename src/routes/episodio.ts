import { Router } from 'express';
import * as EpisodioController from '../controllers/episodio';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { multerMiddleware } from '../middlewares/MulterMiddleware';
import { cacheMiddleware } from '../middlewares/CacheMiddleware';
import { roles, getAllRoles } from '../repositories/auth';


const episodioRouter = Router();

const fieldsUpload = [
  {
    name: 'image', maxCount: 100
  }, {
    name: 'thumb_image', maxCount: 1
  }
]

episodioRouter.post('/', authMiddleware.auth([roles.AUTOR]), multerMiddleware.uploadMedia(fieldsUpload), EpisodioController.create);
episodioRouter.get('/search/name', authMiddleware.auth(getAllRoles), cacheMiddleware.checkCache, EpisodioController.getByName);
episodioRouter.get('/:id', cacheMiddleware.checkCache, EpisodioController.getById);
episodioRouter.get('/', cacheMiddleware.checkCache, authMiddleware.auth(getAllRoles), EpisodioController.getAll);
episodioRouter.get('/conteudo/:id', cacheMiddleware.checkCache, EpisodioController.getAllByConteudoId);
episodioRouter.delete('/delete/:id', authMiddleware.auth([roles.ADMIN, roles.AUTOR]), EpisodioController.deleteById);
episodioRouter.put('/:id', authMiddleware.auth([roles.ADMIN, roles.AUTOR]), EpisodioController.update);
episodioRouter.delete('/delete/image/:id', authMiddleware.auth([roles.ADMIN, roles.AUTOR]), EpisodioController.deleteImageById);

export default episodioRouter;
