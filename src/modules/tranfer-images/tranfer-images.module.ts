import { Module } from '@nestjs/common';
import { TranferImagesService } from './tranfer-images.service';
import { TranferImagesController } from './tranfer-images.controller';

@Module({
  controllers: [TranferImagesController],
  providers: [TranferImagesService]
})
export class TranferImagesModule {}
