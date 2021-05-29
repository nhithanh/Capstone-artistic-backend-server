import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

const AmazonS3URI = require('amazon-s3-uri')


@Injectable()
export class S3Service {
    public s3: S3

    constructor() {
        const env = process.env.ENV || 'dev'
        if(env == 'production') {
            this.s3 = new S3()
        } else {
            this.s3 = new S3({
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_PRIVATE_KEY_ID
                }
            })
        }
    }

    public async getPhotoSignedURL(locationURL: string): Promise<string> {
        const {bucket, key} = AmazonS3URI(locationURL)

        const params = {
            Bucket: bucket,
            Key: key
        }
        try { 
            await this.s3.headObject(params).promise();
            return this.s3.getSignedUrl('getObject', {...params,Expires: 60000});
        } catch (headErr) {
            if (headErr.code === 'NotFound') {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: `location ${locationURL} does not exist!`
                }, HttpStatus.NOT_FOUND)
            }
        }
    }
}
