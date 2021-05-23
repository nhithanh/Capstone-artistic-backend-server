import { Test, TestingModule } from '@nestjs/testing';
import { AiModelSnapshotsController } from './ai-model-snapshots.controller';
import { AiModelSnapshotsService } from './ai-model-snapshots.service';

describe('AiModelSnapshotsController', () => {
  let controller: AiModelSnapshotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiModelSnapshotsController],
      providers: [AiModelSnapshotsService],
    }).compile();

    controller = module.get<AiModelSnapshotsController>(AiModelSnapshotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
