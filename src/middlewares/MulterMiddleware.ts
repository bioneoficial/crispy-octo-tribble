import fs from 'fs';

import { S3Client } from '@aws-sdk/client-s3';
import multer, { Field } from 'multer';
import multerS3 from 'multer-s3';

import path from 'path';
import * as crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';


const storageTypes: any = {
    'local': multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadDir = path.join(__dirname, '../uploads');
            !fs.existsSync(uploadDir) ? fs.mkdirSync(uploadDir, { recursive: true })
                :
                fs.mkdirSync(uploadDir, { recursive: true });

            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err, file.filename);

                const fileName = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, fileName);
            });            
        },
        
    }),
    's3': multerS3({
        s3: new S3Client({
            region: process.env.AWS_DEFAULT_REGION || '',
            credentials:{
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            }
        }),
        bucket: process.env.BUCKET_NAME || '',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, fileName);
            });
        },
    }),
};



export default class MulterMiddleware {

    public upload: multer.Multer;

    constructor() {
        const storageType = (process.env.STORAGE_TYPE || 's3')
        const storage = storageTypes[`${storageType}`];

        this.upload = multer({
            storage,
            fileFilter: (req, file, cb) => {
                const filetypes = /jpeg|jpg|png|webp|svg|heic/;
                const mimetype = filetypes.test(file.mimetype);
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (mimetype && extname) {
                    return cb(null, true);
                }
                cb(new Error('Only jpeg, jpg, png, webp, heic, svg file formats are allowed!'));
            }
        });
    }

    public uploadMedia = (fieldName: Field[]) => (req: Request, res: Response, next: NextFunction) => {       
        try {
            this.upload.fields(fieldName);
            return next();     
        } catch (error) {
            return next(error)
        }
    }
}

export const multerMiddleware = new MulterMiddleware();
