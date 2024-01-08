import { Request } from 'express';
import { Episodio, EpisodioImagem } from "../interfaces/interfaces";
import { EpisodioRepository } from "../repositories/episodio";

export class EpisodioService {
  private repository = new EpisodioRepository();

  async create(payload: Episodio): Promise<Episodio> {
    return this.repository.create(payload);
  }

  async getById(id:number): Promise<Episodio> {
    return this.repository.getById(id);
  }

  async getAll(req:Request): Promise<Episodio[]> {
    return this.repository.getAll(req);
  }

  async getAllByConteudoId(conteudo_id:number, req:Request): Promise<Episodio[]> {
    return this.repository.getAllByConteudoId(conteudo_id, req);
  }

  async getByNome(nome:string): Promise<Episodio> {
    return this.repository.getByNome(nome);
  }

  async deleteById(id:number): Promise<boolean> {
    return await this.repository.deleteById(id);
  }

  async update(id: number, payload: Partial<Episodio>): Promise<boolean> {
    return this.repository.update(id, payload);
  }

  async setEpisodeImage(imagemEpisodio: EpisodioImagem): Promise<boolean> {
    return this.repository.setEpisodeImage(imagemEpisodio);
  }

  async getAllEpisodeImage(episodio_id: number): Promise<EpisodioImagem[]> {
    return this.repository.getAllEpisodeImage(episodio_id);
  }

  async getEpisodeImageById(id: number): Promise<EpisodioImagem> {
    return this.repository.getEpisodeImageById(id);
  }

  async deleteEpisodeImage(imagemEpisodioId: number): Promise<boolean> {
    return this.repository.deleteEpisodeImage(imagemEpisodioId);
  }
}
