import { ValidationError } from '../commons/utils';
import { Cupom, UpdateCupom } from '../interfaces/interfaces';
import { CupomSchema, UpdateCupomSchema } from './schemas';

export const validateCupom = (data: Cupom): Cupom => {
  const result = CupomSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};

export const validateUpdateCupom = (data: UpdateCupom): UpdateCupom => {
  const result = UpdateCupomSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};
