import { ValidationError } from '../commons/utils';
import { ConfiguracaoHome } from '../interfaces/interfaces';
import { ConfiguracaoSchemaPost, ConfiguracaoSchemaUpdate } from './schemas/configHome';

export const validate = (data: ConfiguracaoHome): ConfiguracaoHome => {
  const result = ConfiguracaoSchemaPost.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};

export const validateUpdateConfigHome = (data: ConfiguracaoHome): ConfiguracaoHome => {
  const result = ConfiguracaoSchemaUpdate.safeParse(data);

  if (!result.success) {
    throw new ValidationError('Erro de validação dos dados', { 
      cause: result.error.errors
    });
  }

  return result.data;
};
