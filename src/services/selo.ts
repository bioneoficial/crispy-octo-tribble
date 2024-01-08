import { Selo } from "../interfaces/interfaces";
import { SeloRepository } from "../repositories/selo";
import fs from "fs";
import { DatabaseError } from "../commons/utils";

export class SeloService {
  private repository = new SeloRepository();

  async create(selo: Selo): Promise<Selo> {
    return this.repository.create(selo);
  }

  async update(id: number, selo: Partial<Selo>): Promise<boolean> {
    return this.repository.update(id, selo);
  }

  async getAll(): Promise<Selo[]> {
    return this.repository.getAll();
  }
  
  async getById(id: number): Promise<Selo> {
    return this.repository.getById(id);
  }

  async updateFoto(selo: Pick<Selo, 'Imagem' | 'id'>, file: Express.Multer.File): Promise<Selo> {
    const currentSelo = await this.repository.getById(Number(selo.id));
    if (!currentSelo) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      throw new DatabaseError('Could not find Selo');
    }

    if (file && currentSelo.id) {
      const updatedSeloData = { Imagem: file.filename };
      await this.repository.update(Number(currentSelo.id), updatedSeloData);
      currentSelo.Imagem = file.filename;

      await this.repository.updateFoto({ Imagem: currentSelo.Imagem, id: currentSelo.id });
    }

    return currentSelo;
  }

  async deleteSeloById(id: number): Promise<boolean> {
    return await this.repository.DeleteSelo(id);
  }
}

