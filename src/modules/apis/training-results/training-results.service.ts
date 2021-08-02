import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketService } from 'src/gateway/socket.service';
import { S3Service } from 'src/s3/s3.service';
import { Repository } from 'typeorm';
import { TrainingRequest } from '../training-requests/entities/training-request.entity';
import { CreateTrainingResultDto } from './dto/create-training-result.dto';
import { UpdateTrainingResultDto } from './dto/update-training-result.dto';
import { TrainingResult } from './entities/training-result.entity';

@Injectable()
export class TrainingResultsService {

  @InjectRepository(TrainingResult)
  private readonly trainingResultRepository: Repository<TrainingResult>

  @InjectRepository(TrainingRequest)
  private readonly trainingRequestReposiory: Repository<TrainingRequest>

  @Inject()
  private readonly s3Service: S3Service;

  @Inject()
  private readonly socketService: SocketService;

  async create(createTrainingResultDto: CreateTrainingResultDto) {
    const trainingRequest = await this.trainingRequestReposiory.findOne(createTrainingResultDto.trainingRequestId)
    const updateTrainingRequest = {
      ...trainingRequest,
      checkpoint: +createTrainingResultDto.step
    }
    this.trainingRequestReposiory.save(updateTrainingRequest).then(() => {
      this.socketService.emitUpdateTrainingRequestToAdmin(updateTrainingRequest)
    })
    const newTrainingResult = this.trainingResultRepository.create({...createTrainingResultDto,
      resultPhotoLocation: `https://artisan-photos.s3.amazonaws.com/${createTrainingResultDto.resultPhotoLocation}`,
      snapshotLocation: `https://artisan-photos.s3.amazonaws.com/${createTrainingResultDto.snapshotLocation}`, 
      step: +createTrainingResultDto.step})
    return this.trainingResultRepository.save(newTrainingResult)
  }

  async findAll(id: string) {
    const trainingResults = await this.trainingResultRepository.find({
      where: {
        trainingRequestId: id
      }
    })
    return trainingResults.map(trainingResult => {
      return {
        ...trainingResult,
        photoAccessURL: this.s3Service.getCDNURL(trainingResult.resultPhotoLocation),
        snapshotAccessURL: this.s3Service.getCDNURL(trainingResult.snapshotLocation)
      }
    })
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

  async getTrainingResultByTrainingRequestId(id: string) {
    const data = await this.trainingResultRepository.find({
      where: {
        trainingRequestId: id
      },
      order: {createdAt: 'ASC'}
    })

    return data.map(item => {
      return {
        ...item,
        photoAccessURL: this.s3Service.getCDNURL(item.resultPhotoLocation),
        snapshotAccessURL: this.s3Service.getCDNURL(item.snapshotLocation)
      }
    })
  } 
}
