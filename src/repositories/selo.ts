import { Selo } from '../interfaces/interfaces';
import  {  executeQuery } from '../config/database';
import { OkPacket, RowDataPacket } from 'mysql2';
import { DatabaseError } from '../commons/utils';

export class SeloRepository {
  async create(selo: Selo): Promise<Selo> {
    const sql = `
      INSERT INTO ${process.env.DB_DATABASE}.Selo
      (nome, descricao, ativo, destaque, id_usuario_operacao)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [selo.nome, selo.descricao, selo.ativo, selo.destaque, selo.id_usuario_operacao];

    const result = await executeQuery(sql, values);

    if (result instanceof Array && result.length === 0) {
      throw new DatabaseError('Could not insert selo');
    }

    const id = (result as OkPacket)?.insertId;

    return { ...selo, id };
  }

  async update(id: number, selo: Partial<Selo>): Promise<boolean> {
    const entries = Object.entries(selo);
    const sql = `
      UPDATE ${process.env.DB_DATABASE}.Selo 
      SET ${entries.map(([key]) => `\`${key}\` = ?`).join(', ')}
      WHERE id = ?
    `;
    const values = [...entries.map(([, value]) => value), id];
  
    const result = await executeQuery(sql, values) as OkPacket;

    return result.changedRows > 0;
}


  async getAll(): Promise<Selo[]> {
    const sql = `SELECT * FROM ${process.env.DB_DATABASE}.Selo LIMIT ${process.env.DB_QUERY_LIMIT}`;
    const result = await executeQuery(sql);
    return (result as RowDataPacket[]) as Selo[];
  }

  async getById(id: number): Promise<Selo> {
    const sql = `
      SELECT * FROM ${process.env.DB_DATABASE}.Selo 
      WHERE id = ?
    `;
    const values = [id];
  
    const result = await executeQuery(sql, values);
  
    return (result as RowDataPacket[])[0] as Selo;
  }

  async updateFoto(selo: Pick<Selo, 'Imagem' | 'id'>): Promise<void> {
    const sql = `
      UPDATE ${process.env.DB_DATABASE}.Selo 
      SET Imagem = ?
      WHERE id = ?
    `;
    const values = [selo.Imagem, selo.id];
  
    const result = await executeQuery(sql, values);
  
    if (result instanceof Array && result.length === 0) {
      throw new DatabaseError('Could not update selo Image');
    }
  }

  async DeleteSelo(id: number): Promise<boolean> {
    const sql = `
      UPDATE ${process.env.DB_DATABASE}.Selo
      SET ativo = 0, data_exclusao = ?
      WHERE id = ?
    `;
    const result = await executeQuery(sql, [(new Date()).toISOString().slice(0, 19).replace('T', ' '),id] ) as OkPacket;
  
    return result.affectedRows > 0;
  }
  
}
