import { Request } from 'express';
import { VitrineConteudo, VitrineConteudoHome } from "../interfaces/interfaces";
import { VitrineConteudoRepository } from "../repositories/vitrineConteudo";

export class VitrineConteudoService {
  private repository = new VitrineConteudoRepository();

  async create(vitrineConteudo: VitrineConteudo): Promise<VitrineConteudo> {
    return this.repository.create(vitrineConteudo);
  }

  async getById(id:number): Promise<VitrineConteudo> {
    return this.repository.getById(id);
  }

  async getAll(req:Request): Promise<VitrineConteudo[]> {
    return this.repository.getAll(req);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.repository.deleteById(id);
  }

  async update(id: number, vitrineConteudo: Partial<VitrineConteudo>): Promise<boolean> {
    return this.repository.update(id, vitrineConteudo);
  }

  async getHome(): Promise<Record<string, VitrineConteudoHome[]>> {
    return this.repository.getHome();
  }

  async getByNome(nome:string): Promise<VitrineConteudo[]> {
    return this.repository.getByNome(nome);
  }

  async getSelecoes(): Promise<VitrineConteudo[]> {
    return this.repository.getSelecoes();
}

  async getIndependentes(): Promise<VitrineConteudo[]> {
    return this.repository.getIndependentes();
}

  async getPremium(): Promise<VitrineConteudo[]> {
    return this.repository.getPremium();
}

  async getBombando(): Promise<VitrineConteudo[]> {
    return this.repository.getBombando();
}
}
