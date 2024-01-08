import { NextFunction, Request, Response } from "express";
import { SeloService } from "../services/selo";
import { validateSelo, validateUpdateSelo } from "../validators/selo";
import { Selo } from "../interfaces/interfaces";
import fs from "fs";
import { setCache } from '../services/cache/redis';

const seloService = new SeloService();

export const createSelo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const selo = validateSelo(JSON.parse(req.body.payload));
    if(selo && req.file) {
    const createdSelo: Selo = await seloService.create(selo);
    const updatedSelo= await seloService.updateFoto({ Imagem: createdSelo.Imagem, id: createdSelo.id }, req.file);
    res.status(201).json(updatedSelo);
  } else {
    throw new Error('Could not find file');
  }
  } catch (error) {
    if(req.file){
    fs.unlink(req.file.path, (err) => {
      if (err) throw err;
    });
  }
    next(error);
  }
};


// export const updateFoto = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = Number(req.body.id);
//     const selo  = await seloService.getById(id);
//     const updatedSelo: Selo = await seloService.updateFoto(selo, req.file);

//     if (req.file && createdSelo.id) {
//       const updatedSeloData = { Imagem: req.file.filename };
//       await seloService.update(Number(createdSelo.id), updatedSeloData);
//       createdSelo.Imagem = req.file.filename;

//       await seloService.updateFoto({ Imagem: createdSelo.Imagem, id: createdSelo.id });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Photo upload sucessfully',
//       data: updatedSelo,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

export const updateSelo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const selo = validateUpdateSelo(req.body);
    const updatedSelo = {data_alteracao: (new Date()).toISOString().slice(0, 19).replace('T', ' '), ...selo}
    await seloService.update(id, updatedSelo);
    res.status(200).json({ message: "Selo Updated successfully" });
  } catch (e) {
    const error = e as Error
    next(error);
  }
};

export const getAllSelos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const selos = await seloService.getAll();
    await setCache(selos, req, res);
    res.status(200).json(selos);
  } catch (e) {
    const error = e as Error
    next(error);
  }
};

export const deleteSeloById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const hasDeleted = await seloService.deleteSeloById(id);
    res.status(200).json({
      success: true,
      message: hasDeleted ? 'Selo deleted successfully' : 'No Selo was found with this ID',
    });
  } catch (e) {
    const error = e as Error
    next(error);
  }
}

