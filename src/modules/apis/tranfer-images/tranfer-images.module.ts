import { Module } from '@nestjs/common';
import { TranferImagesService } from './tranfer-images.service';
import { TranferImagesController } from './tranfer-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranferImage } from './entities/tranfer-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TranferImage])],
  controllers: [TranferImagesController],
  providers: [TranferImagesService]
})
export class TranferImagesModule {}
