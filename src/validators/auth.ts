import { ValidationError } from '../commons/utils';
import { AuthInput } from '../interfaces/interfaces';
import * as z from './schemas';

export const validateAuthPayload = (data: AuthInput) => {
  const result = z.AuthSchema.safeParse(data);  
  if (!result.success) {
    throw new ValidationError('Erro ao efetuar login', { 
      cause: result.error.errors
    });
  }

  return result.data;
}