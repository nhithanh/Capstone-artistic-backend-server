import { Module } from '@nestjs/common';
import { TrainingRequestsService } from './training-requests.service';
import { TrainingRequestsController } from './training-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingRequest } from './entities/training-request.entity';
import { ProducerModule } from 'src/modules/producer/producer.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [ProducerModule, S3Module, TypeOrmModule.forFeature([TrainingRequest])],
  controllers: [TrainingRequestsController],
  providers: [TrainingRequestsService]
})
export class TrainingRequestsModule {}
