import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { UploadImagesService } from './photos.service';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { UpdatePhotoDTO } from './dto/upload-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadImageToS3Option } from 'src/config/multer.config';

@Controller('photos')
export class UploadImagesController {
  constructor(private readonly uploadImagesService: UploadImagesService) {}

  @Post()
  create(@Body() createPhotoDTO: CreatePhoToDTO) {
    return this.uploadImagesService.create(createPhotoDTO);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('photo', uploadImageToS3Option))
  uploadFile(@UploadedFile() photo: Express.MulterS3.File) {
    return this.uploadImagesService.create({
      imageURL: photo.location,
      userID: '7578b8c7-0bdb-4376-9c3b-bf80ec043c1c',
      photoName: photo.originalname
    })
  }

  @Get()
  findAll() {
    return this.uploadImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadImageDto: UpdatePhotoDTO) {
    return this.uploadImagesService.update(+id, updateUploadImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadImagesService.remove(+id);
  }
}
