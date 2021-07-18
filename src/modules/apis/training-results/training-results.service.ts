import { Injectable } from '@nestjs/common';
import { CreateTrainingResultDto } from './dto/create-training-result.dto';
import { UpdateTrainingResultDto } from './dto/update-training-result.dto';

@Injectable()
export class TrainingResultsService {
  create(createTrainingResultDto: CreateTrainingResultDto) {
    return 'This action adds a new trainingResult';
  }

  findAll() {
    return `This action returns all trainingResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainingResult`;
  }

  update(id: number, updateTrainingResultDto: UpdateTrainingResultDto) {
    return `This action updates a #${id} trainingResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingResult`;
  }
}
