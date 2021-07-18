import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrainingRequestsService } from './training-requests.service';

@Controller('training-requests')
export class TrainingRequestsController {
  constructor(private readonly trainingRequestsService: TrainingRequestsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('styleReference'))
  create(@Body() data, styleReference: Express.MulterS3.File) {
    const name = data['name']
    const contentWeight = data['contentWeight'] || 1e5
    const styleWeight = data['styleWeight'] || 1e10
    const lr = data['lr'] || 1e-3
    const relu12Weight = data['relu12Weight'] || 1
    const relu22Weight = data['relu22Weight'] || 1
    const relu33Weight = data['relu33Weight'] || 1
    const relu43Weight = data['relu43Weight'] || 1
    const saveStep = data['saveStep'] || 1000

    return this.trainingRequestsService.create({
      name,
      referenceStyleLocation: styleReference.location,
      contentWeight,
      lr,
      relu12Weight,
      relu22Weight,
      relu33Weight,
      relu43Weight,
      saveStep,
      styleWeight
    });
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
