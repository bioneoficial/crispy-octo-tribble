import * as aws from 'aws-sdk';

export default class StorageRepository {
    service: aws.S3;
    bucket: string;

    constructor(){
        this.service = new aws.S3();
        this.bucket = process.env.BUCKET_NAME || ''
    }

    async deleteObject(key: string){
        var params = { Bucket: this.bucket, Key: key };

        this.service.deleteObject(params, (err, data) => {
            if (err) console.log(err, err.stack);  
            else console.log();                 
        });
    }
}