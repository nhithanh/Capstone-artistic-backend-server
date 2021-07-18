import { Test, TestingModule } from '@nestjs/testing';
import { TrainingRequestsController } from './training-requests.controller';
import { TrainingRequestsService } from './training-requests.service';

describe('TrainingRequestsController', () => {
  let controller: TrainingRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingRequestsController],
      providers: [TrainingRequestsService],
    }).compile();

    controller = module.get<TrainingRequestsController>(TrainingRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
