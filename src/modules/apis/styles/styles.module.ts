import { Module } from '@nestjs/common';
import { StylesService } from './styles.service';
import { StylesController } from './styles.controller';
import { Style } from './entities/style.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelsModule } from '../models/models.module';

@Module({
  imports: [TypeOrmModule.forFeature([Style]), ModelsModule],
  controllers: [StylesController],
  providers: [StylesService]
})
export class StylesModule {}
