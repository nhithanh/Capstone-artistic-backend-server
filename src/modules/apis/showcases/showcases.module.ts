import { Module } from '@nestjs/common';
import { ShowcasesService } from './showcases.service';
import { ShowcasesController } from './showcases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showcase } from './entities/showcase.entity';
import { S3Module } from 'src/s3/s3.module';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';
import { uploadImageToS3Option } from 'src/config/multer.service';
import { Style } from '../styles/entities/style.entity';

@Module({  
  imports: [TypeOrmModule.forFeature([Showcase, Style]), S3Module, MulterModule.registerAsync({
  imports: [S3Module],
  useFactory: async (s3Service: S3Service) => uploadImageToS3Option(s3Service.s3),
  inject: [S3Service],
})],
  controllers: [ShowcasesController],
  providers: [ShowcasesService]
})
export class ShowcasesModule {}
