import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SnapshotsService } from './snapshot.service';
import { CreateSnapshotDTO } from './dto/create-snapshot.dto';
import { UpdateSnapshotDTO } from './dto/update-snapshot.dto';
import { SnapshotQueryParams } from './dto/snapshot-query.params';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags("snapshots")
@Controller('snapshots')
export class SnapshotsController {
  constructor(private readonly snapshotsService: SnapshotsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('snapshot'))
  create(@UploadedFile() snapshotFile: Express.MulterS3.File, @Body() body) {

    const snapshotName = body['snapshotName']
    const styleId = body['styleId']

    return this.snapshotsService.create({
      name: snapshotName,
      location: snapshotFile.location,
      styleId
    });
  }

  @Get()
  findAll(@Query() queryParams: SnapshotQueryParams) {
    return this.snapshotsService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snapshotsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnapshotDTO: UpdateSnapshotDTO) {
    return this.snapshotsService.update(+id, updateSnapshotDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snapshotsService.remove(id);
  }
}
