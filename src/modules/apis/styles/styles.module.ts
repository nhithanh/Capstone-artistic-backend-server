import { Module } from '@nestjs/common';
import { StylesService } from './styles.service';
import { StylesController } from './styles.controller';
import { Style } from './entities/style.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Style])],
  controllers: [StylesController],
  providers: [StylesService]
})
export class StylesModule {}
