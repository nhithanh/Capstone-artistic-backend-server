import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Inject, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { MediasService } from './medias.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProducerService } from 'src/modules/producer/producer.service';
import { TransferMediaMetadataDTO, TransferMediaCompleteMetadatadDTO } from './dto/transfer-media-metadata.dto';
import { SocketService } from 'src/gateway/socket.service';
import { S3Service } from 'src/s3/s3.service';
import { ApiTags } from '@nestjs/swagger';
import { MediasQueryParams } from './dto/medias.query';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { SaveMediaToAlbumDto } from './dto/save-media-to-album.dto';
import { MEDIA_TYPE } from './entities/media.entity'

@ApiTags("medias")
@Controller('medias')
export class MediasController {

  @Inject()
  s3Service: S3Service;

  @Inject()
  private readonly socketService: SocketService

  @Inject()
  private readonly producerService: ProducerService;

  @Inject()
  private readonly mediasService: MediasService;

  constructor() {}

  @Post('/transfer-photo')
  async transferPhoto(@Body() transferPhotoMetadata: TransferMediaMetadataDTO) {
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
  transferPhotoCompleted(@Body() transferPhotoCompleteMetadataDTO: TransferMediaCompleteMetadatadDTO) {
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
  @UseInterceptors(FileInterceptor('media'))
  async uploadFile(@Req() req, @UploadedFile() media: Express.MulterS3.File, @Body() body) {
    const socketId = body['socketId']
    const photoObject = await this.mediasService.create({
        storageLocation: media.location,
        type: media.contentType.includes("image") ? MEDIA_TYPE.PHOTO : MEDIA_TYPE.VIDEO,
        userId: req.user.id,
        name: media.originalname,
        albumId: req.user.defaultAlbumId
    })
    
    const payload = {
      ...photoObject,
      accessURL: this.s3Service.getCDNURL(photoObject.storageLocation)
    }
    if(socketId) {
      this.socketService.emitToSpecificClient(socketId, 'UPLOAD_IMAGE_SUCCESS', payload)
    }
    return {
      status: 200,
      data: payload
    }
  }

  @Post('save-to-album')
  @UseGuards(JwtAuthGuard)
  async savePhotoToAlbum(@Req() req, @Body() saveToAlbumDto: SaveMediaToAlbumDto) {
    const photoName = new Date().toString()
    const key = `${req.user.id}/${photoName}`
    const rs = await this.s3Service.copyPhotoToPermanentBucket(saveToAlbumDto.photoLocation, key)
    const photoObject = await this.mediasService.create({
        storageLocation: saveToAlbumDto.photoLocation,
        userId: req.user.id,
        name: photoName,
        albumId: saveToAlbumDto.albumId,
        type: MEDIA_TYPE.PHOTO
    })
    return photoObject
  }

  @Get()
  findAll(@Query() queryParams: MediasQueryParams) {
    return this.mediasService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediasService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req, @Param('id') id: string) {
    return this.mediasService.remove(req.user, id);
  }
}
