import { Module } from '@nestjs/common';
import { SnapshotsService } from './snapshot.service';
import { SnapshotsController } from './snapshot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snapshot } from './entities/snapshot.entity';
import { MulterModule } from '@nestjs/platform-express';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';
import { uploadSnapshotOption } from 'src/config/multer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Snapshot]), MulterModule.registerAsync({
    imports: [S3Module],
    useFactory: async (s3Service: S3Service) => uploadSnapshotOption(s3Service.s3),
    inject: [S3Service],
  })],
  controllers: [SnapshotsController],
  providers: [SnapshotsService],
  exports: [SnapshotsService]
})
export class SnapshotsModule {}
