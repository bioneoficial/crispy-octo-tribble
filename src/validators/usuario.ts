import  { ValidationError }  from '../commons/utils';
import { UserToAutor } from '../interfaces/interfaces';
import * as z from './schemas';

export const validateUser = (data: object) => {
  const result = z.UserSchema.safeParse(data);
  
  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados do usuário', { 
      cause: result.error.errors
    });
  }

  return result.data;
}

export const validateUpdateUser = (data: object) => {
  const result = z.UpdateUserSchema.safeParse(data);
  
  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados do usuário', { 
      cause: result.error.errors
    });
  }

  return result.data;
}

export const validateUpdatePassword = (data: object) => {
  const result = z.UpdatePasswordSchema.safeParse(data);
  
  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
}

export const validateResetPassword = (data: object) => {
  const result = z.ResetPasswordSchema.safeParse(data);
  
  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
}

export const validateResetTokenValidation = (data: object) => {
  const result = z.ResetCodeValidationSchema.safeParse(data);
  
  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados do token', { 
      cause: result.error.errors
    });
  }

  return result.data;
}

export const validateUserByAdminUpdate = (data: object) => {
  const result = z.UpdateUserByAdminSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados do token', { 
      cause: result.error.errors
    });
  }

  return result.data;
}

export const validatedUserAutorData = (data: UserToAutor) => {
  const result = z.UserAutorSchema.safeParse(data);
  
  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
}