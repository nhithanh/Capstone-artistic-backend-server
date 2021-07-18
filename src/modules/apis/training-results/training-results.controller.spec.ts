import { Test, TestingModule } from '@nestjs/testing';
import { TrainingResultsController } from './training-results.controller';
import { TrainingResultsService } from './training-results.service';

describe('TrainingResultsController', () => {
  let controller: TrainingResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingResultsController],
      providers: [TrainingResultsService],
    }).compile();

    controller = module.get<TrainingResultsController>(TrainingResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
