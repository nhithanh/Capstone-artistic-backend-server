import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export const multerOptions = {
    limits: { fieldSize: 25 * 1024 * 1024 },
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
    storage: diskStorage({
        destination: './upload',
        filename: (req: any, file: any, cb: any) => {
            cb(null, `${uuid()}${extname(file.originalname)}`);
        },
    }),
};