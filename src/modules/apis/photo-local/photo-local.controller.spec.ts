import { Test, TestingModule } from '@nestjs/testing';
import { PhotoLocalController } from './photo-local.controller';
import { PhotoLocalService } from './photo-local.service';

describe('PhotoLocalController', () => {
  let controller: PhotoLocalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoLocalController],
      providers: [PhotoLocalService],
    }).compile();

    controller = module.get<PhotoLocalController>(PhotoLocalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
