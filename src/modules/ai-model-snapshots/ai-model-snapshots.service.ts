import { Injectable } from '@nestjs/common';
import { CreateAiModelSnapshotDto } from './dto/create-ai-model-snapshot.dto';
import { UpdateAiModelSnapshotDto } from './dto/update-ai-model-snapshot.dto';

@Injectable()
export class AiModelSnapshotsService {
  create(createAiModelSnapshotDto: CreateAiModelSnapshotDto) {
    return 'This action adds a new aiModelSnapshot';
  }

  findAll() {
    return `This action returns all aiModelSnapshots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiModelSnapshot`;
  }

  update(id: number, updateAiModelSnapshotDto: UpdateAiModelSnapshotDto) {
    return `This action updates a #${id} aiModelSnapshot`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiModelSnapshot`;
  }
}
