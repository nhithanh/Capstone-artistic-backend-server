import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, Req, Inject, HttpStatus, Query, UseGuards, HttpException } from '@nestjs/common';
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
import { TransferVideoMetadataDto } from './dto/transfer-video-metadata.dto';
import { UpdateMediaDTO } from './dto/upload-media.dto';
import { StylesService } from '../styles/styles.service';

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

  @Inject()
  private readonly styleService: StylesService;
  constructor() {}

  @Post('/transfer-photo')
  @UseGuards(JwtAuthGuard)
  async transferPhoto(@Body() transferPhotoMetadata: TransferMediaMetadataDTO, @Req() req) {
    const payload = {
      accessURL: transferPhotoMetadata.photoLocation,
      styleId: transferPhotoMetadata.styleId,
      userId: req.user.id
    }
    
    if(transferPhotoMetadata.photoLocation.includes("file://")) {
      return null
    }
    const isSupport = await this.styleService.checkIsStyleSupport(payload.styleId)
    if(isSupport === true) {
      this.producerService.emitTransferPhotoTask(payload);
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Your request is executing.'
      }
    } else {
      throw new HttpException({
        statusCode: 404,
        message: `This style is not supported now!`,
      },
      HttpStatus.NOT_FOUND,
      )
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


  @Post('/transfer-photo/completed')
  transferPhotoCompleted(@Body() transferPhotoCompleteMetadataDTO: TransferMediaCompleteMetadatadDTO) {
    const accessURL = this.s3Service.getCDNURL(transferPhotoCompleteMetadataDTO.transferPhotoLocation)
    const payload = {
      action: 'TRANSFER_PHOTO_COMPLETED',
      accessURL,
      ...transferPhotoCompleteMetadataDTO
    }

    this.socketService.emitToSpecificUser(transferPhotoCompleteMetadataDTO.userId, payload)
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
    const albumId = body['albumId']
    let storageLocation = media.location
    const mediaObject = await this.mediasService.create({
        storageLocation: storageLocation,
        type: MEDIA_TYPE.PHOTO,
        userId: req.user.id,
        albumId: albumId ? albumId : req.user.defaultAlbumId
    })
    
    const payload = {
      action: 'UPLOAD_IMAGE_SUCCESS',
      ...mediaObject,
      accessURL: this.s3Service.getCDNURL(mediaObject.storageLocation)
    }

    this.socketService.emitToSpecificUser(req.user.id, payload)

    return payload
    
  }

  @Post('save-to-album')
  @UseGuards(JwtAuthGuard)
  async savePhotoToAlbum(@Req() req, @Body() saveToAlbumDto: SaveMediaToAlbumDto) {
    const photoObject = await this.mediasService.create({
        storageLocation: saveToAlbumDto.photoLocation,
        userId: req.user.id,
        albumId: saveToAlbumDto.albumId,
        type: MEDIA_TYPE.PHOTO,
    })
    return {
      ...photoObject,
      accessURL: this.s3Service.getCDNURL(photoObject.storageLocation)
    }
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
