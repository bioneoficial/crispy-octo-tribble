export class ValidationError extends Error {
    constructor(message: string, options?: ErrorOptions ) {
      super(message, options);
      this.name = "ValidationError";
    }
  }
  
export class DatabaseError extends Error {
    constructor(message: string, options?: ErrorOptions) {
      super(message, options);
      this.name = "DatabaseError";
    }
  }

  export enum TipoUsuario {
    ROOT = 'ROOT',
    ADMIN = 'ADMIN',
    USUARIO = 'USUARIO',
    GRATUITO = 'GRATUITO',
    ASSINANTE = 'ASSINANTE',
  }