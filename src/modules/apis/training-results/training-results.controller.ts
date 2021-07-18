import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingResultsService } from './training-results.service';
import { CreateTrainingResultDto } from './dto/create-training-result.dto';
import { UpdateTrainingResultDto } from './dto/update-training-result.dto';

@Controller('training-results')
export class TrainingResultsController {
  constructor(private readonly trainingResultsService: TrainingResultsService) {}

  @Post()
  create(@Body() createTrainingResultDto: CreateTrainingResultDto) {
    return this.trainingResultsService.create(createTrainingResultDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.trainingResultsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingResultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainingResultDto: UpdateTrainingResultDto) {
    return this.trainingResultsService.update(+id, updateTrainingResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingResultsService.remove(+id);
  }
}
