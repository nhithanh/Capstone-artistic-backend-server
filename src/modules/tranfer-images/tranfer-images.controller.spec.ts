import { Test, TestingModule } from '@nestjs/testing';
import { TranferImagesController } from './tranfer-images.controller';
import { TranferImagesService } from './tranfer-images.service';

describe('TranferImagesController', () => {
  let controller: TranferImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranferImagesController],
      providers: [TranferImagesService],
    }).compile();

    controller = module.get<TranferImagesController>(TranferImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
