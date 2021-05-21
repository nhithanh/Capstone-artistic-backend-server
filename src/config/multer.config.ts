import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import  * as multerS3 from 'multer-s3'
import {S3} from 'aws-sdk'

const s3 = new S3({
    credentials: {
        accessKeyId: 'AKIAYB7AFYKUMNDEZT4L',
        secretAccessKey: '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'
    }
})

export const uploadImageToS3Option = {
    fileFilter: (req: any, file: any, cb: any) => {
        console.log("file:", file)
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(null, true);
        } else {
            console.log("extName:", extname(file.originalname))
            cb(new HttpException({
                status: 400,
                message: `Unsupported file type ${extname(file.originalname)}`
            }, HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: multerS3({
        s3: s3,
        bucket: 'artisan-photos',
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        },
        contentType: multerS3.AUTO_CONTENT_TYPE
    })
};