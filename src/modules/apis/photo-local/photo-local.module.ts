import { Module } from '@nestjs/common';
import { PhotoLocalService } from './photo-local.service';
import { PhotoLocalController } from './photo-local.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './upload',
  })],
  controllers: [PhotoLocalController],
  providers: [PhotoLocalService]
})
export class PhotoLocalModule {}
