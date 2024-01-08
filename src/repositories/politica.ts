import { OkPacket, RowDataPacket } from 'mysql2';
import { Politica, TipoPolitica } from '../interfaces/interfaces';
import { executeQuery } from '../config/database';
import { getLimitOffset } from '../utils';
import { Request } from 'express';

export class PoliticaRepository {
  async create(politica: Politica): Promise<Politica> {
    const sql = `
      INSERT INTO ${process.env.DB_DATABASE}.Politica
      (id_tipo_politica, nome, descricao, versao, ativo, id_usuario_operacao)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      politica.id_tipo_politica,
      politica.nome,
      politica.descricao,
      politica.versao,
      politica.ativo,
      politica.id_usuario_operacao,
    ];

    const result = await executeQuery(sql, values) as OkPacket;

    return { ...politica, id: result.insertId };
  }

  async update(id: number, politica: Partial<Politica>): Promise<boolean> {
    const entries = Object.entries(politica);
    const sql = `
      UPDATE ${process.env.DB_DATABASE}.Politica
      SET ${entries.map(([key]) => `${key} = ?`).join(', ')}
      WHERE id = ?
    `;
    const values = [...entries.map(([, value]) => value), id];

    const result = await executeQuery(sql, values) as OkPacket;

    return result.changedRows > 0;
  }

  async getAll(req: Request): Promise<Politica[]> {

    const { limit, offset } = getLimitOffset(req);

    const sql = `
      SELECT * FROM ${process.env.DB_DATABASE}.Politica LIMIT ${limit} OFFSET ${offset}
    `;

    const result = await executeQuery(sql) as RowDataPacket[];

    return result.map((row: RowDataPacket) => ({
      id: row.id,
      id_tipo_politica: row.id_tipo_politica,
      nome: row.nome,
      descricao: row.descricao,
      versao: row.versao,
      ativo: row.ativo,
      data_alteracao: row.data_alteracao,
      data_inclusao: row.data_inclusao
    }));
  }

  async deleteById(id: number): Promise<boolean> {
    const sql = `
    UPDATE ${process.env.DB_DATABASE}.Politica
    SET ativo = 0
    WHERE id = ?
    `;

    const result = await executeQuery(sql, [id]) as OkPacket;

    return result.affectedRows > 0;
  }

  async getPoliticaByTipo(): Promise<TipoPolitica[]> {
    const sql = `
    SELECT id, nome FROM ${process.env.DB_DATABASE}.Tipo_Politica
    `;
    const result = await executeQuery(sql) as RowDataPacket[];
    return result.map((row: RowDataPacket) => ({
      id: row.id,
      nome: row.nome
    }));
  }

  async countByTipoId(id_tipo_politica: number): Promise<number> {
    const sql = `
      SELECT COUNT(*) as count FROM ${process.env.DB_DATABASE}.Politica
      WHERE id_tipo_politica = ?
    `;
  
    const result = await executeQuery(sql, [id_tipo_politica]) as RowDataPacket[];
  
    return result[0].count;
  }
  
}
