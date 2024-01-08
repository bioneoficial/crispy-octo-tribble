import { AuthToken } from '../interfaces/interfaces';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as z from '../validators/usuario';
import { roles } from '../repositories/auth';

const TOKEN_KEY = String(process.env.TOKEN_KEY)

class AuthMiddleware {

    isAdmin = (role: string):boolean => {
        return role == roles.ADMIN
    }

    decodeToken = (token: string):AuthToken => {
        try {
            const tokenString = token.split(" ")[1]
            const tokenDecoded = jwt.verify(tokenString, TOKEN_KEY) as AuthToken;
            
            return tokenDecoded;
    
        } catch (err) {
            throw Error('Token inválido', { cause: err });
        }
    }

    auth = (roles: Array<string>) => (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"] as string;    

        if (!token) {
            return res.status(403).send("Token de autenticação não informado");
        }else{
            try {
                
                const tokenDecoded = this.decodeToken(token);
                
                if (roles.length && !roles.includes(tokenDecoded.role)) {
                    return res.status(403).json({ message: 'Usuário não autorizado para esta operação' });
                }

                req.body.id_usuario_operacao =  tokenDecoded.user_id;
        
            } catch (err) {
                return res.status(401).send("Token inválido");
            }
        }        
        return next();
    };
    
    authAdminByToken = (req: Request):boolean => {
        const token = req.headers["authorization"] as string;    
        const tokenDecoded = this.decodeToken(token);    
        
        if(!this.isAdmin(tokenDecoded.role) ){
            return false;
        }
        
        return true;
    };
}

export const authMiddleware = new AuthMiddleware();