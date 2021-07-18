import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Inject, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProducerService } from 'src/modules/producer/producer.service';
import { S3Service } from 'src/s3/s3.service';
import { TrainingRequestsService } from './training-requests.service';

@Controller('training-requests')
export class TrainingRequestsController {

  @Inject()
  private readonly producerService: ProducerService;

  @Inject()
  private readonly s3Service: S3Service;

  constructor(private readonly trainingRequestsService: TrainingRequestsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Body() data, @UploadedFile() photo: Express.MulterS3.File) {
    const name = data['name']
    const contentWeight = data['contentWeight'] || 1e5
    const styleWeight = data['styleWeight'] || 1e10
    const lr = +data['lr'] || 1e-3
    const relu12Weight = +data['relu12Weight'] || 1
    const relu22Weight = +data['relu22Weight'] || 1
    const relu33Weight = +data['relu33Weight'] || 1
    const relu43Weight = +data['relu43Weight'] || 1
    const saveStep = +data['saveStep'] || 1000
    const epochs = +data['epochs'] || 500
    const description = data['description'] || ''

    const trainingReqest = await this.trainingRequestsService.create({
      name,
      referenceStyleLocation: photo.location,
      contentWeight,
      lr,
      relu12Weight,
      relu22Weight,
      relu33Weight,
      relu43Weight,
      saveStep,
      styleWeight,
      epochs,
      description
    });

    const payload = {
      id: trainingReqest.id,
      accessURL: this.s3Service.getCDNURL(photo.location),
      contentWeight,
      lr,
      relu12Weight,
      relu22Weight,
      relu33Weight,
      relu43Weight,
      saveStep,
      styleWeight
    }

    this.producerService.emitTrainingRequest(payload)

    return payload;
  }

  @Get()
  findAll() {
    return this.trainingRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingRequestsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTrainingRequestDto: UpdateTrainingRequestDto) {
  //   return this.trainingRequestsService.update(+id, updateTrainingRequestDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingRequestsService.remove(+id);
  }
}
