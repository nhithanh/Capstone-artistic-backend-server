import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { ProducerModule } from 'src/modules/producer/producer.module';
import { SocketModule } from 'src/gateway/socket.module';
import { MulterModule } from '@nestjs/platform-express';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';
import { uploadImageToS3Option } from 'src/config/multer.service';
import { User } from '../users/entities/user.entity';
import { NotificationsModule } from '../notifications/notifications.module'
import { StylesModule } from '../styles/styles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Media, User]), ProducerModule, NotificationsModule, StylesModule, S3Module, SocketModule, MulterModule.registerAsync({
    imports: [S3Module],
    useFactory: async (s3Service: S3Service) => uploadImageToS3Option(s3Service.s3),
    inject: [S3Service],
  })],
  controllers: [MediasController],
  providers: [MediasService],
  exports: [MediasService]
})
export class MediasModule {}
