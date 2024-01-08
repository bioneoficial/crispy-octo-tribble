import { Router } from 'express';
import * as ConteudoController from '../controllers/conteudo';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { multerMiddleware } from '../middlewares/MulterMiddleware';
import { cacheMiddleware } from '../middlewares/CacheMiddleware';
import { roles, getAllRoles } from '../repositories/auth';

const conteudoRouter = Router();

const fieldsUpload = [
    {
        name: 'imagem_capa', maxCount: 1
    },
    {
        name: 'imagem_miniatura', maxCount: 1
    },
    {
        name: 'imagem_banner', maxCount: 1
    }
]


/**
 * @swagger
 * tags:
 *   name: Conteúdo
 *   description: Operações relacionadas a conteúdos.
 */

/**
 * @swagger
 * /conteudo:
 *   post:
 *     summary: Criar novo conteúdo
 *     tags: [Conteúdo]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: imagem_capa
 *         type: file
 *         required: true
 *         description: Imagem de capa do conteúdo (máx. 1 arquivo)
 *       - in: formData
 *         name: imagem_miniatura
 *         type: file
 *         required: true
 *         description: Imagem em miniatura do conteúdo (máx. 1 arquivo)
 *       - in: formData
 *         name: imagem_banner
 *         type: file
 *         required: true
 *         description: Imagem de banner do conteúdo (máx. 1 arquivo)
 *     responses:
 *       201:
 *         description: Conteúdo criado com sucesso.
 *       401:
 *         description: Não autorizado.
 *       500:
 *         description: Erro interno no servidor.
 */
conteudoRouter.post('/', authMiddleware.auth([roles.AUTOR]), multerMiddleware.uploadMedia(fieldsUpload), ConteudoController.create);
conteudoRouter.get('/:id(\\d+)', cacheMiddleware.checkCache, ConteudoController.getById);
conteudoRouter.get('/name', cacheMiddleware.checkCache, authMiddleware.auth(getAllRoles), ConteudoController.getByName);
conteudoRouter.get('/', authMiddleware.auth(getAllRoles), cacheMiddleware.checkCache, ConteudoController.getAll);
conteudoRouter.get('/author/:id_usuario', cacheMiddleware.checkCache, authMiddleware.auth(getAllRoles), ConteudoController.getAllByAuthor);
conteudoRouter.delete('/delete/:id', authMiddleware.auth([roles.ADMIN, roles.AUTOR]), ConteudoController.deleteById);
conteudoRouter.put('/:id', authMiddleware.auth([roles.ADMIN, roles.AUTOR]), ConteudoController.update);
conteudoRouter.post('/add-conteudo-vitrine', authMiddleware.auth([roles.ADMIN]), ConteudoController.addConteudoOnVitrine);
conteudoRouter.delete('/remove-conteudo-vitrine/:id', authMiddleware.auth([roles.ADMIN]), ConteudoController.removeConteudoOnVitrine);
conteudoRouter.put('/update-conteudo-vitrine/:id', authMiddleware.auth([roles.ADMIN]), ConteudoController.updateConteudoOnVitrine);

export default conteudoRouter;
