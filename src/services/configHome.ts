import { ConfiguracaoHome } from "../interfaces/interfaces";
import { ConfiguracaoRepository } from "../repositories/configHome";

export class ConfiguracaoService {
    private repository = new ConfiguracaoRepository();
  
    async create(configuracao: ConfiguracaoHome): Promise<ConfiguracaoHome> {
      return this.repository.create(configuracao);
    }
  
    async get(): Promise<ConfiguracaoHome[]> {
      return this.repository.get();
    }

    async update(id: number, config: Partial<ConfiguracaoHome>): Promise<boolean> {
        return this.repository.update(id, config);
    }
  }
  