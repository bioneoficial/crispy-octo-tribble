import { OkPacket, RowDataPacket } from 'mysql2';
import { Request } from 'express';
import { executeQuery } from '../config/database';
import { Episodio, EpisodioImagem } from '../interfaces/interfaces';
import { getLimitOffset } from '../utils';

const TBL_NAME = 'Episodio';

export class EpisodioRepository {
    async create(episodio: Episodio): Promise<Episodio> {
        const sql = `
            INSERT INTO ${process.env.DB_DATABASE}.${TBL_NAME}
            (nome, id_conteudo, id_usuario, id_usuario_operacao, thumb, publicado, data_publicacao, ordem, premium, view, curtida, slug)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)
        `;

        const values = [
            episodio.nome,
            episodio.id_conteudo,
            episodio.id_usuario_operacao,
            episodio.id_usuario_operacao,
            episodio.thumb,
            episodio.publicado,
            new Date(episodio.data_publicacao),
            episodio.ordem,
            0,
            0,
            0,
            episodio.slug
        ];
        const result = await executeQuery(sql, values) as OkPacket;

        return { ...episodio, id: result.insertId };
    }

    async getById(id: number): Promise<Episodio> {
        const sql = `
          SELECT * FROM ${process.env.DB_DATABASE}.${TBL_NAME}
          WHERE id = ?
        `;
        const values = [id];
      
        const result = await executeQuery(sql, values);
      
        return (result as RowDataPacket[])[0] as Episodio;
      }

    async getByNome(nome: string): Promise<Episodio> {
        const sql = `
            SELECT * FROM ${process.env.DB_DATABASE}.${TBL_NAME}
            WHERE nome LIKE ?
        `;
        const values = [`%${nome}%`];

        const result = await executeQuery(sql, values);
        return (result as RowDataPacket[])[0] as Episodio;
    }

    async getAll(req: Request): Promise<Episodio[]> {
        const { limit, offset } = getLimitOffset(req);

        const sql = `SELECT * FROM ${process.env.DB_DATABASE}.${TBL_NAME} WHERE publicado = 1 LIMIT ${limit} OFFSET ${offset}`;
        const result = await executeQuery(sql);
        return (result as RowDataPacket[]) as Episodio[];
    }

    async getAllByConteudoId(conteudo_id: number, req: Request): Promise<Episodio[]> {
        const { limit, offset } = getLimitOffset(req);

        const sql = `SELECT * FROM ${process.env.DB_DATABASE}.${TBL_NAME} WHERE id_conteudo = ${conteudo_id} AND active = 1 LIMIT ${limit} OFFSET ${offset}`;
        const result = await executeQuery(sql);
        return (result as RowDataPacket[]) as Episodio[];
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

    async update(id: number, payload: Partial<Episodio>): Promise<boolean> {
        const entries = Object.entries(payload);
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

    async setEpisodeImage(imagemEpisodio: EpisodioImagem): Promise<boolean> {
        const sql = `
            INSERT INTO ${process.env.DB_DATABASE}.Episodio__Imagem
            (episodio_id,position,url,url_storage,created_at)
            VALUES (?,?,?,?,?)
        `;

        const values = [
            imagemEpisodio.episodio_id,
            imagemEpisodio.position,
            imagemEpisodio.url,
            imagemEpisodio.url,
            new Date(),
        ];
        const result = await executeQuery(sql, values) as OkPacket;

        return result.insertId !== null ;
    }

    async getAllEpisodeImage(episodio_id: number): Promise<EpisodioImagem[]> {
        const sql = `
            SELECT \`order\`, url FROM ${process.env.DB_DATABASE}.Episodio__Imagem 
            WHERE episodio_id = ${episodio_id} AND deleted_at IS NULL
            ORDER BY \`order\`
        `;
        const result = await executeQuery(sql);
        return (result as RowDataPacket[]) as EpisodioImagem[];
    }

    async getEpisodeImageById(id: number): Promise<EpisodioImagem> {
        const sql = `
            SELECT episodio_id, position, url_storage as url FROM ${process.env.DB_DATABASE}.Episodio__Imagem 
            WHERE id = ${id}            
        `;
        const result = await executeQuery(sql);
        return (result as RowDataPacket[])[0] as EpisodioImagem;
    }

    async deleteEpisodeImage(id: number): Promise<boolean> {
        const sql = `
            UPDATE ${process.env.DB_DATABASE}.Episodio__Imagem
            SET deleted_at = ?
            WHERE id = ?
        `;
        const values = [new Date(), id];
        const result = await executeQuery(sql, values) as OkPacket;

        console.log(result)

        //const str = new StorageRepository();
        //str.deleteObject('')

        return result.affectedRows > 0;
    }
    
}
