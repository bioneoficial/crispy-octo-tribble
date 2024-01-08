import { MailConfig, MailContent } from "../interfaces/interfaces"
import { MailSMTPRepository } from "../repositories/email/smtp"

export class MailService {

    sendMail(mailContent:MailContent){

        const mailConfig:MailConfig = {
            serviceName: 'hostgator',
            hostname: String(process.env.EMAIL_SMTP_HOST),
            port: Number(process.env.EMAIL_SMTP_PORT),
            user: String(process.env.EMAIL_ACCOUNT),
            password: String(process.env.EMAIL_PASSWORD),
        }

        const mailRepo = new MailSMTPRepository(mailConfig);
        const mailResonse = mailRepo.sendMail(mailContent);

        return mailResonse
    }
}