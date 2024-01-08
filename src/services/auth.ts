import { AuthInput, AuthResetPassResponse, AuthResponse, AuthSessionToken, TokenValidation } from "../interfaces/interfaces";
import { AuthRepository } from "../repositories/auth";
import { Request } from 'express';

export class AuthService {
  private repository = new AuthRepository();

  async createLoginToken(auth: AuthResponse): Promise<AuthResponse> {
    return this.repository.createLoginToken(auth)
  }

  async authenticate(auth: AuthInput): Promise<AuthResponse> {
    return this.repository.checkUser(auth)
  }

  async createRecoveryToken(token: AuthSessionToken): Promise<AuthSessionToken>{
    return this.repository.createResetToken(token)
  }

  async validadeRecoveryToken(payload: TokenValidation): Promise<AuthResetPassResponse>{
    return this.repository.validateResetToken(payload)
  }

  async decodeResetToken(payload: string): Promise<AuthResetPassResponse>{
    return this.repository.decodeResetToken(payload)
  }

  async getValidationCode(payload: string): Promise<AuthSessionToken>{
    return this.repository.getAuthToken(payload)
  }

  async deleteValidationCode(payload: string): Promise<boolean>{
    return this.repository.deleteAuthToken(payload)
  }

  async increaseTriesValidationCode(payload: string): Promise<boolean>{
    return this.repository.increaseTriesAuthToken(payload)
  }

  async setValidatedAuthToken(payload: string): Promise<boolean>{
    return this.repository.setValidatedAuthToken(payload)
  }

  async isOwner(req: Request, tblName: string): Promise<boolean> {
    return this.repository.isOwner(req, tblName);
  }

  async verifyEmailCode(code: string): Promise<boolean>{
    return this.repository.verifyEmailCode(code)
  }
}
