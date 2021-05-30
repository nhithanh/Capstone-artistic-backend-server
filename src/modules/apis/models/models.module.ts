import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { Model } from './entities/model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Style } from '../styles/entities/style.entity';
import { S3Module } from 'src/s3/s3.module';
import { Snapshot } from '../snapshots/entities/snapshot.entity';
import { ProducerModule } from 'src/modules/producer/producer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Model, Style, Snapshot]), S3Module, ProducerModule],
  controllers: [ModelsController],
  providers: [ModelsService],
  exports: [ModelsService]
})
export class ModelsModule {}
