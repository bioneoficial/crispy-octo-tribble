import * as z from '../validators/conteudo';

import { NextFunction, Request, Response } from 'express';
import { ConteudoService } from '../services/conteudo';
import { setCache } from '../services/cache/redis';
import { AuthService } from '../services/auth';
import { Conteudo } from '../interfaces/interfaces';

const service = new ConteudoService();
const authService = new AuthService();
const tblName = 'Conteudo';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let parsedBody:Conteudo = {
      ...req.body,
      publicado: parseInt(req.body.publicado),
      selecao: 0,
      premium: 0,
      moderada: 0,
      imagem_capa: null,
      imagem_miniatura: null,
      imagem_banner: null
    };

    const files = req.files as Express.MulterS3.File[];
    if(files && files.length > 0){
      const imagem_capa_file = files.filter(f=>f.fieldname === 'imagem_capa')[0]
      const imagem_miniatura_file:Express.MulterS3.File = files.filter(f=>f.fieldname === 'imagem_miniatura')[0]
      const imagem_banner_file:Express.MulterS3.File = files.filter(f=>f.fieldname === 'imagem_banner')[0] 
      
      parsedBody = {
        ...parsedBody,
        imagem_capa: imagem_capa_file.location,
        imagem_miniatura: imagem_miniatura_file.location,
        imagem_banner: imagem_banner_file.location
      }
    }
    
    const validatedBody = z.validate(parsedBody);
    validatedBody.slug ? validatedBody.slug = validatedBody.slug : validatedBody.slug = validatedBody.nome.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const createdData = await service.create(validatedBody);

    await setCache(createdData, req, res);
    
    res.status(201).json(createdData);    

  } catch (e) {
    const error = e as Error
    next(error);
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    
    const data = await service.getAll(req);    
    await setCache(data, req, res);

    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const data = await service.getById(id);

    await setCache(data, req, res);

    if (!data) {
      res.status(404).json({ message: "Conteúdo not found" });
      return;
    }

    res.status(200).json(data);

  } catch (error) {
    next(error);
  }
}

export const getAllByAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id_usuario = Number(req.params.id_usuario);
    const data = await service.getByAuthor(id_usuario, req);

    await setCache(data, req, res);

    if (!data) {
      res.status(404).json({ message: "Conteúdo not found" });
      return;
    }

    res.status(200).json(data);

  } catch (error) {
    next(error);
  }
}

export const getByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getByNome(req.body.nome);

    await setCache(data, req, res);

    if (!data) {
      res.status(404).json({ message: "Conteúdo not found" });
      return;
    }

    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const data = z.validateUpdate(req.body);

    const isOwner = await authService.isOwner(req, tblName);

    if(!isOwner){
      res.status(403).json({
        success: false,
        message: 'Você não tem permissão para executar esta ação',
      });
    }

    const id = Number(req.params.id);
    const hasChanged = await service.update(id, data);

    res.status(200).json({
      success: true,
      message: hasChanged ? 'Conteúdo updated successfully' : 'No changes were made',
    });
  } catch (error) {
    next(error);
  }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const isOwner = await authService.isOwner(req, tblName);
    if(!isOwner){
      res.status(403).json({
        success: false,
        message: 'Você não tem permissão para executar esta ação',
      });
    }

    const id_conteudo = Number(req.params.id);
    const hasDeleted = await service.deleteById(id_conteudo);

    res.status(200).json({
      success: true,
      message: hasDeleted ? 'Conteúdo deleted successfully' : 'No Conteúdo was found with this ID',
    });
    
  } catch (error) {
    next(error);
  }
}

export const addConteudoOnVitrine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = z.validateConteudoVitrineConteudo(req.body);
      const createdData = await service.addConteudoOnVitrine(validatedBody);    
      res.status(201).json(createdData);    
    } catch (e) {
      const error = e as Error
      next(error);
    }
}

export const removeConteudoOnVitrine = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const hasDeleted = await service.removeConteudoOnVitrine(id);
        res.status(200).json({
          success: true,
          message: hasDeleted ? 'Conteúdo Vitrine deleted successfully' : 'No Conteúdo Vitrine was found with this ID',
        });
    } catch (e) {
      const error = e as Error
      next(error);
    }
}

export const updateConteudoOnVitrine = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = z.validateConteudoVitrineConteudoUpdate(req.body);

    const id = Number(req.params.id);
    const hasChanged = await service.updateConteudoOnVitrine(id, data);

    res.status(200).json({
      success: true,
      message: hasChanged ? 'Conteúdo Vitrine updated successfully' : 'No changes were made',
    });
  } catch (error) {
    next(error);
  }
}


