import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { S3Module } from 'src/s3/s3.module';
import { MediasModule } from '../medias/medias.module';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';
import { uploadVideoOption } from 'src/config/multer.service';
import { ProducerModule } from 'src/modules/producer/producer.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { SocketModule } from 'src/gateway/socket.module';

@Module({
  imports: [S3Module, MediasModule, ProducerModule, NotificationsModule, SocketModule, MulterModule.registerAsync({
    imports: [S3Module],
    useFactory: async (s3Service: S3Service) => uploadVideoOption(s3Service.s3),
    inject: [S3Service],
  })],
  controllers: [VideosController]
})
export class VideosModule {}
