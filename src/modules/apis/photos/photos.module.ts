import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { ProducerModule } from 'src/modules/producer/producer.module';
import { SocketModule } from 'src/gateway/socket.module';
import { MulterModule } from '@nestjs/platform-express';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';
import { uploadImageToS3Option } from 'src/config/multer.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, User]), ProducerModule, S3Module, SocketModule, MulterModule.registerAsync({
    imports: [S3Module],
    useFactory: async (s3Service: S3Service) => uploadImageToS3Option(s3Service.s3),
    inject: [S3Service],
  })],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
