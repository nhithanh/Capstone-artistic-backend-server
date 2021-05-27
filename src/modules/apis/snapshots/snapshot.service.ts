import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSnapshotDTO } from './dto/create-snapshot.dto';
import { UpdateSnapshotDTO } from './dto/update-snapshot.dto';
import { Snapshot } from './entities/snapshot.entity';

@Injectable()
export class SnapshotsService {

  @InjectRepository(Snapshot)
  private readonly snapshotRepository: Repository<Snapshot>


  async create(createAiModelSnapshotDto: CreateSnapshotDTO): Promise<Snapshot> {
    return await this.snapshotRepository.save(createAiModelSnapshotDto);
  }

  async findAll(): Promise<Snapshot[]> {
    return await this.snapshotRepository.find()
  }

  async findOne(id: number): Promise<Snapshot> {
    return await this.snapshotRepository.findOne(id)
  }

  update(id: number, updateAiModelSnapshotDto: UpdateSnapshotDTO) {
    return `This action updates a #${id} aiModelSnapshot`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiModelSnapshot`;
  }
}
