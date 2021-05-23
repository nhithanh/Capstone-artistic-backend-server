import { Test, TestingModule } from '@nestjs/testing';
import { AiModelSnapshotsService } from './ai-model-snapshots.service';

describe('AiModelSnapshotsService', () => {
  let service: AiModelSnapshotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiModelSnapshotsService],
    }).compile();

    service = module.get<AiModelSnapshotsService>(AiModelSnapshotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
