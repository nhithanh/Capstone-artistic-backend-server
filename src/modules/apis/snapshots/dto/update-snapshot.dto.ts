import { PartialType } from '@nestjs/swagger';
import { CreateSnapshotDTO } from './create-snapshot.dto';

export class UpdateSnapshotDTO extends PartialType(CreateSnapshotDTO) {}
