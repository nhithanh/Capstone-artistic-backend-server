import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir)
const AmazonS3URI = require('amazon-s3-uri')


@Injectable()
export class S3Service {
    public s3: S3;
    private BUCKET_NAME: string;
    private CDN_ENDPOINT: string;

    constructor() {
        this.BUCKET_NAME = process.env.S3_BUCKET_NAME
        this.CDN_ENDPOINT = process.env.S3_CDN

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

    getCDNURL(locationURL: string): string {
        const {_, key} = AmazonS3URI(locationURL)
        return `${this.CDN_ENDPOINT}/${key}`
    }

    async uploadFile(filePath: string, key: string) {
        const fileContent = await readFile(filePath)
        const params = {
            Bucket: this.BUCKET_NAME,
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
        await Promise.all(files.map(fileName => this.uploadFile(`${dir}/${fileName}`, `${s3FolderName}/${fileName}`)))
    }
}
