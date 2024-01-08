import { Cupom, Politica, Selo, UpdateCupom, UpdatePolitica, UpdateSelo, Usuario, AuthInput, ResetCodeValidation, VitrineConteudo, UserToAutor } from "../interfaces/interfaces";
import { z } from "zod";

export const UserSchema: z.ZodSchema<Usuario> = z.object({
  id: z
    .number({
      invalid_type_error: "id must be an integer",
    })
    .int({
      message: "id must be an integer",
    })
    .min(1, {
      message: "id must be an integer greater than 0",
    })
    .optional(),
  nome: z
    .string({
      invalid_type_error: "Name must be a string",
      description: "Name must be string between 2 and 90 characters",
    })
    .min(2, { message: "Name must be 2 or more characters long" })
    .max(90, { message: "Name must be 90 or less characters long" }),
  descricao: z
    .string({
      invalid_type_error: "descricao must be a string",
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Email must be a valid email" }),
  senha: z
    .string({
      invalid_type_error: "Senha must be a string",
    })
    .min(8, { message: "Senha must be 8 or more characters long" })
    .max(30, { message: "Senha must be 30 or less characters long" }),
  fotoPath: z
    .string({
      invalid_type_error: "fotoPath must be a string",
    })
    .optional(),
  ativo: z
    .number({ invalid_type_error: "Ativo must be an integer 0 or 1" })
    .int({
      message: "Ativo must be an integer 0 or 1",
    })
    .min(0, {
      message: "Ativo must be an integer 0 or 1",
    })
    .max(1, { message: "Ativo must be an integer 0 or 1" }).optional(),
  data_validade_assinatura: z.string().optional(),
  id_usuario_operacao: z
    .number({ invalid_type_error: "id_usuario_operacao must be an integer" })
    .int({ message: "id_usuario_operacao must be an integer" })
    .min(1, { message: "id_usuario_operacao must be an integer greater than 0" }).optional(),
  data_alteracao: z.string({
    invalid_type_error: "data_alteracao must be a string",
  }).optional(),
  data_exclusao: z.string({
    invalid_type_error: "data_exclusao must be a string",
  }).optional(),
  data_inclusao: z.string({
    invalid_type_error: "data_inclusao must be a string",
  }).optional(),
});

export const UpdateUserSchema: z.ZodSchema<Partial<Usuario>> = z.object({
  nome: z
    .string({
      invalid_type_error: "Name must be a string",
      description: "Name must be string between 2 and 90 characters",
    })
    .min(2, { message: "Must be 2 or more characters long" })
    .max(90, { message: "Must be 90 or less characters long" })
    .optional(),
  descricao: z
    .string({
      invalid_type_error: "descricao must be a string",
    })
    .optional(),
    senha: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be 8 or more characters long" })
    .max(30, { message: "Password must be 30 or less characters long" }).optional(),
});

export const UpdatePasswordSchema: z.ZodSchema<{
  newPassword: string;
}> = z.object({
  newPassword: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be 8 or more characters long" })
    .max(30, { message: "Password must be 30 or less characters long" }),
});

export const ResetPasswordSchema: z.ZodSchema<{
  email: string;
}> = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Email must be a valid email" }),
});

export const ResetCodeValidationSchema: z.ZodSchema<ResetCodeValidation> = z.object({
  code: z.string({
    invalid_type_error: "tipo must be an string",
    description: "code must be string between 4 and 6 characters",
  }).min(4, {
    message: "code must be 2 or more characters long",
  }).max(6, {
    message: "code must be 6 or less characters long",
  })
});

export const UpdateUserByAdminSchema: z.ZodSchema<
  Partial<Usuario & { tipo?: number }>
> = z.object({
  nome: z.string({
    invalid_type_error: "Name must be a string",
    description: "Name must be string between 2 and 90 characters",
  }).min(2, {
    message: "Name must be 2 or more characters long",
  }).max(90, {
    message: "Name must be 90 or less characters long",
  }).optional(),
  descricao: z.string({
    invalid_type_error: "descricao must be a string",
  }).optional(),
  email: z.string({
    invalid_type_error: "Email must be a string",
  }).email({
    message: "Email must be a valid email",
  }).optional(),
  data_validade_assinatura: z.string({
    invalid_type_error: "data_validade_assinatura must be a string",
  }).optional(),
  tipo: z.number({
    invalid_type_error: "tipo must be an integer",
  }).int({
    message: "tipo must be an integer",
  }).min(1, {
    message: "tipo must be an integer greater than 0",
  }).max(4, {
    message: "tipo must be an integer less than 5",
  }).optional(),
});

export const SeloSchema: z.ZodSchema<Selo> = z.object({
  id: z.number({
    invalid_type_error: "id must be an integer",
  }).int({
    message: "id must be an integer",
  }).min(1, {
    message: "id must be an integer greater than 0",
  }).optional(),
  id_usuario_operacao: z.number({
    invalid_type_error: "id_usuario_operacao must be an integer",
  }).int({
    message: "id_usuario_operacao must be an integer",
  }).min(1, {
    message: "id_usuario_operacao must be an integer greater than 0",
  }),
  nome: z
    .string({
      invalid_type_error: "Name must be a string",
      description: "Name must be string between 2 and 90 characters",
    })
    .min(2, { message: "Name must be 2 or more characters long" })
    .max(90, { message: "Name must be 90 or less characters long" }),
  descricao: z.string({
    invalid_type_error: "descricao must be a string",
  }),
  Imagem: z.string({ invalid_type_error: "Imagem must be a string" }).optional(),
  ativo: z
    .number({
      invalid_type_error: "Ativo must be an integer 0 or 1",
    })
    .int()
    .min(0, { message: "Ativo must be 0 or 1" })
    .max(1, { message: "Ativo must be 0 or 1" }),
  order: z
    .number({
      invalid_type_error: "Order must be an integer",
    })
    .int({ message: "Order must be an integer" }).optional(),
  order_by_serie: z.string({
    invalid_type_error: "order_by_serie must be a string",
  }).optional(),
  destaque: z
    .number({
      invalid_type_error: "Destaque must be an integer 0 or 1",
    })
    .int({
      message: "Destaque must be an integer",
    })
    .min(0, {
      message: "must be 0 or 1",
    })
    .max(1, {
      message: "must be 0 or 1",
    }),
  created_at: z.string({
    invalid_type_error: "created_at must be a string",
  }).optional(),
  updated_at: z.string({
    invalid_type_error: "updated_at must be a string",
  }).optional(),
  deleted_at: z.string({
    invalid_type_error: "deleted_at must be a string",
  }).optional(),
  series_count: z.number({
    invalid_type_error: "series_count must be an integer",
  }).int({
    message: "series_count must be an integer",
  }).optional(),
});

export const PoliticaSchema: z.ZodSchema<Politica> = z.object({
  id: z.number({
    invalid_type_error: "id must be an integer",
  }).int({
    message: "id must be an integer",
  }).min(1, {
    message: "id must be an integer greater than 0",
  }).optional(),
  id_tipo_politica: z.number({
    invalid_type_error: "id_tipo_politica must be an integer",
  }).int({
    message: "id_tipo_politica must be an integer",
  }).min(1, {
    message: "id_tipo_politica must be an integer greater than 0",
  }),
  nome: z.string({
    invalid_type_error: "Name must be a string",
    description: "Name must be string between 2 and 90 characters",
  }).min(2, {
    message: "Name must be 2 or more characters long",
  }).max(90, {
    message: "Name must be 90 or less characters long",
  }),
  descricao: z.string({
    invalid_type_error: "descricao must be a string",
  }),
  ativo: z.number({
    invalid_type_error: "Ativo must be an integer 0 or 1",
  }).int({
    message: "Ativo must be an integer",
  }).min(0, {
    message: "Ativo must be 0 or 1",
  }).max(1, {
    message: "Ativo must be 0 or 1",
  }),
  id_usuario_operacao: z.number({
    invalid_type_error: "id_usuario_operacao must be an integer",
  }).int({
    message: "id_usuario_operacao must be an integer",
  }).min(1, {
    message: "id_usuario_operacao must be an integer greater than 0",
  }),
  data_alteracao: z.instanceof(Date, {
    message: "data_alteracao must be a date",
  }).optional(),
  data_exclusao: z.instanceof(Date, {
    message: "data_exclusao must be a date",
  }).optional(),
});

export const UpdatePoliticaSchema: z.ZodSchema<UpdatePolitica> = z.object({
  id_tipo_politica: z.number({
    invalid_type_error: "id_tipo_politica must be an integer",
  }).int({
    message: "id_tipo_politica must be an integer",
  }).min(1, {
    message: "id_tipo_politica must be an integer greater than 0",
  }).optional(),
  nome: z.string({
    invalid_type_error: "Name must be a string",
    description: "Name must be string between 2 and 90 characters",
  }).min(2, {
    message: "Name must be 2 or more characters long",
  }).max(90, {
    message: "Name must be 90 or less characters long",
  }).optional(),
  descricao: z.string({
    invalid_type_error: "descricao must be a string",
  }).optional(),
  ativo: z.number({
    invalid_type_error: "Ativo must be an integer 0 or 1",
  }).int({
    message: "Ativo must be an integer",
  }).min(0, {
    message: "Ativo must be 0 or 1",
  }).max(1, {
    message: "Ativo must be 0 or 1",
  }).optional(),
  id_usuario_operacao: z.number({
    invalid_type_error: "id_usuario_operacao must be an integer",
  }).int({
    message: "id_usuario_operacao must be an integer",
  }).min(1, {
    message: "id_usuario_operacao must be an integer greater than 0",
  }),
  data_exclusao: z.instanceof(Date, {
    message: "data_exclusao must be a date",
  }).optional(),
});

export const UpdateSeloSchema: z.ZodSchema<UpdateSelo> = z.object({
  id_usuario_operacao: z.number({
    invalid_type_error: "id_usuario_operacao must be an integer",
  }).int({
    message: "id_usuario_operacao must be an integer",
  }).min(1, {
    message: "id_usuario_operacao must be an integer greater than 0",
  }),
  nome: z
    .string({
      invalid_type_error: "Name must be a string",
      description: "Name must be string between 2 and 90 characters",
    })
    .min(2, { message: "Name must be 2 or more characters long" })
    .max(90, { message: "Name must be 90 or less characters long" }),
  descricao: z.string({
    invalid_type_error: "descricao must be a string",
  }).optional(),
  Imagem: z.string({ invalid_type_error: "Imagem must be a string" }).optional(),
  ativo: z
    .number({
      invalid_type_error: "Ativo must be an integer 0 or 1",
    })
    .int()
    .min(0, { message: "Ativo must be 0 or 1" })
    .max(1, { message: "Ativo must be 0 or 1" }),
  order: z
    .number({
      invalid_type_error: "Order must be an integer",
    })
    .int({ message: "Order must be an integer" }).optional(),
  order_by_serie: z.string({
    invalid_type_error: "order_by_serie must be a string",
  }).optional(),
  destaque: z
    .number({
      invalid_type_error: "Destaque must be an integer 0 or 1",
    })
    .int({
      message: "Destaque must be an integer",
    })
    .min(0, {
      message: "must be 0 or 1",
    })
    .max(1, {
      message: "must be 0 or 1",
    }).optional(),
  created_at: z.string({
    invalid_type_error: "created_at must be a string",
  }).optional(),
  updated_at: z.string({
    invalid_type_error: "updated_at must be a string",
  }).optional(),
  deleted_at: z.string({
    invalid_type_error: "deleted_at must be a string",
  }).optional(),
  series_count: z.number({
    invalid_type_error: "series_count must be an integer",
  }).int({
    message: "series_count must be an integer",
  }).optional(),
});

export const CupomSchema: z.ZodSchema<Cupom> = z.object({
  codigo: z.string({
    invalid_type_error: "codigo must be a string",
  }).min(3, {
    message: "codigo must be 3 or more characters long",
  }).max(20, {
    message: "codigo must be 30 or less characters long",
  }),
  limite_uso: z.number({
    invalid_type_error: "limite_uso must be an integer",
  }).int({
    message: "limite_uso must be an integer",
  }).min(1, {
    message: "limite_uso must be an integer greater than 0",
  }),
  qtd_dias: z.number({
    invalid_type_error: "qtd_dias must be an integer",
  }).int({
    message: "qtd_dias must be an integer",
  }).min(1, {
    message: "qtd_dias must be an integer greater than 0",
  }),
  data_validade: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "data_validade must be a date",
  }),
  id_usuario_operacao: z.number({
    invalid_type_error: "id_usuario_operacao must be an integer",
  }).int({
    message: "id_usuario_operacao must be an integer",
  }).min(1, {
    message: "id_usuario_operacao must be an integer greater than 0",
  }),
  ativo: z.number({
    invalid_type_error: "ativo must be an integer 0 or 1",
  }).int({
    message: "ativo must be an integer",
  }).min(0, {
    message: "ativo must be 0 or 1",
  }).max(1, {
    message: "ativo must be 0 or 1",
  }),
  nome: z.string({
    invalid_type_error: "nome must be a string",
  }).min(3, {
    message: "nome must be 3 or more characters long",
  }).max(30, {
    message: "nome must be 90 or less characters long",
  }),
});

export const UpdateCupomSchema: z.ZodSchema<UpdateCupom> = z.object({
  codigo: z.string({
    invalid_type_error: "codigo must be a string",
  }).min(3, {
    message: "codigo must be 3 or more characters long",
  }).max(20, {
    message: "codigo must be 30 or less characters long",
  }),
  limite_uso: z.number({
    invalid_type_error: "limite_uso must be an integer",
  }).int({
    message: "limite_uso must be an integer",
  }).min(1, {
    message: "limite_uso must be an integer greater than 0",
  }),
  qtd_dias: z.number({
    invalid_type_error: "qtd_dias must be an integer",
  }).int({
    message: "qtd_dias must be an integer",
  }).min(1, {
    message: "qtd_dias must be an integer greater than 0",
  }),
  data_validade: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "data_validade must be a date",
  }),
  id_usuario_operacao: z.number({
    invalid_type_error: "id_usuario_operacao must be an integer",
  }).int({
    message: "id_usuario_operacao must be an integer",
  }).min(1, {
    message: "id_usuario_operacao must be an integer greater than 0",
  }),
  ativo: z.number({
    invalid_type_error: "ativo must be an integer 0 or 1",
  }).int({
    message: "ativo must be an integer",
  }).min(0, {
    message: "ativo must be 0 or 1",
  }).max(1, {
    message: "ativo must be 0 or 1",
  }),
  nome: z.string({
    invalid_type_error: "nome must be a string",
  }).min(3, {
    message: "nome must be 3 or more characters long",
  }).max(30, {
    message: "nome must be 30 or less characters long",
  }),

});

export const AuthSchema: z.ZodSchema<AuthInput> = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Email must be a valid email" }),
  password: z
    .string({
      invalid_type_error: "Senha must be a string",
    })
    .min(8, { message: "Senha must be 8 or more characters long" })
    .max(30, { message: "Senha must be 30 or less characters long" })
});

export const UserAutorSchema: z.ZodSchema<UserToAutor> = z.object({
  fullName: z.string({ invalid_type_error: "fullName must be a string" }).min(2, {message: "fullName must be 2 or more characters long"}).max(90, {message: "fullName must be 90 or less characters long"}),
  cpfOrCnpj: z.string()
  .refine((value) => value.length === 11 || value.length === 14, {
    message: "cpfOrCnpj must be either 11 or 14 characters long",
  }),termsOfUse: z.boolean({ invalid_type_error: "termsOfUse must be a boolean" }),
  copyright: z.boolean({ invalid_type_error: "copyright must be a boolean" }),
  ageConfirmation: z.boolean({ invalid_type_error: "ageConfirmation must be a boolean" }),
  id_usuario_operacao: z.number({ invalid_type_error: "id_usuario_operacao must be an integer" }),
});