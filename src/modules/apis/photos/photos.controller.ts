import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Inject, HttpStatus } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { UpdatePhotoDTO } from './dto/upload-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadImageToS3Option } from 'src/config/multer.service';
import { ProducerService } from 'src/modules/producer/producer.service';
import { TransferPhotoCompleteMetadatadDTO, TransferPhotoMetadataDTO } from './dto/transfer-photo-metadata.dto';
import { SocketService } from 'src/gateway/socket.service';
import { S3Service } from 'src/s3/s3.service';

@Controller('photos')
export class PhotosController {

  @Inject()
  s3Service: S3Service;

  @Inject()
  private readonly socketService: SocketService

  @Inject()
  private readonly producerService: ProducerService;

  constructor(private readonly photosService: PhotosService) {}

  @Post('/transfer-photo')
  async transferPhoto(@Body() transferPhotoMetadata: TransferPhotoMetadataDTO) {
    console.log("prepost:", transferPhotoMetadata)
    const accessURL = await this.s3Service.getPhotoSignedURL(transferPhotoMetadata.photoLocation)
    const payload = {
      ...transferPhotoMetadata,
      accessURL
    }
    this.producerService.sendQueueToGeneratorService('TRANSFER-PHOTO', payload);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Your request is executing.'
    }
  }

  @Post('/transfer-photo/completed')
  transferPhotoCompleted(@Body() transferPhotoCompleteMetadataDTO: TransferPhotoCompleteMetadatadDTO) {
    const payload = {
      status: 'COMPLETED',
      accessURL: `http://192.168.1.26:3000/${transferPhotoCompleteMetadataDTO.transferPhotoName}`,
      styleID: transferPhotoCompleteMetadataDTO.styleID
    }
    this.socketService.emitToSpecificClient(transferPhotoCompleteMetadataDTO.socketID, 'TRANSFER_COMPLETED', payload)
    console.log(`Emit to ${transferPhotoCompleteMetadataDTO.socketID}`)
    console.log("Payload:", payload)
    return {
      status: HttpStatus.OK,
      message: 'Your request is completed!'
    }
  }

  @Post()
  create(createPhotoDTO: CreatePhoToDTO) {
    return this.photosService.create(createPhotoDTO);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadFile(@UploadedFile() photo: Express.MulterS3.File, @Body() body) {
    const socketID = body['socketID']

    const [photoObject, accessURL] = await Promise.all([
      this.photosService.create({
        photoLocation: photo.location,
        userID: '7578b8c7-0bdb-4376-9c3b-bf80ec043c1c',
        photoName: photo.originalname
      }),
      this.s3Service.getPhotoSignedURL(photo.location) 
    ])
    const payload = {
      ...photoObject,
      accessURL
    }

    this.socketService.emitToSpecificClient(socketID, 'UPLOAD_IMAGE_SUCCESS', payload)
    return null
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
