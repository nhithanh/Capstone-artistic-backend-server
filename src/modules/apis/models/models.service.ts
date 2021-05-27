import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelDTO } from './dto/create-model.dto';
import { UpdateModelDTO } from './dto/update-model.dto';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelsService {

  @InjectRepository(Model)
  private readonly aiModelRepository: Repository<Model>;

  async create(createAiModelDto: CreateModelDTO): Promise<Model> {
    return await this.aiModelRepository.save(createAiModelDto)
  }

  async findAll(): Promise<Model[]> {
    return await this.aiModelRepository.find()
  }

  async findOne(id: number): Promise<Model> {
    return await this.aiModelRepository.findOne(id)
  }

  update(id: number, updateAiModelDto: UpdateModelDTO) {
    return `This action updates a #${id} aiModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiModel`;
  }
}
