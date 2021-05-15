import { Module } from '@nestjs/common';
import { AiModelSnapshotsService } from './ai-model-snapshots.service';
import { AiModelSnapshotsController } from './ai-model-snapshots.controller';

@Module({
  controllers: [AiModelSnapshotsController],
  providers: [AiModelSnapshotsService]
})
export class AiModelSnapshotsModule {}
