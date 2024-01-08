import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UserToAutor, Usuario, userTipoUsuarioData } from '../interfaces/interfaces';
import { UsuarioRepository } from '../repositories/usuario';
import { generateValidationCode } from '../helpers/tokens';

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  constructor(usuarioRepository: UsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async create(user: Usuario) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.senha, saltRounds);

    user.senha = hashedPassword;
    user.id_usuario_operacao = 1;
    const createdUser = await this.usuarioRepository.create(user);

    const { senha, ...userWithoutPassword } = createdUser;
    
    return userWithoutPassword;
  }

  async getById(id: number): Promise<Usuario> {
    return this.usuarioRepository.getById(id);
  }

  async getByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.getByEmail(email);
  }

  async updateFoto(user: Pick<Usuario, 'fotoPath' | 'id'>): Promise<void> {
    await this.usuarioRepository.updateFoto(user);
  }

  async getAll(req: Request): Promise<Usuario[]> {
    return await this.usuarioRepository.getAll(req);
  }

  async getIdTipoUsuario(nome: string): Promise<number> {
    return await this.usuarioRepository.getIdTipoUsuario(nome);
  }

  async createUsuarioTipoUsuario(data: userTipoUsuarioData): Promise<Usuario[]> {
    return await this.usuarioRepository.createUsuarioTipoUsuario(data);
  }

  async deleteUsuario(id: number): Promise<void> {
    return await this.usuarioRepository.deleteUsuario(id);
  }

  async deleteUsuarioTipoUsuario(id: number): Promise<void> {
    return await this.usuarioRepository.deleteUsuarioTipoUsuario(id);
  }
  
  async updateUsuario(id: number, data: Partial<Usuario>): Promise<boolean> {
    if(data.senha) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.senha, saltRounds);
      data.senha = hashedPassword;
    }
    return this.usuarioRepository.updateUsuario(id, data);
  }

  async updateUsuarioByAdmin(id: number, data: Partial<Usuario>): Promise<boolean> {
    return this.usuarioRepository.updateUsuario(id, data);
  }

  async updatePassword(id: number, senha: string): Promise<void> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    await this.usuarioRepository.updateUsuario(id, { senha: hashedPassword });
  }

  async updateTipoUsuario(id_usuario: number, id_tipo_usuario: number): Promise<void> {
    await this.usuarioRepository.updateTipoUsuario(id_usuario, id_tipo_usuario);
  }

  async generateCodeValidEmail(email: string): Promise<{ user: Usuario; code: string; }> {
    const code = generateValidationCode();
    const user = await this.usuarioRepository.getByEmail(email);
    await this.usuarioRepository.insertValidationCode(email, code);
    return {user ,code};
  }

  async verifiedEmail(id: number): Promise<void> {
    await this.usuarioRepository.verifiedEmail(id);
  }

  async userToAutor(id: number, validatedUserAutorData: UserToAutor): Promise<void> {
    await this.usuarioRepository.userToAutor(id, validatedUserAutorData);
  }
}
