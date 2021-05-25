import { Test, TestingModule } from '@nestjs/testing';
import { PhotoLocalService } from './photo-local.service';

describe('PhotoLocalService', () => {
  let service: PhotoLocalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoLocalService],
    }).compile();

    service = module.get<PhotoLocalService>(PhotoLocalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
