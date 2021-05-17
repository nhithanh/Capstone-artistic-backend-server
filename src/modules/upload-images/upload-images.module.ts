import { Module } from '@nestjs/common';
import { UploadImagesService } from './upload-images.service';
import { UploadImagesController } from './upload-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadImage } from './entities/upload-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadImage])],
  controllers: [UploadImagesController],
  providers: [UploadImagesService]
})
export class UploadImagesModule {}
