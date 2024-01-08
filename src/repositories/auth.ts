import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
import { OkPacket, RowDataPacket } from 'mysql2';
import { Request } from 'express';
import { Usuario, AuthInput, AuthResponse, UsuarioAuth, AuthSessionToken, TokenValidation, AuthResetPassResponse, AuthResetPassToken } from '../interfaces/interfaces';
import { executeQuery } from '../config/database';
import { ValidationError } from '../commons/utils';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const TOKEN_KEY = String(process.env.TOKEN_KEY)

export const roles = {
  ROOT: 'ROOT',
  ADMIN: 'ADMIN',
  USUARIO: 'USUARIO',
  ASSINANTE: 'ASSINANTE',
  AUTOR: 'AUTOR'
}

export const getAllRoles: string[] = Object.values(roles)

export class AuthRepository {

  async checkUser(payload: AuthInput): Promise<AuthResponse> {
    const dataBase = process.env.DB_DATABASE

    const sql = `
      SELECT 
        u.id,
        u.nome,
        u.fotoPath,
        u.ativo,   
        u.email, 
        u.descricao,
        u.senha,
        u.data_validade_assinatura,
        u.data_inclusao,
        tu.nome as role
      FROM 
        ${dataBase}.Usuario u,
        ${dataBase}.Tipo_Usuario tu,
        ${dataBase}.Usuario__Tipo_Usuario utu
      WHERE 
        u.email = ?
        AND utu.id_usuario = u.id
        AND tu.id = utu.id_tipo_usuario
    `;

    const values = [payload.email];
    const result = await executeQuery(sql, values);

    if (result instanceof Array && result.length === 0) {
      throw new Error('Usuário não encontrado');
    }

    const user = (result as RowDataPacket[])[0] as Usuario;

    if (user && (await bcrypt.compare(payload.password, user.senha))) {
      const token = jwt.sign(
        { user_id: user.id, email: user.email, role: user.role }, TOKEN_KEY, { expiresIn: "1y", }
      );

      const loggedUser = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
        descricao: user.descricao,
        fotoPath: user.fotoPath,
        ativo: user.ativo,
        data_validade_assinatura: user.data_validade_assinatura
      } as UsuarioAuth

      return {
        "success": true,
        "token": token,
        "user": loggedUser
      }
    }else{
      return {
        "success": false,
        "token": "",
        "message": "Senha inválida",      
      };
    }

    
  }

  async createLoginToken(payload: AuthResponse): Promise<AuthResponse> {
  
      const sql = `
      INSERT INTO ${process.env.DB_DATABASE}.Autenticacao
      (usuario, token, tipo_token, codigo, data_expiracao)
      VALUES (?, ?, ?, ?, ?)
    `;
const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
const oneYear = new Date(Date.now() + oneYearInMs);

const formatedDate = oneYear.toISOString().slice(0, 19).replace('T', ' ');

      const values = [payload?.user?.email , payload?.token, 1, payload?.token, formatedDate];
      const result = await executeQuery(sql, values);
  
      if (result instanceof Array && result.length === 0) {
        throw new Error('Usuário não encontrado');
      }
  
      return {
        "success": true,
        "token": payload.token,
        "user": payload.user
      }
      
  }

  async createResetToken(payload: AuthSessionToken): Promise<AuthSessionToken> {    
    
    const sql = `
      INSERT INTO ${process.env.DB_DATABASE}.Autenticacao
      (usuario, token, tipo_token, codigo, data_expiracao)
      VALUES (?, ?, ?, ?, ?)
    `;
   
    const token_jwt = jwt.sign(
      { user_id: payload.id, usuario: payload.usuario }, payload.codigo, { expiresIn: "15m", }
    );

    const values = [payload.usuario, token_jwt, 2, payload.codigo, payload.data_expiracao];
    const result = await executeQuery(sql, values) as OkPacket;    

    return { ...payload, id: result.insertId, token: token_jwt };
    
  }

  async validateResetToken(payload: TokenValidation): Promise<AuthResetPassResponse> {    
    let tokenDecoded: AuthResetPassToken = {usuario:''};

    if(!payload.token){
      throw new ValidationError('Missing Authentication Token')
    }
    
    try {
      const tokenString = payload.token;
      if(tokenString){
        tokenDecoded = jwt.verify(tokenString, String(payload.code)) as AuthResetPassToken;
        
        return {
          success: true,
          message: "ok",
          token: tokenDecoded
        };
      }

    } catch (err) {
        this.increaseTriesAuthToken(payload.token)
        const errorResponse = err as JsonWebTokenError
        return {
          success: false,
          message: errorResponse.message
        };
    } 

    return {
      success: false,
      message: 'err'
    };
  }

  async decodeResetToken(token: string): Promise<AuthResetPassResponse> {    
    let tokenDecoded: AuthResetPassToken = {usuario:''};
    
    try {      
      if(token){
        tokenDecoded = jwt.decode(token) as AuthResetPassToken;        
        return {
          success: true,
          token: tokenDecoded,
          message: 'Token decoded'
        };
      }

    } catch (err) {
        const errorResponse = err as JsonWebTokenError
        return {
          success: false,
          message: errorResponse.message
        };
    } 

    return {
      success: false,
      message: 'err'
    };
  }

  async getAuthToken(token:string): Promise<AuthSessionToken>{
    const sql = `
      SELECT * FROM ${process.env.DB_DATABASE}.Autenticacao WHERE token = '${token}'
    `
    const queryResult = await executeQuery(sql);               
    return (queryResult as RowDataPacket[0])[0] as AuthSessionToken;
  }

  async increaseTriesAuthToken(token:string): Promise<boolean>{
    try {
        const sql = `
        UPDATE ${process.env.DB_DATABASE}.Autenticacao
        SET tentativas = tentativas + 1
        WHERE token = '${token}'
      `

      await executeQuery(sql);      

      return true;

    } catch (error) {
      return false;
    }
  }

  async setValidatedAuthToken(token:string): Promise<boolean>{
    try {
        const sql = `
        UPDATE ${process.env.DB_DATABASE}.Autenticacao
        SET codigo_validado = 1
        WHERE token = '${token}'
      `

      await executeQuery(sql);               
      return true;

    } catch (error) {
      return false;
    }
  }

  async deleteAuthToken(token:string): Promise<boolean>{
    try {
        const sql = `
        DELETE FROM ${process.env.DB_DATABASE}.Autenticacao
        WHERE token = '${token}'
      `
      await executeQuery(sql);               
      return true;

    } catch (error) {
      return false;
    }
  }

  async isOwner(req: Request, tblName: string): Promise<boolean>{

    if(authMiddleware.authAdminByToken(req)){
      return true
    }

    const id_object = Number(req.params.id);    
   
    const sql = `
        SELECT id_usuario          
        FROM ${process.env.DB_DATABASE}.${tblName} 
        WHERE id=?
    `;

    const values = [id_object];
  
    const result = await executeQuery(sql, values);
    const conteudo = (result as RowDataPacket[])[0]

    if(!conteudo){
      throw Error(`Registro não encontrado em ${tblName}`)
    }

    return conteudo.id_usuario == req.body.id_usuario_operacao;
  }

  async verifyEmailCode(code: string): Promise<boolean> {
    const sql = `
      SELECT * FROM ${process.env.DB_DATABASE}.Autenticacao WHERE codigo = '${code}' AND codigo_validado = 0 AND tipo_token = 3`
      const values = [code];
      const result = await executeQuery(sql, values);
      const conteudo = (result as RowDataPacket[])[0] as AuthSessionToken;
      if(!conteudo){
        throw Error(`Registro não coincide.`)
      }
      const sql2 = `
      UPDATE ${process.env.DB_DATABASE}.Autenticacao
      SET  codigo_validado= 1, data_atualizacao =  ?
      WHERE id= ?;`

      const updatedDate = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
      const values2= [updatedDate, conteudo.id];

      const result2 = await executeQuery(sql2, values2) as OkPacket;
      return result2.changedRows > 0;
  }
}