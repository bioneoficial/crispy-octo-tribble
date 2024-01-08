import { Request } from 'express';
import { Cupom } from "../interfaces/interfaces";
import { CupomRepository } from "../repositories/cupom";

export class CupomService {
  private repository = new CupomRepository();

  async create(cupom: Cupom): Promise<Cupom> {
    return this.repository.create(cupom);
  }

  async getAll(req:Request): Promise<Cupom[]> {
    return this.repository.getAll(req);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.repository.deleteById(id);
}

async update(id: number, cupom: Partial<Cupom>): Promise<boolean> {
  return this.repository.update(id, cupom);
}
}
