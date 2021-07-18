"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);
const AmazonS3URI = require('amazon-s3-uri');
let S3Service = class S3Service {
    constructor() {
        this.bucketName = process.env.S3_BUCKET_NAME;
        this.temporaryBucketName = process.env.S3_TEMPORARY_BUCKET_NAME;
        this.mainCDN = process.env.S3_ARTISAN_CDN;
        this.temporaryCDN = process.env.S3_ARTISAN_TEMPORARY_CDN;
        const env = process.env.ENV || 'dev';
        if (env == 'production') {
            this.s3 = new aws_sdk_1.S3();
        }
        else {
            this.s3 = new aws_sdk_1.S3({
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_PRIVATE_KEY_ID
                }
            });
        }
    }
    getS3SignedURL(locationURL) {
        const { bucket, key } = AmazonS3URI(locationURL);
        const params = {
            Bucket: bucket,
            Key: key
        };
        return this.s3.getSignedUrl('getObject', Object.assign(Object.assign({}, params), { Expires: 600000 }));
    }
    getCDNURL(locationURL) {
        const { bucket, key } = AmazonS3URI(locationURL);
        if (bucket == this.bucketName) {
            return `${this.mainCDN}/${key}`;
        }
        else if (bucket == this.temporaryBucketName) {
            return `${this.temporaryCDN}/${key}`;
        }
    }
    async uploadFile(filePath, bucketName, key) {
        const fileContent = await readFile(filePath);
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: fileContent
        };
        this.s3.upload(params, function (err, data) {
            if (err) {
                console.log(err);
                throw err;
            }
        });
    }
    ;
    async uploadFolder(dir, s3FolderName) {
        const files = await readDir(dir);
        await Promise.all(files.map(fileName => this.uploadFile(`${dir}/${fileName}`, 'artisan-photos', `${s3FolderName}/${fileName}`)));
    }
    async copyPhotoToPermanentBucket(temporaryLocationURL, key) {
        const rs = await this.s3.copyObject({
            Bucket: this.bucketName,
            CopySource: temporaryLocationURL,
            Key: key
        }).promise();
        return rs;
    }
};
S3Service = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map