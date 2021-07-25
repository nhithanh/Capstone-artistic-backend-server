import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, Inject, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'photo', maxCount: 1 },
    { name: 'snapshot', maxCount: 1 },
  ]))
  async create(@Body() data, @UploadedFiles() files: Express.Multer.File[]) {
    let uploadTasks = []
    const photoContent = files ? files['photo'] : null
    const snapshotContent = files ? files['snapshot'] : null

    if(!photoContent) {
      throw new HttpException("Please upload reference style file!", HttpStatus.BAD_REQUEST)
    }
    
    if(photoContent[0].mimetype.includes('image') == false) {
      throw new HttpException("Not support reference style file!", HttpStatus.BAD_REQUEST)
    }

    uploadTasks.push(this.s3Service.uploadFileWithBuffer(photoContent[0].buffer, `trainings/${new Date().toISOString().substring(0, 10)}/${Date.now().toString()}`))
    
    if(snapshotContent) {
      if(snapshotContent[0].originalname.includes('.pth') == false) {
        throw new HttpException("Not support snapshot file!", HttpStatus.BAD_REQUEST)
      }
      uploadTasks.push(this.s3Service.uploadFileWithBuffer(snapshotContent[0].buffer, `trainings/${new Date().toISOString().substring(0, 10)}/${Date.now().toString()}`))
    }
    
    const s3Files = await Promise.all(uploadTasks)
    const name = data['name']
    const contentWeight = data['contentWeight'] || 1e5
    const styleWeight = data['styleWeight'] || 1e10
    const lr = +data['lr'] || 1e-3
    const relu12Weight = +data['relu12Weight'] || 0
    const relu22Weight = +data['relu22Weight'] || 0
    const relu33Weight = +data['relu33Weight'] || 0
    const relu43Weight = +data['relu43Weight'] || 0
    const saveStep = +data['saveStep'] || 1000
    const numOfIterations = +data['numOfIterations'] || 20000
    const description = data['description'] || ''
    
    const trainingReqest = await this.trainingRequestsService.create({
      name,
      referenceStyleLocation: s3Files[0].Location,
      snapshotLocation: s3Files.length == 2 ? s3Files[1].Location : null,
      contentWeight,
      lr,
      relu12Weight,
      relu22Weight,
      relu33Weight,
      relu43Weight,
      saveStep,
      styleWeight,
      numOfIterations,
      description
    });

    let payload = {
      id: trainingReqest.id,
      accessURL: this.s3Service.getCDNURL(trainingReqest.referenceStyleLocation),
      contentWeight: +contentWeight,
      lr: +lr,
      numOfIterations: +numOfIterations,
      relu12Weight: +relu12Weight,
      relu22Weight: +relu22Weight,
      relu33Weight: +relu33Weight,
      relu43Weight: +relu43Weight,
      saveStep: +saveStep,
      styleWeight: +styleWeight,
      snapshotLocation: trainingReqest.snapshotLocation ? this.s3Service.getCDNURL(trainingReqest.snapshotLocation) : null,
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
    return this.trainingRequestsService.findOne(id);
  }

  @Get(':id/stop')
  stop(@Param('id') id: string) {
    return this.trainingRequestsService.stopTrainingRequest(id);
  }

  @Get(':id/start')
  start(@Param('id') id: string) {
    return this.trainingRequestsService.startTrainingRequest(id);
  }

  @Get(':id/completed')
  completed(@Param('id') id: string) {
    return this.trainingRequestsService.completeTrainingReuest(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingRequestsService.remove(id);
  }
}
