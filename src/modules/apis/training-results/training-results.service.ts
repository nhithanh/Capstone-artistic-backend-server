import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/s3/s3.service';
import { Repository } from 'typeorm';
import { CreateTrainingResultDto } from './dto/create-training-result.dto';
import { UpdateTrainingResultDto } from './dto/update-training-result.dto';
import { TrainingResult } from './entities/training-result.entity';

@Injectable()
export class TrainingResultsService {

  @InjectRepository(TrainingResult)
  private readonly trainingResultRepository: Repository<TrainingResult>

  @Inject()
  private readonly s3Service: S3Service;

  create(createTrainingResultDto: CreateTrainingResultDto) {
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
        snapshotAccessURL: this.s3Service.getS3SignedURL(trainingResult.snapshotLocation)
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
}
