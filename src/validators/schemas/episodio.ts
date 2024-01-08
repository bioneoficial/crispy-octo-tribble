import { z } from "zod";
import { Episodio, EpisodioSearchByName } from "../../interfaces/interfaces"

export const EpisodioSchema: z.ZodSchema<Episodio> = z.object({
  nome: z.string(),
  id_conteudo: z.number().int().min(1, { message: "O episódio deve pertencer a uma série" }),
  id_usuario_operacao: z.number().int().min(1),
  publicado: z.number().int().min(0).max(1),
  ordem: z.number().int().min(0),
  thumb: z.string().optional(),    
  data_publicacao: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "data_publicacao must be a date",
  })
});

export const EpisodioSearchByNameSchema: z.ZodSchema<EpisodioSearchByName> = z.object({
  nome: z.string().min(3),
});