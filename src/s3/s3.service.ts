import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir)
const AmazonS3URI = require('amazon-s3-uri')


@Injectable()
export class S3Service {
    public s3: S3;
    private bucketName: string;
    private mainCDN: string;
    private temporaryBucketName: string;
    private temporaryCDN: string;

    constructor() {

        this.bucketName = process.env.S3_BUCKET_NAME
        this.temporaryBucketName = process.env.S3_TEMPORARY_BUCKET_NAME

        this.mainCDN = process.env.S3_ARTISAN_CDN
        this.temporaryCDN = process.env.S3_ARTISAN_TEMPORARY_CDN

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
        if (bucket == this.bucketName) {
            return `${this.mainCDN}/${key}`
        }
        else if(bucket == this.temporaryBucketName) {
            return `${this.temporaryCDN}/${key}`
        }
    }

    async uploadFile(filePath: string, bucketName: string, key: string) {
        const fileContent = await readFile(filePath)
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: fileContent
        };
        this.s3.upload(params, function(err, data) {
            if (err) {
                console.log(err)
                throw err;
            }
        });
    };

    async uploadFolder(dir: string, s3FolderName: string) {
        const files = await readDir(dir)
        await Promise.all(files.map(fileName => this.uploadFile(`${dir}/${fileName}`, 'artisan-photos', `${s3FolderName}/${fileName}`)))
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
