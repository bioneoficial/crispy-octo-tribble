import * as z from '../validators/usuario';
import { NextFunction, Request, Response } from 'express';
import { UsuarioService } from '../services/usuario';
import { MailService } from '../services/mail';
import { AuthService } from '../services/auth';
import { UsuarioRepository } from '../repositories/usuario';
import { DatabaseError, TipoUsuario } from '../commons/utils';
import { AuthResetPassResponse, AuthSessionToken, MailContent, TokenValidation, userTipoUsuarioData } from '../interfaces/interfaces';
import { generateValidationCode } from '../helpers/tokens';
import { setCache } from '../services/cache/redis';

const usuarioService = new UsuarioService(new UsuarioRepository());
const RECOVERY_TOKEN_EXP_TIME = 15;
const MAX_TENTATIVAS_RESET_SENHA = 5

export const createUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedUser = z.validateUser(req.body);
    const createdUser = await usuarioService.create(validatedUser);

    if (createdUser.id) {
      try {
        const id_tipo_usuario = await usuarioService.getIdTipoUsuario(TipoUsuario.USUARIO);
        const userTipoUsuarioData: userTipoUsuarioData = {
          id_usuario: createdUser.id,
          id_tipo_usuario,  
        };
        await usuarioService.createUsuarioTipoUsuario(userTipoUsuarioData);
      } catch (error) {
        await usuarioService.deleteUsuario(createdUser.id);
        next(error);
      }
    }
    res.status(201).json(createdUser);
  } catch (e) {
    const error = e as Error
    next(error);
  }
}

export const updateFoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.body.id);
    const user = await usuarioService.getById(id);
    if (!user)  throw new DatabaseError('Could not find user');
    let uploadedFileLocation:  any;
    if (Array.isArray(req.files) && user.id) {
      uploadedFileLocation = req.files[0];
      if (uploadedFileLocation ) await usuarioService.updateFoto({ fotoPath: uploadedFileLocation.location, id: user.id });
  }
    res.status(200).json({
      success: true,
      message: 'Photo upload sucessfully',
      fotoPath: uploadedFileLocation.location,
    });
  } catch (error) {
    next(error);
  }
}

export const getAllUsuarios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuarios = await usuarioService.getAll(req);

    await setCache(usuarios, req, res);

    res.status(201).json(usuarios);
  } catch (error) {
    next(error);
  }
}

export const getUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const usuario = await usuarioService.getById(id);

    if (!usuario) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
}

export const updateUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const data = z.validateUpdateUser(req.body);

    const hasChanged = await usuarioService.updateUsuario(id, data);

    res.status(200).json({
      success: true,
      message: hasChanged ? 'User updated successfully' : 'No changes were made',
    });
  } catch (error) {
    next(error);
  }
}

export const updateUsuarioByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const validatedData = z.validateUserByAdminUpdate(req.body);
    const { tipo, ...usuarioData } = validatedData;
    const hasChanged = await usuarioService.updateUsuarioByAdmin(id, usuarioData);
    if (tipo !== undefined) {
      await usuarioService.updateTipoUsuario(id, tipo);
    }
    res.status(200).json({
      success: true,
      message: hasChanged ? 'User updated successfully' : 'No changes were made',
    });
  } catch (error) {
    next(error);
  }
}

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword } = z.validateUpdatePassword(req.body);

    let token = req.headers["authorization"] as string;
    token = token.split(' ')[1];

    if (!token) {
      return res.status(403).send("Missing Authentication Token");
    }
    
    const authService = new AuthService();
    const authData = await authService.getValidationCode(token)

    if(authData && authData.codigo_validado){
      const validateTokenPayload = {
        code: authData.codigo,
        token: token
      } as TokenValidation

      const tokenValidated = await authService.validadeRecoveryToken(validateTokenPayload) as AuthResetPassResponse
      if(!tokenValidated.success){
        res.status(403).json({
          success: false,
          message: tokenValidated.message,
        });
      }     

      const userEmail = tokenValidated && tokenValidated.token?.usuario ? tokenValidated.token.usuario : null;
      if(userEmail){
        const user = await usuarioService.getByEmail(userEmail);

        if(user && user.id){
          await usuarioService.updatePassword(user.id, newPassword);

          authService.deleteValidationCode(token);

          res.status(200).json({
            success: true,
            message: 'User password updated successfully',
          });

        }else{
          res.status(403).json({
            success: false,
            message: 'User not found',
          });
        }      
      }
    }else if(authData && !authData.codigo_validado){
      res.status(403).json({
        success: false,
        message: 'Code not validated',
      });
    }else{
      res.status(403).json({
        success: false,
        message: 'Token not found',
      });
    }   
    
  } catch (error) {
    next(error);
  }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = z.validateResetPassword(req.body);
    const user = await usuarioService.getByEmail(email);
    
    if (!user) {
      res.status(400).json({
        success: false,
        message: 'User with email informed not found',
      });
      return;
    }

    const validationCode = generateValidationCode();
    const authService = new AuthService();

    const tokenCreationDate = new Date();
    tokenCreationDate.setMinutes(tokenCreationDate.getMinutes() + RECOVERY_TOKEN_EXP_TIME);

    const tokenPayload = {
      usuario: email,
      codigo: validationCode,
      data_expiracao: tokenCreationDate
    } as AuthSessionToken

    const { token: token_jwt } = await authService.createRecoveryToken(tokenPayload);    
    try {

      // Enviar email
      const mailContent:MailContent = {
        fromName: String(process.env.EMAIL_SENDER_NAME),
        from: String(process.env.EMAIL_ACCOUNT),
        toName: user.nome,
        to: email, // email do usuário
        title: 'Recuperação de senha',
        subject: 'Notificação de redefinição de senha',
        template: 'password_recovery',
        context: {
          name: user.nome,
          code: validationCode,
        }
      }

      // Não estou usando await para não travar o response
      // O ideal, é usar alguma estratégia de fila
      // Com retentativa de envio
      const mailService = new MailService()
      mailService.sendMail(mailContent)

      res.status(200).json({
        success: true,
        token: token_jwt,
        email: email,
        message: 'We have sent you an email with a link to reset your password.',        
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
      return;
    }

  } catch (error) {
    next(error);
  }
}

export const resetTokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers["authorization"] as string;
    token = token.split(' ')[1];

    if (!token) {
      return res.status(403).send("Missing Authentication Token");
    }    

    const { code } = z.validateResetTokenValidation(req.body);    
    
    const authService = new AuthService();
    const authData = await authService.getValidationCode(token)

    if(!authData){
      res.status(403).json({success: false, message: 'Token not found or expired'});
    }

    if(authData && authData?.tentativas >= MAX_TENTATIVAS_RESET_SENHA){
      authService.deleteValidationCode(token);
      res.status(403).json({success: false, message: 'Number of attempts reached'});
    }

    const validationPayload = { code: code, token: token} as TokenValidation
    const tokenValidation = await authService.validadeRecoveryToken(validationPayload);
    if(tokenValidation.success && tokenValidation.token){

      if(authData 
        && authData?.usuario == tokenValidation.token.usuario 
        && authData?.codigo == code
      ){
        authService.setValidatedAuthToken(token);
        res.status(200).json({success: true, message: 'Code validated'});
      }

      authService.increaseTriesValidationCode(token);
      res.status(403).json({success: false, message: 'Invalid Code'});

    }else{
      authService.increaseTriesValidationCode(token.split(' ')[1]);
      res.status(200).json({success: false, message: `Token error: ${tokenValidation.message}`}); 
    }    

  } catch (error) {
    next(error);
  }
}

export const GenerateCodeValidEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers["authorization"] as string;
    token = token.split(' ')[1];

    if (!token) {
      return res.status(403).send("Missing Authentication Token");
    }    

    const authService = new AuthService();
    const userData = await authService.getValidationCode(token)
    if (!userData) {
      throw new Error('Invalid token');
    }
    const validationCode = await usuarioService.generateCodeValidEmail(userData.usuario);

    try {
      const mailContent:MailContent = {
        fromName: String(process.env.EMAIL_SENDER_NAME),
        from: String(process.env.EMAIL_ACCOUNT),
        toName: validationCode.user.nome,
        to: userData.usuario,
        title: 'Confirme seu e-mail',
        subject: 'Notificação de confirmação de email',
        template: 'email_confirmation',
        context: {
          name: validationCode.user.nome,
          code: validationCode.code,
        }
      }

      const mailService = new MailService()
      mailService.sendMail(mailContent)


      res.status(200).json({
        success: true,
        code: validationCode,
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
      return;
    }

  } catch (error) {
    next(error);
  }
}

export const VerifyEmailCode = async (req: Request, res: Response, next: NextFunction) => {
try{
  let token = req.headers["authorization"] as string;
  token = token.split(' ')[1];

  if (!token) {
    return res.status(403).send("Missing Authentication Token");
  }    

  const authService = new AuthService();
  const userData = await authService.getValidationCode(token)

  const usuario = await usuarioService.getByEmail(userData?.usuario)
  if (!usuario) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const code = req.params.code;
  const verifyEmail = await authService.verifyEmailCode(code);
  if(verifyEmail){
    await usuarioService.verifiedEmail(usuario.id ?? 0);
  }

  return res.status(200).json({ success: verifyEmail, message: "Requisição realizada com sucesso" });

}catch(error){
  next(error);
}
}

export const UserToAutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedUserAutorData = z.validatedUserAutorData(req.body);

  let token = req.headers["authorization"] as string;
  token = token.split(' ')[1];

  if (!token) {
    return res.status(403).send("Missing Authentication Token");
  }    

  const authService = new AuthService();
  const userData = await authService.getValidationCode(token)

  if (!userData) {
    throw new Error('Invalid token');
  }
    await usuarioService.userToAutor(validatedUserAutorData.id_usuario_operacao, validatedUserAutorData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
}