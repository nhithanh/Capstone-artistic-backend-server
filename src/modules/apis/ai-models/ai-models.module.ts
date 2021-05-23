import { Module } from '@nestjs/common';
import { AiModelsService } from './ai-models.service';
import { AiModelsController } from './ai-models.controller';
import { AiModel } from './entities/ai-model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AiModel])],
  controllers: [AiModelsController],
  providers: [AiModelsService]
})
export class AiModelsModule {}
