import { z } from "zod";
import { Conteudo, ConteudoUpdate, ConteudoVitrineConteudo, ConteudoVitrineConteudoUpdate } from "../../interfaces/interfaces"

export const ConteudoSchema: z.ZodSchema<Conteudo> = z.object({
  nome: z.string(),
  descricao: z.string(),
  slug: z.string(),
  imagem_capa: z.string(),
  imagem_miniatura: z.string(),
  imagem_banner: z.string(),
  publicado: z.number().int().min(0).max(1),
  selecao: z.number().int().min(0).max(1).optional(),
  premium: z.number().int().min(0).max(1).optional(),
  moderada: z.number().int().min(0).max(1).optional(),
  id_usuario_operacao: z.number().int().min(1),
});

export const ConteudoUpdateSchema: z.ZodSchema<ConteudoUpdate> = z.object({
  nome: z.string(),
  descricao: z.string(),
  slug: z.string(),
  imagem_capa: z.string(),
  imagem_miniatura: z.string(),
  imagem_banner: z.string(),
  publicado: z.number().int().min(0).max(1),
  selecao: z.number().int().min(0).max(1),
  premium: z.number().int().min(0).max(1),
  moderada: z.number().int().min(0).max(1),  
});


export const ConteudoVitrineConteudoSchema: z.ZodSchema<ConteudoVitrineConteudo> =  z.object({
  id_conteudo: z.number().int().min(1),
  ordem: z.number().int().min(0),
  id_vitrine_conteudo: z.number().int().min(1),
  id_usuario_operacao: z.number().int().min(1),
})

export const ConteudoVitrineUpdateConteudoSchema: z.ZodSchema<ConteudoVitrineConteudoUpdate> =  z.object({
  id_conteudo: z.number().int().min(1).optional(),
  ordem: z.number().int().min(0).optional(),
  id_vitrine_conteudo: z.number().int().min(1).optional(),
  id_usuario_operacao: z.number().int().min(1),
})