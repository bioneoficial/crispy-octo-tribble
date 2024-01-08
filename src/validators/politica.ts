import { ValidationError } from '../commons/utils';
import { Politica, UpdatePolitica } from '../interfaces/interfaces';
import { PoliticaSchema, UpdatePoliticaSchema } from './schemas';



export const validatePolitica = (data: Politica): Politica => {
  const result = PoliticaSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};

export const validateUpdatePolitica = (data: UpdatePolitica): UpdatePolitica => {
  const result = UpdatePoliticaSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};
