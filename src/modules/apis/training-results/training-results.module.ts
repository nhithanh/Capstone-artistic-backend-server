import { Module } from '@nestjs/common';
import { TrainingResultsService } from './training-results.service';
import { TrainingResultsController } from './training-results.controller';

@Module({
  controllers: [TrainingResultsController],
  providers: [TrainingResultsService]
})
export class TrainingResultsModule {}
