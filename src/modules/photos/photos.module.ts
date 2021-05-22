import { Module } from '@nestjs/common';
import { UploadImagesService } from './photos.service';
import { UploadImagesController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [UploadImagesController],
  providers: [UploadImagesService]
})
export class PhotosModule {}
