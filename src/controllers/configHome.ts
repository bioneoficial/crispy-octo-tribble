import { NextFunction, Request, Response } from 'express';
import { ConfiguracaoService } from '../services/configHome';
import { ConfiguracaoSchemaPost, ConfiguracaoSchemaUpdate } from '../validators/schemas/configHome';

const configuracaoService = new ConfiguracaoService();

export const createConfiguracao = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedConfiguracao = ConfiguracaoSchemaPost.safeParse(req.body);
    if (!validatedConfiguracao.success) {
      throw new Error(validatedConfiguracao.error.errors[0].message);
    }
    validatedConfiguracao.data.data_inclusao = new Date();
    const createdConfiguracao = await configuracaoService.create(validatedConfiguracao.data);
    res.status(201).json(createdConfiguracao);
  } catch (error) {
    next(error);
  }
};

export const getConfiguracao = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const configuracoes = await configuracaoService.get();
    res.status(200).json(configuracoes);
  } catch (error) {
    next(error);
  }
};

export const updateConfiguracao = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedConfiguracao = ConfiguracaoSchemaUpdate.safeParse(req.body);
    if (!validatedConfiguracao.success) {
      throw new Error(validatedConfiguracao.error.errors[0].message);
    }
    validatedConfiguracao.data.data_alteracao = new Date();
    const updatedConfiguracao = await configuracaoService.update(Number(req.params.id), validatedConfiguracao.data);
    res.status(200).json(updatedConfiguracao);
  } catch (error) {
    next(error);
  }
};

