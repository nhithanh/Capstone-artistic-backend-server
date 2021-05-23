import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Inject } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { UpdatePhotoDTO } from './dto/upload-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { getPhotoSignedURL, uploadImageToS3Option } from 'src/config/multer.config';
import { ProducerService } from 'src/modules/producer/producer.service';

@Controller('photos')
export class UploadImagesController {

  @Inject()
  producerService: ProducerService;

  constructor(private readonly photosService: PhotosService) {}

  @Get('/test-send-message')
  testSendMessage() {
    this.producerService.sendQueueToGeneratorService('my_queue', '{"photoLocation": "http://localhost:5000/"}');
  }

  @Post()
  create(createPhotoDTO: CreatePhoToDTO) {
    return this.photosService.create(createPhotoDTO);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('photo', uploadImageToS3Option))
  async uploadFile(@UploadedFile() photo: Express.MulterS3.File) {
    const photoObject = await this.photosService.create({
      photoLocation: photo.location,
      userID: '7578b8c7-0bdb-4376-9c3b-bf80ec043c1c',
      photoName: photo.originalname
    })
    return {
      ...photoObject,
      accessURL: getPhotoSignedURL(photoObject.photoLocation) 
    }
  }

  @Get()
  findAll() {
    return this.photosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadImageDto: UpdatePhotoDTO) {
    return this.photosService.update(+id, updateUploadImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(+id);
  }
}
