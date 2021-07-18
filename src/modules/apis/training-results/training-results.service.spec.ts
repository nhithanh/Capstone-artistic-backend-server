import { Test, TestingModule } from '@nestjs/testing';
import { TrainingResultsService } from './training-results.service';

describe('TrainingResultsService', () => {
  let service: TrainingResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingResultsService],
    }).compile();

    service = module.get<TrainingResultsService>(TrainingResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
