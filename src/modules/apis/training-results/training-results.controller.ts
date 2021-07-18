import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TrainingResultsService } from './training-results.service';
import { CreateTrainingResultDto } from './dto/create-training-result.dto';

@Controller('training-results')
export class TrainingResultsController {
  constructor(private readonly trainingResultsService: TrainingResultsService) {}

  @Post()
  create(@Body() createTrainingResultDto: CreateTrainingResultDto) {
    return this.trainingResultsService.create(createTrainingResultDto);
  }

  @Get()
  getTrainingResultByTrainingRequestId(@Query('requestId') id: string) {
    return this.trainingResultsService.getTrainingResultByTrainingRequestId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingResultsService.remove(+id);
  }
}
