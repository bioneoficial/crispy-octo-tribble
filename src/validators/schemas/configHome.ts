import { ConfiguracaoHome } from "../../interfaces/interfaces";
import { z } from "zod";


export const ConfiguracaoSchemaPost: z.ZodSchema<ConfiguracaoHome> = z.object({
    habilitar_banner_selecao: z.number({ invalid_type_error: "habilitar_banner_selecao must be a number"}).min(0).max(1),
    url_banner_assinatura: z.string({ invalid_type_error: "url_banner_assinatura must be a string"}),
    habilitar_pagina_assinatura: z.number({ invalid_type_error: "habilitar_pagina_assinatura must be a number"}).min(0).max(1),
    nome_editora: z.string({ invalid_type_error: "nome_editora must be a string"}),
    descricao_editora: z.string({ invalid_type_error: "descricao_editora must be a string"}),
    imagem_editora: z.string({ invalid_type_error: "imagem_editora must be a string"}),
    id_usuario_operacao: z.number({ invalid_type_error: "id_usuario_operacao must be a number"}).min(1),
    qtd_item_home: z.number({ invalid_type_error: "qtd_item_home"}).min(3).max(15),
    qtd_item_ultimos_dia: z.number({ invalid_type_error: "qtd_item_ultimos_Dia"}).min(1).max(400),
  });

  export const ConfiguracaoSchemaUpdate: z.ZodSchema<ConfiguracaoHome> = z.object({
    habilitar_banner_selecao: z.number({ invalid_type_error: "habilitar_banner_selecao must be a number"}).min(0).max(1).optional(),
    url_banner_assinatura: z.string({ invalid_type_error: "url_banner_assinatura must be a string"}).optional(),
    nome_editora: z.string({ invalid_type_error: "nome_editora must be a string"}).optional(),
    descricao_editora: z.string({ invalid_type_error: "descricao_editora must be a string"}).optional(),
    habilitar_pagina_assinatura: z.number({ invalid_type_error: "habilitar_pagina_assinatura must be a number"}).min(0).max(1).optional(),
    id_usuario_operacao: z.number({ invalid_type_error: "id_usuario_operacao must be a number"}).min(1, { message: "id_usuario_operacao must be a number"}),
  });