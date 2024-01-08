import { Router } from 'express';
import authRouter from './auth';
import userRouter from './usuario';
import seloRouter from './selo';
import politicaRouter from './politica';
import cupomRouter from './cupom';
import vitrineConteudoRouter from './vitrineConteudo';
import conteudoRouter from './conteudo';
import configHomeRouter from './configHome';
import episodioRouter from './episodio';
import mediaRouter from './media';

export const routes = Router();

routes.use('/login', authRouter)
routes.use('/media', mediaRouter)
routes.use('/usuario', userRouter)
routes.use('/selo', seloRouter)
routes.use('/politica', politicaRouter)
routes.use('/cupom', cupomRouter)
routes.use('/vitrine-conteudo', vitrineConteudoRouter)
routes.use('/conteudo', conteudoRouter)
routes.use('/episodio', episodioRouter)
routes.use('/config-home', configHomeRouter)
