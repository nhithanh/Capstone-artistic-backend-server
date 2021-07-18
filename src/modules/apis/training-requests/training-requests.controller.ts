import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingRequestsService } from './training-requests.service';
import { CreateTrainingRequestDto } from './dto/create-training-request.dto';
import { UpdateTrainingRequestDto } from './dto/update-training-request.dto';

@Controller('training-requests')
export class TrainingRequestsController {
  constructor(private readonly trainingRequestsService: TrainingRequestsService) {}

  @Post()
  create(@Body() createTrainingRequestDto: CreateTrainingRequestDto) {
    return this.trainingRequestsService.create(createTrainingRequestDto);
  }

  @Get()
  findAll() {
    return this.trainingRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainingRequestDto: UpdateTrainingRequestDto) {
    return this.trainingRequestsService.update(+id, updateTrainingRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingRequestsService.remove(+id);
  }
}
