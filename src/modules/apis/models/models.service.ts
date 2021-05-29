import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Style } from '../styles/entities/style.entity';
import { CreateModelDTO } from './dto/create-model.dto';
import { UpdateModelDTO } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import * as _ from 'lodash'
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ModelsService {

  @Inject()
  s3: S3Service;

  @InjectRepository(Style)
  private readonly styleRepository: Repository<Style>

  @InjectRepository(Model)
  private readonly modelRepository: Repository<Model>;

  async create(createModelDTO: CreateModelDTO): Promise<Model> {
    return await this.modelRepository.save(createModelDTO)
  }

  async findAll(): Promise<Model[]> {
    return await this.modelRepository.find()
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
}
