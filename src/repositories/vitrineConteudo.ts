import _ from 'lodash';

import { OkPacket, RowDataPacket } from 'mysql2';
import { executeQuery } from '../config/database';
import { VitrineConteudo, VitrineConteudoHome } from '../interfaces/interfaces';
import { Request } from 'express';
import { getLimitOffset } from '../utils';

const TBL_NAME = 'Vitrine_Conteudo';

export class VitrineConteudoRepository {
    async create(vitrineConteudo: VitrineConteudo): Promise<VitrineConteudo> {
        const sql = `
            INSERT INTO ${process.env.DB_DATABASE}.${TBL_NAME}
            (nome, ordem, ativo, id_usuario_operacao, id_tipo_vitrine_conteudo, data_inclusao)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [vitrineConteudo.nome, vitrineConteudo.ordem, vitrineConteudo.ativo, vitrineConteudo.id_usuario_operacao, vitrineConteudo.id_tipo_vitrine_conteudo, new Date()];
        const result = await executeQuery(sql, values) as OkPacket;

        return { ...vitrineConteudo, id: result.insertId };
    }

    async getById(id: number): Promise<VitrineConteudo> {
        const sql = `
          SELECT * FROM ${process.env.DB_DATABASE}.${TBL_NAME}
          WHERE id = ?
        `;
        const values = [id];      
        const result = await executeQuery(sql, values);
      
        return (result as RowDataPacket[])[0] as VitrineConteudo;
      }

    async getAll(req:Request): Promise<VitrineConteudo[]> {
        const { limit, offset } = getLimitOffset(req);
        
        const sql = `SELECT * FROM ${process.env.DB_DATABASE}.${TBL_NAME} WHERE ativo = 1 LIMIT ${limit} OFFSET ${offset}`;
        const result = await executeQuery(sql);
        return (result as RowDataPacket[]) as VitrineConteudo[];
    }

    async deleteById(id: number): Promise<boolean> {
        const sql = `
            UPDATE ${process.env.DB_DATABASE}.${TBL_NAME}
            SET ativo = 0, data_exclusao = ?
            WHERE id = ?
        `;
        const values = [new Date(), id];
        const result = await executeQuery(sql, values) as OkPacket;

        return result.affectedRows > 0;
    }

    async update(id: number, vitrineConteudo: Partial<VitrineConteudo>): Promise<boolean> {
        const entries = Object.entries(vitrineConteudo);
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

    async getHome(): Promise<Record<string, VitrineConteudoHome[]>> {
        
        const ITEMS_BY_GROUP = 9
            
        const getVitrineConteudoHome = async (sql: string): Promise<VitrineConteudoHome[]> => {
            const result = await executeQuery(sql);
            const output = (result as RowDataPacket[]) as VitrineConteudoHome[];
            return _.take(output, ITEMS_BY_GROUP);
        };
        
        const sqlVitrine = `
            SELECT
                vc.id as vitrine_conteudo_id,
                vc.nome as vitrine_conteudo_nome,
                vc.ordem as vitrine_conteudo_ordem,
                c.nome as conteudo_nome,
                c.id as conteudo_id,
                c.imagem_banner,
                c.imagem_capa,
                cvc.id as cvc_id,
                cvc.ordem as cvc_ordem
            FROM 
                ${process.env.DB_DATABASE}.Conteudo__Vitrine_Conteudo cvc,
                ${process.env.DB_DATABASE}.Conteudo c,
                ${process.env.DB_DATABASE}.Vitrine_Conteudo vc
            WHERE
                cvc.id_conteudo = c.id
                and cvc.id_vitrine_conteudo = vc.id
            order by vc.ordem, cvc.ordem`;
        const selecoesSql = `
        SELECT DISTINCT
            c.nome as conteudo_nome,
            c.id as conteudo_id,
            c.imagem_banner,
            c.imagem_capa
        FROM 
            ${process.env.DB_DATABASE}.Conteudo c 
        JOIN 
            ${process.env.DB_DATABASE}.Episodio e ON e.id_conteudo = c.id
        WHERE 
            c.selecao = 1
        ORDER BY 
            e.data_inclusao DESC`;
        const independentesSql = `
        SELECT DISTINCT
            c.nome as conteudo_nome,
            c.id as conteudo_id,
            c.imagem_banner,
            c.imagem_capa
        FROM 
            ${process.env.DB_DATABASE}.Conteudo c 
        JOIN 
            ${process.env.DB_DATABASE}.Episodio e ON e.id_conteudo = c.id
        WHERE 
            c.selecao = 0
        ORDER BY 
            e.data_inclusao  DESC`;
        const premiumSql = `
            SELECT DISTINCT
                c.nome as conteudo_nome,
                c.id as conteudo_id,
                c.imagem_banner,
                c.imagem_capa
            FROM 
                ${process.env.DB_DATABASE}.Conteudo c 
            JOIN 
                ${process.env.DB_DATABASE}.Episodio e ON e.id_conteudo = c.id
            WHERE 
                c.premium = 1
                ORDER BY 
                e.data_inclusao  DESC`;
        const bombandoSql = `
        SELECT DISTINCT
            c.nome as conteudo_nome,
            c.id as conteudo_id,
            c.imagem_banner,
            c.imagem_capa,
            SUM(e.view_complete) as total_view_complete
        FROM 
            ${process.env.DB_DATABASE}.Conteudo c 
        JOIN 
            ${process.env.DB_DATABASE}.Episodio e ON e.id_conteudo = c.id
        GROUP BY
            c.nome, c.id, c.imagem_banner, c.imagem_capa
            ORDER BY 
            total_view_complete  DESC`;

        const [output, selecoes, independentes, premium, bombando] = await Promise.all([
            getVitrineConteudoHome(sqlVitrine),
            getVitrineConteudoHome(selecoesSql),
            getVitrineConteudoHome(independentesSql),
            getVitrineConteudoHome(premiumSql),
            getVitrineConteudoHome(bombandoSql)
        ]);
    
        const vitrineGroups = _.groupBy(output, 'vitrine_conteudo_nome');

        const outputFinal: Record<string, VitrineConteudoHome[]> = {
            'BOMBANDO': bombando,
            ...vitrineGroups,
            'PREMIUM': premium,
            'SELECOES': selecoes,
            'INDEPENDENTES': independentes,

        };
    
        return outputFinal;
    }

    async getByNome(nome: string): Promise<VitrineConteudo[]> {
        const sql = `
            SELECT
                vc.id as vitrine_conteudo_id,
                vc.nome as vitrine_conteudo_nome,
                vc.ordem as vitrine_conteudo_ordem,
                c.nome as conteudo_nome,
                c.id as conteudo_id,
                c.imagem_banner,
                c.imagem_capa,
                cvc.id as cvc_id,
                cvc.ordem as cvc_ordem
            FROM 
                ${process.env.DB_DATABASE}.Conteudo__Vitrine_Conteudo cvc,
                ${process.env.DB_DATABASE}.Conteudo c,
                ${process.env.DB_DATABASE}.Vitrine_Conteudo vc
            WHERE
                cvc.id_conteudo = c.id
                and cvc.id_vitrine_conteudo = vc.id
                and vc.nome LIKE ?
            ORDER BY 
                vc.ordem, cvc.ordem
        `;
        const values = [`%${nome}%`];
        
        const result = await executeQuery(sql, values);
        
        return (result as RowDataPacket[]) as VitrineConteudo[];
    }

    async getSelecoes(): Promise<VitrineConteudo[]> {
        const sql = `
            SELECT DISTINCT
                c.nome as conteudo_nome,
                c.id as conteudo_id,
                c.imagem_banner,
                c.imagem_capa
            FROM 
                ${process.env.DB_DATABASE}.Conteudo c 
            JOIN 
                ${process.env.DB_DATABASE}.Episodio e ON e.id_conteudo = c.id
            WHERE 
                c.selecao = 1
            ORDER BY 
                e.data_inclusao DESC
        `;
        
        const result = await executeQuery(sql);
        
        return (result as RowDataPacket[]) as VitrineConteudo[];
    }
    
    async getIndependentes(): Promise<VitrineConteudo[]> {
        const sql = `
        SELECT DISTINCT
            c.nome as conteudo_nome,
            c.id as conteudo_id,
            c.imagem_banner,
            c.imagem_capa
        FROM 
            ${process.env.DB_DATABASE}.Conteudo c 
        JOIN 
            ${process.env.DB_DATABASE}.Episodio e ON e.id_conteudo = c.id
        WHERE 
            c.selecao = 0
        ORDER BY 
            e.data_inclusao  DESC`;

        const result = await executeQuery(sql);

        return (result as RowDataPacket[]) as VitrineConteudo[];
    }

    async getPremium(): Promise<VitrineConteudo[]> {
        const sql = `
            SELECT DISTINCT
                c.nome as conteudo_nome,
                c.id as conteudo_id,
                c.imagem_banner,
                c.imagem_capa
            FROM 
                ${process.env.DB_DATABASE}.Conteudo c 
            JOIN 
                ${process.env.DB_DATABASE}.Episodio e ON e.id_conteudo = c.id
            WHERE 
                c.premium = 1
                ORDER BY 
                e.data_inclusao  DESC`;
        const result = await executeQuery(sql);

        return (result as RowDataPacket[]) as VitrineConteudo[];
    }
    async getBombando(): Promise<VitrineConteudo[]> {
        const sql = `
        SELECT DISTINCT
            c.nome as conteudo_nome,
            c.id as conteudo_id,
            c.imagem_banner,
            c.imagem_capa,
            SUM(e.view_complete) as total_view_complete
        FROM 
            ${process.env.DB_DATABASE}.Conteudo c 
        JOIN 
            ${process.env.DB_DATABASE}.Episodio e ON e.id_conteudo = c.id
        GROUP BY
            c.nome, c.id, c.imagem_banner, c.imagem_capa
            ORDER BY 
            total_view_complete  DESC
        LIMIT 9`;

        const result = await executeQuery(sql);

        return (result as RowDataPacket[]) as VitrineConteudo[];
    }
}
