import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import  * as multerS3 from 'multer-s3'
import { S3 } from 'aws-sdk';


export const uploadImageToS3Option = (s3: S3) => {
    return {
        fileFilter: (req: any, file: any, cb: any) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                cb(null, true);
            } else {
                cb(new HttpException({
                    status: 400,
                    message: `Unsupported file type ${extname(file.originalname)}`
                }, HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: multerS3({
            s3: s3,
            bucket: 'artisan-photos',
            key: function (req: any, file, cb) {
                let destination = `users/${req.user.id}/${new Date().toISOString().substring(0, 10)}/${Date.now().toString()}`
                cb(null, destination)
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    }
};

export const uploadImageToS3OptionAdmin = (s3: S3) => {
    return {
        fileFilter: (req: any, file: any, cb: any) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                cb(null, true);
            } else {
                cb(new HttpException({
                    status: 400,
                    message: `Unsupported file type ${extname(file.originalname)}`
                }, HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: multerS3({
            s3: s3,
            bucket: 'artisan-photos',
            key: function (req: any, file, cb) {
                let destination = `assets/${new Date().toISOString().substring(0, 10)}/${Date.now().toString()}`
                cb(null, destination)
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    }
};

export const uploadSnapshotOption = (s3: S3) => {
    return {
        fileFilter: (req: any, file: any, cb: any) => {
            if (file.originalname.includes('.pth')) {
                cb(null, true);
            } else {
                cb(new HttpException({
                    status: 400,
                    message: `Unsupported file type ${extname(file.originalname)}`
                }, HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: multerS3({
            s3: s3,
            bucket: 'artisan-photos',
            key: function (req: any, file, cb) {
                let destination = `snapshots/${new Date().toISOString().substring(0, 10)}/${Date.now().toString()}`
                cb(null, destination)
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    }
};

export const uploadVideoOption = (s3: S3) => {
    return {
        fileFilter: (req: any, file: any, cb: any) => {
            if (file.mimetype.match(/\/(mp4)$/)) {
                cb(null, true);
            } else {
                cb(new HttpException({
                    status: 400,
                    message: `Unsupported video file type ${extname(file.originalname)} ${JSON.stringify(file)}`
                }, HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: multerS3({
            s3: s3,
            bucket: 'artisan-photos',
            key: function (req: any, file, cb) {
                const userId = req.body['userId'] ? req.body['userId'] : req.user.id
                const folderName = `users/${userId}/${new Date().toISOString().substring(0, 10)}/${Date.now().toString()}`
                req.folderName = folderName
                const destination = `${folderName}/original.mp4`
                cb(null, destination)
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    }
};