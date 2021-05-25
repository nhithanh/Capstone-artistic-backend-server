import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PhotoLocalService } from './photo-local.service';
import { CreatePhotoLocalDto } from './dto/create-photo-local.dto';
import { UpdatePhotoLocalDto } from './dto/update-photo-local.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photo-local')
export class PhotoLocalController {
  constructor(private readonly photoLocalService: PhotoLocalService) {}

  @Post()
  create(@Body() createPhotoLocalDto: CreatePhotoLocalDto) {
    return this.photoLocalService.create(createPhotoLocalDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('photo', {
    dest: './upload'
  }))
  async uploadFileLocal(@UploadedFile() photo: Express.Multer.File) {
    console.log("Photo", photo)
    return "Xong"
  }

  @Get()
  findAll() {
    return this.photoLocalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoLocalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoLocalDto: UpdatePhotoLocalDto) {
    return this.photoLocalService.update(+id, updatePhotoLocalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoLocalService.remove(+id);
  }
}
