import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { promisify } from 'util'

const AmazonS3URI = require('amazon-s3-uri')


@Injectable()
export class S3Service {
    public s3: S3;
    private bucketName: string;
    private artisan_cdn: string;
    private artisan_temporary_cdn: string;

    constructor() {
        this.artisan_cdn = process.env.S3_ARTISAN_CDN
        this.artisan_temporary_cdn = process.env.S3_ARTISAN_TEMPORARY_CDN
        this.bucketName = process.env.S3_BUCKET_NAME
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

    getS3SignedURL(locationURL: string): string {
        const {bucket, key} = AmazonS3URI(locationURL)
        const params = {
            Bucket: bucket,
            Key: key
        }
        return this.s3.getSignedUrl('getObject', {...params,Expires: 60000});
    }

    getCDNURL(locationURL: string): string {
        const {bucket, key} = AmazonS3URI(locationURL)
        if (bucket == 'artisan-photos')
            return `${this.artisan_cdn}/${key}`
    }

    async copyPhotoToPermanentBucket(temporaryLocationURL: string, key: string) {
        const rs = await this.s3.copyObject({
            Bucket: this.bucketName,
            CopySource: temporaryLocationURL,
            Key: key
        }).promise()
        return rs
    }
}
