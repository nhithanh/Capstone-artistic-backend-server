import { HttpException, HttpStatus, Inject, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Style } from '../styles/entities/style.entity';
import { CreateModelDTO } from './dto/create-model.dto';
import { UpdateModelDTO } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import * as _ from 'lodash'
import { S3Service } from 'src/s3/s3.service';
import { Snapshot } from '../snapshots/entities/snapshot.entity';
import { ModelQueryParams } from './dto/model.query';

@Injectable()
export class ModelsService {

  @Inject()
  s3: S3Service;

  @InjectRepository(Style)
  private readonly styleRepository: Repository<Style>

  @InjectRepository(Snapshot)
  private readonly snapshotRepository: Repository<Snapshot>

  @InjectRepository(Model)
  private readonly modelRepository: Repository<Model>;

  async create(createModelDTO: CreateModelDTO): Promise<Model> {
    return await this.modelRepository.save(createModelDTO)
  }

  async findAll(@Query() queryParams: ModelQueryParams): Promise<any> {
    const page = queryParams['page'] || 0
    const limit = queryParams['limit'] || 5
    const skip = page * limit

    const where = _.omit(queryParams, ['page', 'limit'])

    const [models, count] = await this.modelRepository.findAndCount({
      where: where,
      skip,
      take: limit,
      order: {createdAt: "DESC"}
    })
    return {
      metaData: {
        page,
        limit,
        totalPage: Math.ceil(count / limit),
      },
      data: models
    }
  }

  async findOne(id: number): Promise<Model> {
    return await this.modelRepository.findOne(id)
  }

  update(id: number, updateModelDTO: UpdateModelDTO) {
    return `This action updates a #${id} aiModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiModel`;
  }

  async getActivateModelDetail(styleId: string) {
    const style = await this.styleRepository.findOneOrFail({id: styleId})
    const activeModel = await style.activeModel
    if (!activeModel) {
      throw new HttpException('Style does not have active model!', HttpStatus.NOT_FOUND)
    }
    const activeSnapshot = await activeModel.activeSnapshot
    if(!activeSnapshot) {
      throw new HttpException('Active model does not have active snapshot!', HttpStatus.NOT_FOUND)
    }

    const snapshotSignedURL = await this.s3.getPhotoSignedURL(activeSnapshot.location)

    return {
      modelType: activeModel.type,
      routingKey: style.routingKey,
      snapshotPath: snapshotSignedURL
    }
  }

  async updateActiveSnapshot(modelId: string, snapshotId: string) {
    const model = await this.modelRepository.findOne({
      where: {
        id: modelId
      } 
    })
    if(!model) {
      throw new HttpException('Model not found', HttpStatus.NOT_FOUND)
    }

    if(model.activeSnapshotId == snapshotId) {
      throw new HttpException('Active snapshot is same', HttpStatus.AMBIGUOUS)
    }

    const snapshot = await this.snapshotRepository.findOne({
      where: {
        id: snapshotId
      }
    })

    if(!snapshot) {
      throw new HttpException('Snasphot not found', HttpStatus.NOT_FOUND)
    }

    const updatedModel = await this.modelRepository.save({
      ...model,
      activeSnapshotId: snapshotId
    })
    const style = await this.styleRepository.findOne({
      where: {
        id: model.styleId
      }
    })
    return {
      snapshot,
      model: updatedModel,
      style
    }
  }
}
