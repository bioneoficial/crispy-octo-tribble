import { Selo, UpdateSelo } from '../interfaces/interfaces';
import  { ValidationError }  from '../commons/utils';
import * as z from './schemas';

export const validateSelo = (data: Selo) => {
  const result = z.SeloSchema.safeParse(data);
  
  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
}

export const validateUpdateSelo = (data: UpdateSelo) => {
  const result = z.UpdateSeloSchema.safeParse(data);
  
  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
}
