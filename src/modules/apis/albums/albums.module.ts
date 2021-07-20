import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { MediasModule } from '../medias/medias.module';
import { S3Module } from 'src/s3/s3.module';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';
import { uploadImageToS3Option } from 'src/config/multer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), MediasModule, S3Module, MulterModule.registerAsync({
    imports: [S3Module],
    useFactory: async (s3Service: S3Service) => uploadImageToS3Option(s3Service.s3),
    inject: [S3Service],
  })],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService]

})
export class AlbumsModule {}
