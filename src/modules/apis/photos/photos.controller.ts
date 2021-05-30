import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Inject, HttpStatus } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { UpdatePhotoDTO } from './dto/upload-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProducerService } from 'src/modules/producer/producer.service';
import { TransferPhotoCompleteMetadatadDTO, TransferPhotoMetadataDTO } from './dto/transfer-photo-metadata.dto';
import { SocketService } from 'src/gateway/socket.service';
import { S3Service } from 'src/s3/s3.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("photos")
@Controller('photos')
export class PhotosController {

  @Inject()
  s3Service: S3Service;

  @Inject()
  private readonly socketService: SocketService

  @Inject()
  private readonly producerService: ProducerService;

  constructor(private readonly photosService: PhotosService) {}

  @Get('/send-message')
  sendMessage() {
    this.producerService.emitTransferPhotoTask("udnin", "route-key")
    return "Done"
  }

  @Post('/transfer-photo')
  async transferPhoto(@Body() transferPhotoMetadata: TransferPhotoMetadataDTO) {
    const accessURL = await this.s3Service.getPhotoSignedURL(transferPhotoMetadata.photoLocation)
    const payload = {
      ...transferPhotoMetadata,
      accessURL
    }

    this.producerService.emitTransferPhotoTask(transferPhotoMetadata.routingKey, payload);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Your request is executing.'
    }
  }

  @Post('/transfer-photo/completed')
  async transferPhotoCompleted(@Body() transferPhotoCompleteMetadataDTO: TransferPhotoCompleteMetadatadDTO) {
    const accessURL = await this.s3Service.getPhotoSignedURL(transferPhotoCompleteMetadataDTO.transferPhotoLocation)
    const payload = {
      status: 'COMPLETED',
      accessURL
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

    const [photoObject, accessURL] = await Promise.all([
      this.photosService.create({
        photoLocation: photo.location,
        userId: 'b4dbdf25-77ab-447c-8da1-9d8929614ee1',
        photoName: photo.originalname
      }),
      this.s3Service.getPhotoSignedURL(photo.location) 
    ])
    const payload = {
      ...photoObject,
      accessURL
    }
    this.socketService.emitToSpecificClient(socketId, 'UPLOAD_IMAGE_SUCCESS', payload)
    return {
      status: 200,
      msg: "Done"
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
