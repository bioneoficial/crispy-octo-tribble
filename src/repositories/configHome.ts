import { ConfiguracaoHome } from "../interfaces/interfaces";
import { OkPacket, RowDataPacket } from 'mysql2';
import { executeQuery } from '../config/database';


export class ConfiguracaoRepository {
    async create(configuracao: ConfiguracaoHome): Promise<ConfiguracaoHome> {
        const sql = `
        INSERT INTO ${process.env.DB_DATABASE}.Configuracao
        (habilitar_banner_selecao, url_banner_assinatura, habilitar_pagina_assinatura, nome_editora, descricao_editora, imagem_editora, id_usuario_operacao, data_inclusao, qtd_item_home, qtd_item_ultimos_dia)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        configuracao.habilitar_banner_selecao, 
        configuracao.url_banner_assinatura, 
        configuracao.habilitar_pagina_assinatura, 
        configuracao.nome_editora, 
        configuracao.descricao_editora, 
        configuracao.imagem_editora, 
        configuracao.id_usuario_operacao,
        configuracao.data_inclusao,
        configuracao.qtd_item_home,
        configuracao.qtd_item_ultimos_dia
      ];
  
      const result = await executeQuery(sql, values) as OkPacket;
  
      return { ...configuracao, id: result.insertId };
    }
  
    async get(): Promise<ConfiguracaoHome[]> {
        const sql = `SELECT * FROM ${process.env.DB_DATABASE}.Configuracao`;

        const result = await executeQuery(sql) as RowDataPacket[];
    
        return result.map(configuracao => ({
          habilitar_banner_selecao: configuracao.habilitar_banner_selecao,
          url_banner_assinatura: configuracao.url_banner_assinatura,
          habilitar_pagina_assinatura: configuracao.habilitar_pagina_assinatura,
          nome_editora: configuracao.nome_editora,
          descricao_editora: configuracao.descricao_editora,
          imagem_editora: configuracao.imagem_editora,
          qtd_item_home: configuracao.qtd_item_home,
          qtd_item_ultimos_dia: configuracao.qtd_item_ultimos_dia,
        }));
    }

    async update(id: number, config: Partial<ConfiguracaoHome>): Promise<boolean> {
        const entries = Object.entries(config);
        const sql = `
            UPDATE ${process.env.DB_DATABASE}.Configuracao 
            SET ${entries.map(([key]) => `\`${key}\` = ?`).join(', ')}
            WHERE id = ?
        `;
        const values = [...entries.map(([, value]) => value), id];
      
        const result = await executeQuery(sql, values) as OkPacket;
      
        return result.changedRows > 0;
    }
  }
  