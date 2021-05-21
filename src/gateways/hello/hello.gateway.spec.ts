import { Test, TestingModule } from '@nestjs/testing';
import { HelloGateway } from './hello.gateway';

describe('HelloGateway', () => {
  let gateway: HelloGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloGateway],
    }).compile();

    gateway = module.get<HelloGateway>(HelloGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
