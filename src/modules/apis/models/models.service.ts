import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Style } from '../styles/entities/style.entity';
import { CreateModelDTO } from './dto/create-model.dto';
import { UpdateModelDTO } from './dto/update-model.dto';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelsService {

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
    if (activeModel) {
      const snapshot = await activeModel.activeSnapshot
      if (!snapshot) {
        throw new HttpException('Active model not have any active snapshot!', HttpStatus.NOT_FOUND);
      }
      return {
        activeModel,
        snapshot
      }
    } else {
      throw new HttpException('Style not have any active model!', HttpStatus.NOT_FOUND);
    }
  }
}
