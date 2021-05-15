import { Module } from '@nestjs/common';
import { AiModelSnapshotsService } from './ai-model-snapshots.service';
import { AiModelSnapshotsController } from './ai-model-snapshots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiModelSnapshot } from './entities/ai-model-snapshot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiModelSnapshot])],
  controllers: [AiModelSnapshotsController],
  providers: [AiModelSnapshotsService]
})
export class AiModelSnapshotsModule {}
