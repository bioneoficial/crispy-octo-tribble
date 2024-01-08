import { ValidationError } from '../commons/utils';
import { Conteudo, ConteudoUpdate, ConteudoVitrineConteudo, ConteudoVitrineConteudoUpdate } from '../interfaces/interfaces';
import { ConteudoSchema, ConteudoUpdateSchema, ConteudoVitrineConteudoSchema, ConteudoVitrineUpdateConteudoSchema } from './schemas/conteudo';

export const validate = (data: Conteudo): Conteudo => {
  const result = ConteudoSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};

export const validateUpdate = (data: ConteudoUpdate): ConteudoUpdate => {
  const result = ConteudoUpdateSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};

export const validateConteudoVitrineConteudo = (data: ConteudoVitrineConteudo): ConteudoVitrineConteudo => {
  const result = ConteudoVitrineConteudoSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};


export const validateConteudoVitrineConteudoUpdate = (data: ConteudoVitrineConteudoUpdate): ConteudoVitrineConteudoUpdate => {
  const result = ConteudoVitrineUpdateConteudoSchema.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};
