import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketService } from 'src/gateway/socket.service';
import { S3Service } from 'src/s3/s3.service';
import { Repository } from 'typeorm';
import { CreateTrainingRequestDto } from './dto/create-training-request.dto';
import { STATUS, TrainingRequest } from './entities/training-request.entity';

@Injectable()
export class TrainingRequestsService {

  @Inject()
  private readonly socketService: SocketService;

  @Inject()
  private readonly s3Service: S3Service;

  @InjectRepository(TrainingRequest)
  private readonly trainingRequestRepository: Repository<TrainingRequest>

  create(createTrainingRequestDto: CreateTrainingRequestDto) {
    const newTrainingRequest = this.trainingRequestRepository.create({
      ...createTrainingRequestDto,
      status: STATUS.WAITING
    })
    return this.trainingRequestRepository.save(newTrainingRequest)
  }

  async findAll() {
    const trainingRequests = await this.trainingRequestRepository.find({
      order: {createdAt: 'DESC'}
    })
    return trainingRequests.map(request => {
      return {
        ...request,
        accessURL: this.s3Service.getCDNURL(request.referenceStyleLocation)
      }
    })
  }

  async findOne(id: string) {
    const data = await this.trainingRequestRepository.findOne(id)
    if(data) {
      return {
        ...data, 
        styleAccessURL: this.s3Service.getCDNURL(data.referenceStyleLocation),
      }
    }
    return {
      id,
      status: "DELETED"
    }
  }

  async stopTrainingRequest(id: string) {
    const trainingRequest = await this.trainingRequestRepository.findOne(id)
    this.socketService.emitStopTraining()
    return this.trainingRequestRepository.save({
      ...trainingRequest,
      status: STATUS.STOPPED
    })
  }

  async startTrainingRequest(id: string) {
    const trainingRequest = await this.trainingRequestRepository.findOne(id)
    const updatedTrainingRequest = await this.trainingRequestRepository.save({
      ...trainingRequest,
      status: STATUS.IN_PROGRESS
    })
    this.socketService.emitUpdateTrainingRequestToAdmin(updatedTrainingRequest)
  }

  async completeTrainingReuest(id: string) {
    const trainingRequest = await this.trainingRequestRepository.findOne(id)
    const updatedTrainingRequest = await this.trainingRequestRepository.save({
      ...trainingRequest,
      status: STATUS.COMPLETED
    })
    this.socketService.emitUpdateTrainingRequestToAdmin(updatedTrainingRequest)
  }

  remove(id: string) {
    return this.trainingRequestRepository.update({
      id
    }, {
      deletedAt: new Date(),
      status: STATUS.DELETED
    })
  }
}
