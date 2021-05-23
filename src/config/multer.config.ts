import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import  * as multerS3 from 'multer-s3'
import {S3} from 'aws-sdk'

const s3 = new S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_PRIVATE_KEY_ID
    }
})

export const getPhotoSignedURL = async (locationURL) => {
    const key = locationURL.substring(locationURL.lastIndexOf('/') + 1)
    const params = {
        Bucket: 'artisan-photos',
        Key: key,
        Expires: 60000
    }
    try { 
        await s3.headObject(params).promise();
        const signedUrl = s3.getSignedUrl('getObject', params);
        return signedUrl
    } catch (headErr) {
        if (headErr.code === 'NotFound') {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: `location ${locationURL} does not exist!`
            }, HttpStatus.NOT_FOUND)
        }
    }
}

export const uploadImageToS3Option = {
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
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        },
        contentType: multerS3.AUTO_CONTENT_TYPE
    })
};