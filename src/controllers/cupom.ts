import { NextFunction, Request, Response } from "express";
import { CupomService } from "../services/cupom";
import { Cupom } from "../interfaces/interfaces";
import { validateCupom, validateUpdateCupom } from "../validators/cupom";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { setCache } from '../services/cache/redis';

const cupomService = new CupomService();

export const createCupom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cupom = validateCupom(req.body);
    const createdCupom: Cupom = await cupomService.create(cupom);
    res.status(201).json(createdCupom);
  } catch (error) {
    next(error);
  }
};

export const getAllCupons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cupons = await cupomService.getAll(req);
    await setCache(cupons, req, res);

    res.status(200).json(cupons);
  } catch (error) {
    next(error);
  }
};

export const deleteCupomById =[ authMiddleware.auth(['ADMIN', 'ROOT']), async (req: Request, res: Response, next: NextFunction) => {
  try {
      const id = Number(req.params.id);
      const hasDeleted = await cupomService.deleteById(id);
      res.status(200).json({
          success: true,
          message: hasDeleted ? 'Cupom deleted successfully' : 'No Cupom was found with this ID',
      });
  } catch (error) {
      next(error);
  }
} ]

export const updateCupom = [
  authMiddleware.auth(['ADMIN', 'ROOT']),
async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const id = Number(req.params.id);
      const cupom = validateUpdateCupom(req.body);
      await cupomService.update(id, cupom);
      res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
      next(error);
  }
}];

