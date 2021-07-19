import { Module } from '@nestjs/common';
import { TrainingResultsService } from './training-results.service';
import { TrainingResultsController } from './training-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingResult } from './entities/training-result.entity';
import { S3Module } from 'src/s3/s3.module';
import { TrainingRequest } from '../training-requests/entities/training-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingResult, TrainingRequest]), S3Module],
  controllers: [TrainingResultsController],
  providers: [TrainingResultsService]
})
export class TrainingResultsModule {}
