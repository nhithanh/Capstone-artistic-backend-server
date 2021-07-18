import { Module } from '@nestjs/common';
import { TrainingRequestsService } from './training-requests.service';
import { TrainingRequestsController } from './training-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingRequest } from './entities/training-request.entity';
import { ProducerModule } from 'src/modules/producer/producer.module';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';
import { uploadImageToS3OptionAdmin } from 'src/config/multer.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ProducerModule, S3Module, TypeOrmModule.forFeature([TrainingRequest]), MulterModule.registerAsync({
    imports: [S3Module],
    useFactory: async (s3Service: S3Service) => uploadImageToS3OptionAdmin(s3Service.s3),
    inject: [S3Service],
  })],
  controllers: [TrainingRequestsController],
  providers: [TrainingRequestsService]
})
export class TrainingRequestsModule {}
