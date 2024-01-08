import { NextFunction, Request, Response } from 'express';
import { validatePolitica, validateUpdatePolitica } from '../validators/politica';
import { PoliticaService } from '../services/politica';
import { PoliticaRepository } from '../repositories/politica';
import { setCache } from '../services/cache/redis';

const politicaService = new PoliticaService(new PoliticaRepository());

export const createPolitica = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedPolitica = validatePolitica(req.body);
    const createdPolitica = await politicaService.create(validatedPolitica);
    res.status(201).json(createdPolitica);
  } catch (error) {
    next(error);
  }
}

export const updatePolitica = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const validatedPolitica = validateUpdatePolitica(req.body);
    const hasChanged = await politicaService.update(id, validatedPolitica);
    res.status(200).json({
      success: true,
      message: hasChanged ? 'Politica updated successfully' : 'No changes were made',
    });
  } catch (error) {
    next(error);
  }
}

export const getAllPoliticas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const politicas = await politicaService.getAll(req);
    await setCache(politicas, req, res);
    res.status(200).json(politicas);
  } catch (error) {
    next(error);
  }
}

export const deletePoliticaById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const hasDeleted = await politicaService.deleteById(id);
    res.status(200).json({
      success: true,
      message: hasDeleted ? 'Politica deleted successfully' : 'No Politica was found with this ID',
    });
  } catch (error) {
    next(error);
  }
}

export const getPoliticaByTipo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tipo = await politicaService.getPoliticaByTipo();
    await setCache(tipo, req, res);
    res.status(200).json(tipo);
  }catch (error) {
    next(error);
  }
}
