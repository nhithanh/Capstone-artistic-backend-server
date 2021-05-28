import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { Model } from './entities/model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Style } from '../styles/entities/style.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model, Style])],
  controllers: [ModelsController],
  providers: [ModelsService],
  exports: [ModelsService]
})
export class ModelsModule {}
