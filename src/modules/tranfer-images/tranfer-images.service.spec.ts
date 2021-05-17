import { Test, TestingModule } from '@nestjs/testing';
import { TranferImagesService } from './tranfer-images.service';

describe('TranferImagesService', () => {
  let service: TranferImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranferImagesService],
    }).compile();

    service = module.get<TranferImagesService>(TranferImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
