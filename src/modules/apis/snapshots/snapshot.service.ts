import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash'
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

  async findAll(queryParams: any): Promise<any> {
    const page = queryParams['page'] || 0
    const offset = queryParams['offset'] || 5
    const skip = page * offset

    const where = _.omit(queryParams, ['page', 'offset'])

    const [snapshots, count] =  await this.snapshotRepository.findAndCount({
      where: where,
      skip,
      take: offset,
      order: {createdAt:"DESC"}
    })

    return {
      page,
      totalPage: Math.ceil(count / offset),
      data: snapshots
    }
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
