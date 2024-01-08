import { z } from "zod";
import { VitrineConteudo, VitrineConteudoUpdate } from "../../interfaces/interfaces"

export const VitrineConteudoSchema: z.ZodSchema<VitrineConteudo> = z.object({
  id_usuario_operacao: z.number({
    invalid_type_error: "id_usuario_operacao must be an integer",
  }).int({
    message: "id_usuario_operacao must be an integer",
  }).min(1, {
    message: "id_usuario_operacao must be an integer greater than 0",
  }),
  id_tipo_vitrine_conteudo: z.number().int().min(1, {message: "id_tipo_vitrine_conteudo must be an integer greater than 0" }),
  nome: z
    .string({
      invalid_type_error: "Nome must be a string",
    }),
  ordem: z.number({
    invalid_type_error: "ordem must be an integer",
  }).int({
    message: "ordem must be an integer",
  }).min(1, {
    message: "ordem must be 0 or 1",
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
});

export const VitrineConteudoUpdateSchema: z.ZodSchema<VitrineConteudoUpdate> = z.object({
  id_usuario_operacao: z.number().int().min(1),
  id_tipo_vitrine_conteudo: z.number().int().min(1).optional(),
  nome: z.string().optional(),
  ordem: z.number().int().min(0).optional(),
  ativo: z.number().int().min(0).max(1).optional()
});
