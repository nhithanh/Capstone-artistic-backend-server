import { Module } from '@nestjs/common';
import { SnapshotsService } from './snapshot.service';
import { SnapshotsController } from './snapshot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snapshot } from './entities/snapshot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Snapshot])],
  controllers: [SnapshotsController],
  providers: [SnapshotsService]
})
export class AiModelSnapshotsModule {}
