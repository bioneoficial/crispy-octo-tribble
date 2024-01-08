import { OkPacket, RowDataPacket } from 'mysql2';
import  {  executeQuery } from '../config/database';
import { Cupom } from '../interfaces/interfaces';
import { Request } from 'express';
import { getLimitOffset } from '../utils';

export class CupomRepository {
  async create(cupom: Cupom): Promise<Cupom> {
    const sql = `
      INSERT INTO ${process.env.DB_DATABASE}.Cupom
      (nome, codigo, limite_uso, qtd_dias, data_validade, ativo, id_usuario_operacao, data_inclusao)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [cupom.nome, cupom.codigo, cupom.limite_uso, cupom.qtd_dias, cupom.data_validade, cupom.ativo, cupom.id_usuario_operacao, new Date()];
    const result = await executeQuery(sql, values) as OkPacket;

    return { ...cupom, id: result.insertId };
  }

  async getAll(req:Request): Promise<Cupom[]> {
    const { limit, offset } = getLimitOffset(req);
    const sql = `SELECT * FROM ${process.env.DB_DATABASE}.Cupom LIMIT ${limit} OFFSET ${offset}`;
    const result = await executeQuery(sql);
    return (result as RowDataPacket[]) as Cupom[];
  }

  async deleteById(id: number): Promise<boolean> {
    const sql = `
        UPDATE ${process.env.DB_DATABASE}.Cupom
        SET ativo = 0, data_exclusao = ?
        WHERE id = ?
    `;
    const values = [(new Date()).toISOString().slice(0, 19).replace('T', ' '), id];
    const result = await executeQuery(sql, values) as OkPacket;

    return result.affectedRows > 0;
}

async update(id: number, cupom: Partial<Cupom>): Promise<boolean> {
  const entries = Object.entries(cupom);
  const sql = `
      UPDATE ${process.env.DB_DATABASE}.Cupom 
      SET ${entries.map(([key]) => `\`${key}\` = ?`).join(', ')}
      WHERE id = ?
  `;
  const values = [...entries.map(([, value]) => value), id];

  const result = await executeQuery(sql, values) as OkPacket;

  return result.changedRows > 0;
}

}
