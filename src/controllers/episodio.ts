import * as z from '../validators/episodio';

import { NextFunction, Request, Response } from 'express';
import { EpisodioService } from '../services/episodio';
import { AuthService } from '../services/auth';
import { Episodio, EpisodioImagem } from '../interfaces/interfaces';
import { ValidationError } from '../commons/utils';
import { setCache } from '../services/cache/redis';

const service = new EpisodioService();
const authService = new AuthService();
const tblName = 'Episodio';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const parsedBody = {
      ...req.body,
      episodio: parseInt(req.body.episodio),
      id_conteudo: parseInt(req.body.id_conteudo),
      publicado: parseInt(req.body.publicado),
      ordem: parseInt(req.body.ordem),
      thumb:''
    }    

    req.params.id = req.body.id_conteudo;
    const isOwner = await authService.isOwner(req, 'Conteudo');

    if(!isOwner){
      throw new ValidationError('Você não tem permissão para executar esta ação')
    }    
    parsedBody.slug ? parsedBody.slug = parsedBody.slug : parsedBody.slug = parsedBody.nome.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const createdData = await service.create(parsedBody);    
    
    const files = req.files as Express.MulterS3.File[];
    if(files && files.length > 0){

      // gravar thumb
      const thumb = files.filter(f=>f.fieldname === 'thumb_image')[0]
      if(thumb){
        createdData.thumb = thumb.location;
        const episodioPartial:Partial<Episodio> = {
          thumb: thumb.location
        } 
        await service.update(Number(createdData.id), episodioPartial);
      }

      // Gravar imagens na tabela Episodio__Imagem
      files
      .filter(f=>f.fieldname === 'image')
      .forEach(async (file: Express.MulterS3.File, index: number)=>{
        const imagemEpisodio: EpisodioImagem = {
          url: file.location,
          episodio_id: Number(createdData.id),
          position: index,           
          data_inclusao: new Date()          
        } 
        await service.setEpisodeImage(imagemEpisodio);
      })
    }

    await setCache(createdData, req, res);

    res.status(201).send(createdData);
    
  } catch (e) {
     next(new ValidationError('Erro ao cadastrar episódio', {cause: e as Error}))
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAll(req);

    await setCache(data, req, res);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export const getAllByConteudoId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conteudo_id = Number(req.params.id);
    const data = await service.getAllByConteudoId(conteudo_id, req);

    await setCache(data, req, res);

    res.status(200).json(data);
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
      res.status(404).json({ message: "Episódio not found" });
      return;
    }

    const episodeimages = await service.getAllEpisodeImage(id)
    
    res.status(200).json({...data, images: episodeimages});

  } catch (error) {
    next(error);
  }
}

export const getByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBody = z.validateSearchByName(req.body)
    const data = await service.getByNome(validatedBody.nome);

    await setCache(data, req, res);

    if (!data) {
      res.status(404).json({ message: "Episódio not found" });
      return;
    }

    res.status(200).json(data);

  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = z.validate(req.body);

    const id_episodio = Number(req.params.id);
    
    req.params.id = req.body.id_conteudo; 
    const isOwnerConteudo = await authService.isOwner(req, 'Conteudo');
    const isOwner = await authService.isOwner(req, tblName);

    if(!isOwner || !isOwnerConteudo){
      res.status(403).json({
        success: false,
        message: 'Você não tem permissão para executar esta ação',
      });
    }

    const hasChanged = await service.update(id_episodio, data);

    res.status(200).json({
      success: true,
      message: hasChanged ? 'Episódio updated successfully' : 'No changes were made',
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

    const id = Number(req.params.id);
    const hasDeleted = await service.deleteById(id);

    res.status(200).json({
      success: true,
      message: hasDeleted ? 'Episódio deleted successfully' : 'No Conteúdo was found with this ID',
    });
  } catch (error) {
    next(error);
  }
}

export const deleteImageById = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const image_id = Number(req.params.id);
    const image = await service.getEpisodeImageById(image_id);
    const episodio_id = image?.episodio_id;

    if(!episodio_id){
      throw new ValidationError('ID do Episódio não encontrado')
    }

    req.params.id = `${episodio_id}`
    const isOwner = await authService.isOwner(req, tblName);
    if(!isOwner){
      res.status(403).json({
        success: false,
        message: 'Você não tem permissão para executar esta ação',
      });
    }

    const id = Number(req.params.id);
    const hasDeleted = await service.deleteEpisodeImage(id);

    res.status(200).json({
      success: true,
      message: hasDeleted ? 'Image from episode deleted successfully' : 'No Image was found with this ID',
    });
  } catch (error) {
    next(error);
  }
}
