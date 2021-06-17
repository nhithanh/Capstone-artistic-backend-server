import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { PhotosModule } from '../photos/photos.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), PhotosModule, S3Module],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService]

})
export class AlbumsModule {}
