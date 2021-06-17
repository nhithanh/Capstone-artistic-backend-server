import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Inject, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProducerService } from 'src/modules/producer/producer.service';
import { TransferPhotoCompleteMetadatadDTO, TransferPhotoMetadataDTO } from './dto/transfer-photo-metadata.dto';
import { SocketService } from 'src/gateway/socket.service';
import { S3Service } from 'src/s3/s3.service';
import { ApiTags } from '@nestjs/swagger';
import { PhotosQueryParams } from './dto/photos.query';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { SavePhotoToAlbumDto } from './dto/save-photo-to-album.dto';

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
    const payload = {
      accessURL: transferPhotoMetadata.photoLocation,
      styleId: transferPhotoMetadata.style.id,
      socketId: transferPhotoMetadata.socketId,
    }
    this.producerService.emitTransferPhotoTask(transferPhotoMetadata.style.routingKey, payload);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Your request is executing.'
    }
  }

  @Post('/transfer-photo/completed')
  transferPhotoCompleted(@Body() transferPhotoCompleteMetadataDTO: TransferPhotoCompleteMetadatadDTO) {
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

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async uploadFile(@Req() req, @UploadedFile() photo: Express.MulterS3.File, @Body() body) {
    const socketId = body['socketId']
    const photoObject = await this.photosService.create({
        photoLocation: photo.location,
        userId: req.user.id,
        photoName: photo.originalname,
        albumId: req.user.defaultAlbumId
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

  @Post('save-to-album')
  @UseGuards(JwtAuthGuard)
  async savePhotoToAlbum(@Req() req, @Body() saveToAlbumDto: SavePhotoToAlbumDto) {
    const photoName = new Date().toString()
    const key = `${req.user.id}/${photoName}`
    const rs = await this.s3Service.copyPhotoToPermanentBucket(saveToAlbumDto.photoLocation, key)
    const photoObject = await this.photosService.create({
        photoLocation: saveToAlbumDto.photoLocation,
        userId: req.user.id,
        photoName,
        albumId: saveToAlbumDto.albumId
    })
    return photoObject
  }

  @Get()
  findAll(@Query() queryParams: PhotosQueryParams) {
    return this.photosService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req, @Param('id') id: string) {
    return this.photosService.remove(req.user, id);
  }
}
