import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAiModelDto } from './dto/create-ai-model.dto';
import { UpdateAiModelDto } from './dto/update-ai-model.dto';
import { AiModel } from './entities/ai-model.entity';

@Injectable()
export class AiModelsService {

  @InjectRepository(AiModel)
  private readonly aiModelRepository: Repository<AiModel>;

  create(createAiModelDto: CreateAiModelDto) {
    return this.aiModelRepository.create(createAiModelDto)
  }

  findAll() {
    return this.aiModelRepository.find()
  }

  findOne(id: number) {
    return this.aiModelRepository.findOne(id)
  }

  update(id: number, updateAiModelDto: UpdateAiModelDto) {
    return `This action updates a #${id} aiModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiModel`;
  }
}
