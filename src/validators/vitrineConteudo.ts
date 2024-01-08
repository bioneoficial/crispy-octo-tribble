import { ValidationError } from '../commons/utils';
import { VitrineConteudo, VitrineConteudoUpdate } from '../interfaces/interfaces';
import { VitrineConteudoSchema, VitrineConteudoUpdateSchema } from './schemas/vitrineConteudo';

export const validate = (data: VitrineConteudo): VitrineConteudo => {
  const result = VitrineConteudoSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};


export const validateUpdate = (data: VitrineConteudoUpdate): VitrineConteudoUpdate => {
  const result = VitrineConteudoUpdateSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};
