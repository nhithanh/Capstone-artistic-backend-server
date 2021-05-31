import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Inject, HttpStatus, Query } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { UpdatePhotoDTO } from './dto/upload-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProducerService } from 'src/modules/producer/producer.service';
import { TransferPhotoCompleteMetadatadDTO, TransferPhotoMetadataDTO } from './dto/transfer-photo-metadata.dto';
import { SocketService } from 'src/gateway/socket.service';
import { S3Service } from 'src/s3/s3.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PhotosQueryParams } from './dto/photos.query';

@ApiTags("photos")
@Controller('photos')
export class PhotosController {

  @Inject()
  s3Service: S3Service;

  @Inject()
  private readonly socketService: SocketService

  @Inject()
  private readonly producerService: ProducerService;

  @Inject()
  private readonly photosService: PhotosService;

  constructor() {}

  @Post('/transfer-photo')
  async transferPhoto(@Body() transferPhotoMetadata: TransferPhotoMetadataDTO) {
    const accessURL = this.s3Service.getCDNURL(transferPhotoMetadata.photoLocation)
    const payload = {
      photoLocation: transferPhotoMetadata.photoLocation,
      styleId: transferPhotoMetadata.style.id,
      socketId: transferPhotoMetadata.socketId,
      accessURL
    }

    this.producerService.emitTransferPhotoTask(transferPhotoMetadata.style.routingKey, payload);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Your request is executing.'
    }
  }

  @Post('/transfer-photo/completed')
  transferPhotoCompleted(@Body() transferPhotoCompleteMetadataDTO) {
    const accessURL = this.s3Service.getCDNURL(transferPhotoCompleteMetadataDTO.transferPhotoLocation)
    const payload = {
      status: 'COMPLETED',
      accessURL,
      ...transferPhotoCompleteMetadataDTO
    }
    this.socketService.emitToSpecificClient(transferPhotoCompleteMetadataDTO.socketId, 'TRANSFER_COMPLETED', payload)
    return {
      status: HttpStatus.OK,
      message: 'Your request is completed!'
    }
  }

  @ApiBody({type: CreatePhoToDTO})
  @Post()
  create(createPhotoDTO: CreatePhoToDTO) {
    return this.photosService.create(createPhotoDTO);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadFile(@UploadedFile() photo: Express.MulterS3.File, @Body() body) {
    const socketId = body['socketId']

    const photoObject = await this.photosService.create({
        photoLocation: photo.location,
        userId: '6fb1db8d-9719-426e-86f2-1b8d00001c0c',
        photoName: photo.originalname
    })
    
    const payload = {
      ...photoObject,
      accessURL: this.s3Service.getCDNURL(photoObject.photoLocation)
    }
    this.socketService.emitToSpecificClient(socketId, 'UPLOAD_IMAGE_SUCCESS', payload)
    return {
      status: 200,
      msg: "Done"
    }
  }

  @Get()
  findAll(@Query() queryParams: PhotosQueryParams) {
    return this.photosService.findAll(queryParams);
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
