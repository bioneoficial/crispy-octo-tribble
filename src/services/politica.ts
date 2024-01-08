import { Politica, TipoPolitica } from '../interfaces/interfaces';
import { PoliticaRepository } from '../repositories/politica';
import { Request } from 'express';

export class PoliticaService {
  constructor(private politicaRepository: PoliticaRepository) {}

  async create(politica: Politica): Promise<Politica> {
    const count = await this.politicaRepository.countByTipoId(politica.id_tipo_politica);
    politica.versao = count + 1;
    return await this.politicaRepository.create(politica);
  }

  async update(id: number, politica: Partial<Politica>): Promise<boolean> {
    if(politica.id_tipo_politica) {
      const count = await this.politicaRepository.countByTipoId(politica.id_tipo_politica);
      politica.versao = count + 1;
    }
    politica.data_alteracao = new Date();
    const updatePolitica = {...politica,  data_alteracao: new Date()}

    return await this.politicaRepository.update(id, updatePolitica);
  }

  async getAll(req:Request): Promise<Politica[]> {
    return await this.politicaRepository.getAll(req);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.politicaRepository.deleteById(id);
  }

  async getPoliticaByTipo(): Promise<TipoPolitica[]> {
    return await this.politicaRepository.getPoliticaByTipo();
  }
}
