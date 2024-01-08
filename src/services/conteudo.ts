import { Conteudo, ConteudoVitrineConteudo, ConteudoVitrineConteudoUpdate } from "../interfaces/interfaces";
import { ConteudoRepository } from "../repositories/conteudo";
import { Request } from 'express';

export class ConteudoService {
  private repository = new ConteudoRepository();

  async create(payload: Conteudo): Promise<Conteudo> {
    return this.repository.create(payload);
  }

  async getById(id:number): Promise<Conteudo> {
    return this.repository.getById(id);
  }

  async getByAuthor(id_usuario:number, req:Request): Promise<Conteudo[]> {
    return this.repository.getByAuthor(id_usuario, req);
  }

  async getAll(req: Request): Promise<Conteudo[]> {
    return this.repository.getAll(req);
  }

  async getByNome(nome:string): Promise<Conteudo> {
    return this.repository.getByNome(nome);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.repository.deleteById(id);
  }

  async update(id: number, payload: Partial<Conteudo>): Promise<boolean> {
    return this.repository.update(id, payload);
  }

  async addConteudoOnVitrine(payload: ConteudoVitrineConteudo): Promise<ConteudoVitrineConteudo> {
    return this.repository.addConteudoOnVitrine(payload);
  }

  async removeConteudoOnVitrine(id: number): Promise<boolean> {
    return this.repository.removeConteudoOnVitrine(id);
  }

  async updateConteudoOnVitrine(id: number, payload:ConteudoVitrineConteudoUpdate): Promise<boolean> {
    return this.repository.updateConteudoOnVitrine(id, payload);
  }
}
