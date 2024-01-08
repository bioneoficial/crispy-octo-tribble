import { UserToAutor, Usuario, userTipoUsuarioData } from '../interfaces/interfaces';
import  { executeQuery } from '../config/database';
import { OkPacket, RowDataPacket } from 'mysql2';
import { Request } from 'express';
import { DatabaseError } from '../commons/utils';
import { getLimitOffset } from '../utils';

export class UsuarioRepository {
  async create(user: Usuario): Promise<Usuario> {
    const sql = `
      INSERT INTO ${process.env.DB_DATABASE}.Usuario 
      (nome, email, senha, fotoPath, id_usuario_operacao)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const values = [user.nome, user.email, user.senha, user.fotoPath, user.id_usuario_operacao];
    try {
      const result = await executeQuery(sql, values);
      if (result instanceof Array && result.length === 0) {
        throw new DatabaseError('Could not insert user');
      }

      const id = (result as OkPacket)?.insertId;
      return { ...user, id };

  } catch (error) {
      if ((error as any).code === 'ER_DUP_ENTRY') {
          throw new DatabaseError('Email já cadastrado');
      }
      throw error;
  }
  }

  async updateFoto(user: Pick<Usuario, 'fotoPath' | 'id'>): Promise<void> {
    const sql = `
      UPDATE ${process.env.DB_DATABASE}.Usuario 
      SET fotoPath = ?
      WHERE id = ?
    `;
    const values = [user.fotoPath, user.id];
  
    const result = await executeQuery(sql, values);
  
    if (result instanceof Array && result.length === 0) {
      throw new DatabaseError('Could not update user foto');
    }
  }

  async getById(id: number): Promise<Usuario> {
    const sql = `
      SELECT id, nome, descricao, email, fotoPath FROM ${process.env.DB_DATABASE}.Usuario 
      WHERE id = ?
    `;
    const values = [id];
  
    const result = await executeQuery(sql, values);
  
    return (result as RowDataPacket[])[0] as Usuario;
  }

  async getByEmail(email: string): Promise<Usuario> {
    const sql = `
      SELECT * FROM ${process.env.DB_DATABASE}.Usuario 
      WHERE email = ?
    `;
    const values = [email];
  
    const result = await executeQuery(sql, values);
  
    return (result as RowDataPacket[])[0] as Usuario;
  }

  async getAll(req: Request): Promise<Usuario[]> {

    const { limit, offset } = getLimitOffset(req);
    
    const sql = `SELECT 
          user.id,
          user.nome,
          user.descricao,
          user.email,
          user.fotoPath,
          user.ativo,
          user.data_inclusao,
          tu.nome as tipo
      FROM 
          ${process.env.DB_DATABASE}.Usuario user
      INNER JOIN
          ${process.env.DB_DATABASE}.Usuario__Tipo_Usuario utu
      ON 
          utu.id_usuario = user.id
      INNER JOIN
          ${process.env.DB_DATABASE}.Tipo_Usuario tu
      ON 
          utu.id_tipo_usuario = tu.id          
      LIMIT ${limit} OFFSET ${offset}
    `;        

    const result = await executeQuery(sql);

    return (result as RowDataPacket[]) as Usuario[];
  }

  async getIdTipoUsuario(nome: string): Promise<number> {
    const sql = `
      SELECT id FROM ${process.env.DB_DATABASE}.Tipo_Usuario 
      WHERE nome = ?
    `;
    const values = [nome];
  
    const result = await executeQuery(sql, values);
  
    return (result as RowDataPacket[])[0].id;
  }

  async createUsuarioTipoUsuario(data: userTipoUsuarioData): Promise<Usuario[]> {
    const sql = `
      INSERT INTO ${process.env.DB_DATABASE}.Usuario__Tipo_Usuario
      (id_usuario, id_tipo_usuario, id_usuario_operacao)
      VALUES ( ?, ?, ?)`;
      const values = [data.id_usuario, data.id_tipo_usuario, 1, ]

    const result = await executeQuery(sql, values);

    return (result as RowDataPacket[]) as Usuario[];
  }

  async deleteUsuario(id: number): Promise<void> {
    const sql = `DELETE FROM ${process.env.DB_DATABASE}.Usuario WHERE id = ?`;
    const values = [id];
  
    await executeQuery(sql, values);
  }

  async deleteUsuarioTipoUsuario(id: number): Promise<void> {
    const sql = `DELETE FROM ${process.env.DB_DATABASE}.Usuario__Tipo_Usuario WHERE id_usuario = ?`;
    const values = [id];
  
    await executeQuery(sql, values);
  }

  async updateUsuario(id: number, data: Partial<Usuario>): Promise<boolean> {
    const entries = Object.entries(data);
    const sql = `
      UPDATE ${process.env.DB_DATABASE}.Usuario 
      SET ${entries.map(([key]) => `${key} = ?`).join(', ')}
      WHERE id = ?
    `;
    const values = [...entries.map(([, value]) => value), id];
  
    const result = await executeQuery(sql, values) as OkPacket;

    return result.changedRows > 0;
  }

  async updateTipoUsuario(id_usuario: number, id_tipo_usuario: number): Promise<void> {
    const sql = `
      UPDATE ${process.env.DB_DATABASE}.Usuario__Tipo_Usuario 
      SET id_tipo_usuario = ?
      WHERE id_usuario = ?
    `;
    
    await executeQuery(sql, [id_tipo_usuario, id_usuario]);
  }

  async insertValidationCode(email: string, code: string): Promise<void> {
      const sql = `
        INSERT INTO Autenticacao (usuario, tipo_token, codigo, data_inclusao, data_expiracao)
        VALUES (?, 3, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY))
      `;
      const values = [email, code];
      await executeQuery(sql, values);
  }

  async verifiedEmail(id: number): Promise<void> {
    const sql = `
      UPDATE ${process.env.DB_DATABASE}.Usuario
      SET email_verified_at = ?
      WHERE id = ?
    `;
    const updatedDate = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');

    const values = [updatedDate, id];

    await executeQuery(sql, values);
  }

  async userToAutor(id: number, data: UserToAutor): Promise<void> {
    const updatedDate = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');

    const sql = `
      UPDATE ${process.env.DB_DATABASE}.Usuario
      SET minor_age = ?, cpf = ?, convert_to_author = ?, complete_name = ?
      WHERE id = ? AND email_verified_at IS NOT NULL
    `;

    const values = [Number(data.ageConfirmation), data.cpfOrCnpj, updatedDate, data.fullName, id];
    await executeQuery(sql, values);

    const sql2 = `
    UPDATE ${process.env.DB_DATABASE}.Usuario__Tipo_Usuario
    SET id_tipo_usuario = 5, data_alteracao = ?, id_usuario_operacao = ?
    WHERE id_usuario = ?
    `;
    const values2 = [updatedDate, id, id];

    await executeQuery(sql2, values2);
  }
}