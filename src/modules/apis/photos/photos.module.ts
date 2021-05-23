import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { ProducerModule } from 'src/modules/producer/producer.module';
import { SocketModule } from 'src/gateway/socket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), ProducerModule, SocketModule],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
