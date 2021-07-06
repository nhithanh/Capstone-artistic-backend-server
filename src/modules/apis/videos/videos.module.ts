import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { S3Module } from 'src/s3/s3.module';
import { MediasModule } from '../medias/medias.module';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Module({
  imports: [S3Module, MediasModule, MulterModule.register({
    storage: diskStorage({
      destination: './upload-video',
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}${extname(file.originalname)}`)
      }
    }), 
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(/\/(mp4)$/)) {
          cb(null, true);
      } else {
          cb(new HttpException({
              status: 400,
              message: `Unsupported file type ${extname(file.originalname)}`
          }, HttpStatus.BAD_REQUEST), false);
      }
  },
  })],
  controllers: [VideosController]
})
export class VideosModule {}
