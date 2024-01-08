import { Router } from 'express';
import { multerMiddleware } from '../middlewares/MulterMiddleware';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { roles } from '../repositories/auth';

const mediaRouter = Router();

const fieldsUpload = [
    {
        name: 'image', maxCount: 100
    }
]

mediaRouter.post('/upload', 
    authMiddleware.auth([roles.AUTOR]), 
    multerMiddleware.uploadMedia(fieldsUpload), 
    (req, res)=>{
        res.status(201).json(req.files);  
    } 
);

export default mediaRouter;
