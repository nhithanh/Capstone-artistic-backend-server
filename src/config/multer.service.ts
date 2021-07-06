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
                let destination = `${req.user.id}/${Date.now().toString()}`
                cb(null, destination)
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    }
};