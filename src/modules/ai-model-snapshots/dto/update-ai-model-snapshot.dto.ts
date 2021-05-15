import { PartialType } from '@nestjs/swagger';
import { CreateAiModelSnapshotDto } from './create-ai-model-snapshot.dto';

export class UpdateAiModelSnapshotDto extends PartialType(CreateAiModelSnapshotDto) {}
