import * as z from '../validators/vitrineConteudo';

import { NextFunction, Request, Response } from 'express';
import { VitrineConteudoService } from '../services/vitrineConteudo';
import { setCache } from '../services/cache/redis';

const service = new VitrineConteudoService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBody = z.validate(req.body);
    const createdData = await service.create(validatedBody);
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

    if (!data) {
      res.status(404).json({ message: "Vitrine Conteúdo not found" });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const data = z.validateUpdate(req.body);

    const hasChanged = await service.update(id, data);

    res.status(200).json({
      success: true,
      message: hasChanged ? 'Vitrine Conteúdo updated successfully' : 'No changes were made',
    });
  } catch (error) {
    next(error);
  }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const hasDeleted = await service.deleteById(id);
    res.status(200).json({
      success: true,
      message: hasDeleted ? 'Vitrine Conteúdo deleted successfully' : 'No Vitrine Conteúdo was found with this ID',
    });
  } catch (error) {
    next(error);
  }
}

export const getHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getHome();
    
    await setCache(data, req, res);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export const getByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nome = req.query.nome as string;
    if (!nome) {
      res.status(400).json({ message: 'Missing "nome" parameter' });
      return;
    }
    const data = await service.getByNome(nome);

    if (!data) {
      res.status(404).json({ message: "Conteúdo not found" });
      return;
    }
    await setCache(data, req, res);

    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
}

export const getSelecoes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getSelecoes();

    if (!data) {
      res.status(404).json({ message: "No content found" });
      return;
    }

    await setCache(data, req, res);

    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
}

export const getPremium = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getPremium();

    if (!data) {
      res.status(404).json({ message: "No content found" });
      return;
    }

    await setCache(data, req, res);

    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
}

export const getBombando = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getBombando();

    if (!data) {
      res.status(404).json({ message: "No content found" });
      return;
    }

    await setCache(data, req, res);

    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
}

export const getIndependentes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getIndependentes();

    if (!data) {
      res.status(404).json({ message: "No content found" });
      return;
    }

    await setCache(data, req, res);

    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
}

