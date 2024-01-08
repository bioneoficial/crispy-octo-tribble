import express from 'express';
import * as userController from '../controllers/usuario';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { cacheMiddleware } from '../middlewares/CacheMiddleware';
import { roles, getAllRoles } from '../repositories/auth';
import { multerMiddleware } from '../middlewares/MulterMiddleware';

const userRouter = express.Router();

const fieldsUpload = [
    {
        name: 'image', maxCount: 1
    }
];

userRouter.get('/', authMiddleware.auth([roles.ROOT, roles.ADMIN]), userController.getAllUsuarios);
userRouter.get('/:id', userController.getUsuario);
userRouter.get('/verify-email-code/:code', authMiddleware.auth(getAllRoles), userController.VerifyEmailCode);

userRouter.put('/:id', authMiddleware.auth(getAllRoles), userController.updateUsuario);
userRouter.put('/admin/:id', authMiddleware.auth([roles.ROOT, roles.ADMIN]), userController.updateUsuarioByAdmin);
userRouter.put('/password/update', userController.updatePassword);

userRouter.post('/', userController.createUsuario);
userRouter.post('/updatePhoto', 
    authMiddleware.auth(getAllRoles), 
    multerMiddleware.uploadMedia(fieldsUpload),
    userController.updateFoto
);
userRouter.post('/password/reset', userController.resetPassword);
userRouter.post('/password/token-validation', userController.resetTokenValidation);
userRouter.post('/request-email-code', authMiddleware.auth(getAllRoles), userController.GenerateCodeValidEmail);
userRouter.post('/user-to-autor',authMiddleware.auth(getAllRoles), userController.UserToAutor);



export default userRouter;
