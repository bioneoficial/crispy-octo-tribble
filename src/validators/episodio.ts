import { ValidationError } from '../commons/utils';
import { Episodio, EpisodioSearchByName } from '../interfaces/interfaces';
import { EpisodioSchema, EpisodioSearchByNameSchema } from './schemas/episodio';

export const validate = (data: Episodio): Episodio => {
  const result = EpisodioSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};

export const validateSearchByName = (data: EpisodioSearchByName): EpisodioSearchByName => {
  const result = EpisodioSearchByNameSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};
