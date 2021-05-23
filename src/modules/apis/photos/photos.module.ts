import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { UploadImagesController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { ProducerModule } from 'src/modules/producer/producer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), ProducerModule],
  controllers: [UploadImagesController],
  providers: [PhotosService]
})
export class PhotosModule {}
