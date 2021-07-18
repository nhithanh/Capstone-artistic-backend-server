import { Module } from '@nestjs/common';
import { TrainingRequestsService } from './training-requests.service';
import { TrainingRequestsController } from './training-requests.controller';

@Module({
  controllers: [TrainingRequestsController],
  providers: [TrainingRequestsService]
})
export class TrainingRequestsModule {}
