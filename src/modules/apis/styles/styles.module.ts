import { Module } from '@nestjs/common';
import { StylesService } from './styles.service';
import { StylesController } from './styles.controller';
import { Style } from './entities/style.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { S3Module } from 'src/s3/s3.module';
import { uploadImageToS3OptionAdmin } from 'src/config/multer.service';
import { S3Service } from 'src/s3/s3.service';
import { Snapshot } from '../snapshots/entities/snapshot.entity';
import { SnapshotsModule } from '../snapshots/snapshot.module';

@Module({
  imports: [SnapshotsModule, TypeOrmModule.forFeature([Style, Snapshot]), S3Module, MulterModule.registerAsync({
    imports: [S3Module],
    useFactory: async (s3Service: S3Service) => uploadImageToS3OptionAdmin(s3Service.s3),
    inject: [S3Service],
  })],
  controllers: [StylesController],
  providers: [StylesService]
})
export class StylesModule {}
