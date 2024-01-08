import { OkPacket, RowDataPacket } from 'mysql2';
import { executeQuery } from '../config/database';
import { Conteudo, ConteudoVitrineConteudo, ConteudoVitrineConteudoUpdate } from '../interfaces/interfaces';
import { Request } from 'express';
import { getLimitOffset } from '../utils';

const TBL_NAME = 'Conteudo';

export class ConteudoRepository {

    async create(conteudo: Conteudo): Promise<Conteudo> {
        const sql = `
            INSERT INTO ${process.env.DB_DATABASE}.${TBL_NAME}
            (nome,id_usuario,descricao,slug,imagem_capa,imagem_miniatura,imagem_banner,publicado,selecao,premium,moderada,id_usuario_operacao,data_inclusao)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;

        const values = [
            conteudo.nome,
            conteudo.id_usuario_operacao,
            conteudo.descricao,
            conteudo.slug,
            conteudo.imagem_capa,
            conteudo.imagem_miniatura,
            conteudo.imagem_banner,
            conteudo.publicado,
            conteudo.selecao,
            conteudo.premium,
            conteudo.moderada,
            conteudo.id_usuario_operacao,            
            new Date()
        ];
        const result = await executeQuery(sql, values) as OkPacket;

        return { ...conteudo, id: result.insertId };
    }

    async getById(id: number): Promise<Conteudo> {
        const sql = `
          SELECT * FROM ${process.env.DB_DATABASE}.${TBL_NAME}
          WHERE id = ?
        `;
        const values = [id];      
        const result = await executeQuery(sql, values);      
        return (result as RowDataPacket[])[0] as Conteudo;
    }

    async getByAuthor(id_usuario: number, req:Request): Promise<Conteudo[]> {
        const { limit, offset } = getLimitOffset(req);
        const sql = `
          SELECT * FROM ${process.env.DB_DATABASE}.${TBL_NAME}
          WHERE id_usuario = ?
          LIMIT ${limit} OFFSET ${offset}
        `;
        const values = [id_usuario];      
        const result = await executeQuery(sql, values);      
        return (result as RowDataPacket[]) as Conteudo[];
    }

    async getByNome(nome: string): Promise<Conteudo> {
        const sql = `
            SELECT * FROM ${process.env.DB_DATABASE}.${TBL_NAME}
            WHERE nome LIKE ?
        `;
        const values = [`%${nome}%`];
        const result = await executeQuery(sql, values);
        return (result as RowDataPacket[])[0] as Conteudo;
    }

    async getAll(req:Request): Promise<Conteudo[]> {
        const { limit, offset } = getLimitOffset(req);
        const sql = `SELECT * FROM ${process.env.DB_DATABASE}.${TBL_NAME} WHERE publicado = 1 LIMIT ${limit} OFFSET ${offset}`;
        const result = await executeQuery(sql);
        return (result as RowDataPacket[]) as Conteudo[];
    }

    async deleteById(id: number): Promise<boolean> {
        const sql = `
            UPDATE ${process.env.DB_DATABASE}.${TBL_NAME}
            SET publicado = 0, data_exclusao = ?
            WHERE id = ?
        `;
        const values = [new Date(), id];
        const result = await executeQuery(sql, values) as OkPacket;

        return result.affectedRows > 0;
    }

    async update(id: number, conteudo: Partial<Conteudo>): Promise<boolean> {
        const entries = Object.entries(conteudo);
        entries.push(['data_alteracao', new Date()])

        const sql = `
            UPDATE ${process.env.DB_DATABASE}.${TBL_NAME} 
            SET ${entries.map(([key]) => `\`${key}\` = ?`).join(', ')}
            WHERE id = ?
        `;
        
        const values = [...entries.map(([, value]) => value), id];
        const result = await executeQuery(sql, values) as OkPacket;

        return result.changedRows > 0;
    }


    async addConteudoOnVitrine(payload: ConteudoVitrineConteudo): Promise<ConteudoVitrineConteudo> {
        const sql = `
            INSERT INTO ${process.env.DB_DATABASE}.Conteudo__Vitrine_Conteudo
            (id_conteudo, id_vitrine_conteudo, id_usuario_operacao, ordem, data_inclusao)
            VALUES (?,?,?,?,?)
        `;

        const values = [payload.id_conteudo, payload.id_vitrine_conteudo, payload.id_usuario_operacao, payload.ordem, new Date()];
        const result = await executeQuery(sql, values) as OkPacket;

        return { ...payload, id: result.insertId };
    }

    async removeConteudoOnVitrine(id: number): Promise<boolean> {
        const sql = `DELETE FROM ${process.env.DB_DATABASE}.Conteudo__Vitrine_Conteudo WHERE id = ?`;

        const values = [id];
        const result = await executeQuery(sql, values) as OkPacket;

        return result.affectedRows > 0;
    }

    async updateConteudoOnVitrine(id: number, vitrineConteudo: Partial<ConteudoVitrineConteudoUpdate>): Promise<boolean> {
        const entries = Object.entries(vitrineConteudo);
        entries.push(['data_alteracao', new Date()])

        const sql = `
            UPDATE ${process.env.DB_DATABASE}.Conteudo__Vitrine_Conteudo
            SET ${entries.map(([key]) => `\`${key}\` = ?`).join(', ')}
            WHERE id = ?
        `;
        
        const values = [...entries.map(([, value]) => value), id];
        const result = await executeQuery(sql, values) as OkPacket;

        return result.changedRows > 0;
    }
}
