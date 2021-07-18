import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainingRequestDto } from './dto/create-training-request.dto';
import { STATUS, TrainingRequest } from './entities/training-request.entity';

@Injectable()
export class TrainingRequestsService {

  @InjectRepository(TrainingRequest)
  private readonly trainingRequestRepository: Repository<TrainingRequest>

  create(createTrainingRequestDto: CreateTrainingRequestDto) {
    const newTrainingRequest = this.trainingRequestRepository.create({
      ...createTrainingRequestDto,
      stauts: STATUS.WAITING
    })
    return this.trainingRequestRepository.save(newTrainingRequest)
  }

  findAll() {
    return this.trainingRequestRepository.find()
  }

  findOne(id: number) {
    return this.trainingRequestRepository.findOne()
  }

  update(id: number, updateTrainingRequestDto) {
    return `This action updates a #${id} trainingRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingRequest`;
  }
}
