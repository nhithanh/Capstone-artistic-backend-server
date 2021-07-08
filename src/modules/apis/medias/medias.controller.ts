import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, Req, Inject, HttpStatus, Query, UseGuards } from '@nestjs/common';
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
import { TransferVideoCompleteMetadata, TransferVideoMetadataDto } from './dto/transfer-video-metadata.dto';
import { UpdateMediaDTO } from './dto/upload-media.dto';
import { NotificationsService } from '../notifications/notifications.service';

@ApiTags("medias")
@Controller('medias')
export class MediasController {

  @Inject()
  s3Service: S3Service;

  @Inject()
  notficationsService: NotificationsService;

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

  @Post('/transfer-video')
  @UseGuards(JwtAuthGuard)
  async transferVideo(@Body() transferVideoMetadata: TransferVideoMetadataDto, @Req() req) {
    const media = await this.mediasService.findOne(transferVideoMetadata.mediaId)
    if(media.type == MEDIA_TYPE.VIDEO) {
      const payload = {
        videoLocation: this.s3Service.getCDNURL(media.storageLocation + "/original.mp4"),
        styleId: transferVideoMetadata.styleId,
        userId: req.user.id,
        saveAlbumId: transferVideoMetadata.albumId
      }
      this.producerService.emitTransferVideoTask(payload);
      return {
        payload,
        status: HttpStatus.ACCEPTED,
        message: 'Your request is executing.'
      }
    } else {
      return {
        message: "Media is not type video"
      }
    }
  }

  @Post('/transfer-video/completed')
  async transferVideoCompleted(@Body() metadata: TransferVideoCompleteMetadata) {
    const rs = await Promise.all([
      this.mediasService.create({
        albumId: metadata.saveAlbumId,
        type: MEDIA_TYPE.VIDEO,
        userId: metadata.userId,
        storageLocation: `https://artisan-photos.s3.ap-southeast-1.amazonaws.com/${metadata.saveLocation}`
      }),
      this.notficationsService.create({
        userId: metadata.userId,
        message: 'Transfer video completed!'
      })
    ])
    this.socketService.emitTransferVideoCompleted(metadata.userId, metadata.saveAlbumId)
    return rs[0]
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

  // only use for upload photo
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('media'))
  async uploadFile(@Req() req, @UploadedFile() media: Express.MulterS3.File, @Body() body) {
    const socketId = body['socketId']
    const albumId = body['albumId']
    let storageLocation = media.location
    const mediaObject = await this.mediasService.create({
        storageLocation: storageLocation,
        type: MEDIA_TYPE.PHOTO,
        userId: req.user.id,
        albumId: albumId ? albumId : req.user.defaultAlbumId
    })
    
    const payload = {
      ...mediaObject,
      accessURL: this.s3Service.getCDNURL(mediaObject.storageLocation)
    }

    if(socketId) {
      this.socketService.emitToSpecificClient(socketId, 'UPLOAD_IMAGE_SUCCESS', payload)
    }
    
    return payload
    
  }

  @Post('save-to-album')
  @UseGuards(JwtAuthGuard)
  async savePhotoToAlbum(@Req() req, @Body() saveToAlbumDto: SaveMediaToAlbumDto) {
    const photoName = new Date().toString()
    const key = `${req.user.id}/${photoName}`
    await this.s3Service.copyPhotoToPermanentBucket(saveToAlbumDto.photoLocation, key)
    const photoObject = await this.mediasService.create({
        storageLocation: saveToAlbumDto.photoLocation,
        userId: req.user.id,
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

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  changeMediaAlbum(@Req() req, @Param('id') id: string,  @Body() updateMediaDTO: UpdateMediaDTO) {
    return this.mediasService.movePhotoToAnotherAlbum(id, req.user, updateMediaDTO);
  }
}
