import * as nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars';

import { MailConfig, MailContent } from '../../interfaces/interfaces'
import path from 'path';

const TEMPLATES_DIR = '../../commons/templates/';
const hbsConfig = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: path.join(__dirname, TEMPLATES_DIR),
        layoutsDir: path.join(__dirname, TEMPLATES_DIR),
        defaultLayout: ''
    },
    viewPath: path.join(__dirname, TEMPLATES_DIR),
    extName: '.handlebars'
};

export class MailSMTPRepository {
    mailConfig: MailConfig;

    constructor(mailConfig: MailConfig) {
        this.mailConfig = mailConfig;
    }

    async sendMail(mailContent: MailContent) {
        const transporter = nodemailer.createTransport({
            name: this.mailConfig.user,
            host: this.mailConfig.hostname,
            port: this.mailConfig.port,
            secure: true,
            auth: {
                user: this.mailConfig.user,
                pass: this.mailConfig.password,
            },
        });

        transporter.use('compile', hbs(hbsConfig));

        const email = {
            from: `"${mailContent.fromName}" <${mailContent.from}>`,
            to: mailContent.to,
            subject: mailContent.subject,
            template: mailContent.template,
            context: mailContent.context
        };

        await transporter.sendMail(email).catch(error => {
            throw error;
        });        
    }
}