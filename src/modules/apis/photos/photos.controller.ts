import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Inject, HttpStatus } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { UpdatePhotoDTO } from './dto/upload-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { getPhotoSignedURL, uploadImageToS3Option } from 'src/config/multer.config';
import { ProducerService } from 'src/modules/producer/producer.service';
import { TransferPhotoMetadata } from './dto/transfer-photo-metadata.dto';
import { SocketService } from 'src/gateway/socket.service';

@Controller('photos')
export class PhotosController {

  @Inject()
  private readonly socketService: SocketService

  @Inject()
  private readonly producerService: ProducerService;

  constructor(private readonly photosService: PhotosService) {}

  @Post('/transfer-photo')
  transferPhoto(transferPhotoMetadata: TransferPhotoMetadata) {
    const payload = {
      ...transferPhotoMetadata,
      accessUrl: getPhotoSignedURL(transferPhotoMetadata.photoLocation)
    }
    this.producerService.sendQueueToGeneratorService('TRANSFER-PHOTO', payload);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Your request is executing.'
    }
  }

  @Post('/transfer-photo/completed')
  transferPhotoCompleted() {
    this.socketService.socket.emit('hello', 'hello from body')
    console.log("No complete roi nha anh trai")
    return 'emit event transfer success'
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
