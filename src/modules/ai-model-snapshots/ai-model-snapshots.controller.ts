import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiModelSnapshotsService } from './ai-model-snapshots.service';
import { CreateAiModelSnapshotDto } from './dto/create-ai-model-snapshot.dto';
import { UpdateAiModelSnapshotDto } from './dto/update-ai-model-snapshot.dto';

@Controller('ai-model-snapshots')
export class AiModelSnapshotsController {
  constructor(private readonly aiModelSnapshotsService: AiModelSnapshotsService) {}

  @Post()
  create(@Body() createAiModelSnapshotDto: CreateAiModelSnapshotDto) {
    return this.aiModelSnapshotsService.create(createAiModelSnapshotDto);
  }

  @Get()
  findAll() {
    return this.aiModelSnapshotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiModelSnapshotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiModelSnapshotDto: UpdateAiModelSnapshotDto) {
    return this.aiModelSnapshotsService.update(+id, updateAiModelSnapshotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiModelSnapshotsService.remove(+id);
  }
}
