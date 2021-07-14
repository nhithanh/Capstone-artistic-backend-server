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


  async create(createSnapshotDTO: CreateSnapshotDTO): Promise<Snapshot> {
    return await this.snapshotRepository.save(createSnapshotDTO);
  }

  async findAll(queryParams: any): Promise<any> {
    const page = queryParams['page'] || 0
    const limit = queryParams['limit'] || 5
    const skip = page * limit

    const where = _.omit(queryParams, ['page', 'limit'])

    const [snapshots, count] =  await this.snapshotRepository.findAndCount({
      where: where,
      skip,
      take: limit,
      order: {createdAt:"DESC"}
    })

    return {
      metaData: {
        page,
        limit,
        totalPage: Math.ceil(count / limit)
      },
      data: snapshots
    }
  }

  async findOne(id: string): Promise<Snapshot> {
    return await this.snapshotRepository.findOne(id)
  }

  update(id: number, updateAiModelSnapshotDto: UpdateSnapshotDTO) {
    return `This action updates a #${id} aiModelSnapshot`;
  }

  async remove(id: string) {
    const rs = await this.snapshotRepository.softDelete(id)
    if (rs.affected > 0) {
      return {
        id
      }
    }
  }
}
