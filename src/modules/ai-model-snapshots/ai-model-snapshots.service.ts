import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAiModelSnapshotDto } from './dto/create-ai-model-snapshot.dto';
import { UpdateAiModelSnapshotDto } from './dto/update-ai-model-snapshot.dto';
import { AiModelSnapshot } from './entities/ai-model-snapshot.entity';

@Injectable()
export class AiModelSnapshotsService {

  @InjectRepository(AiModelSnapshot)
  private readonly aiModelSnapshotRepository: Repository<AiModelSnapshot>


  create(createAiModelSnapshotDto: CreateAiModelSnapshotDto) {
    return this.aiModelSnapshotRepository.create(createAiModelSnapshotDto);
  }

  findAll(): Promise<AiModelSnapshot[]> {
    return this.aiModelSnapshotRepository.find()
  }

  findOne(id: number): Promise<AiModelSnapshot> {
    return this.aiModelSnapshotRepository.findOne(id)
  }

  update(id: number, updateAiModelSnapshotDto: UpdateAiModelSnapshotDto) {
    return `This action updates a #${id} aiModelSnapshot`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiModelSnapshot`;
  }
}
