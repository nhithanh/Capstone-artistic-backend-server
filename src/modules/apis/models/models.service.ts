import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelDTO } from './dto/create-model.dto';
import { UpdateModelDTO } from './dto/update-model.dto';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelsService {

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
}
