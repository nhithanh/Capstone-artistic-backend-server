import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SnapshotsService } from './snapshot.service';
import { CreateSnapshotDTO } from './dto/create-snapshot.dto';
import { UpdateSnapshotDTO } from './dto/update-snapshot.dto';

@Controller('snapshots')
export class SnapshotsController {
  constructor(private readonly snapshotsService: SnapshotsService) {}

  @Post()
  create(@Body() createSnapshotDto: CreateSnapshotDTO) {
    return this.snapshotsService.create(createSnapshotDto);
  }

  @Get()
  findAll() {
    return this.snapshotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snapshotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnapshotDTO: UpdateSnapshotDTO) {
    return this.snapshotsService.update(+id, updateSnapshotDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snapshotsService.remove(+id);
  }
}
