import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Inject, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediasService } from '../medias/medias.service';
import { S3Service } from 'src/s3/s3.service';
import { MEDIA_TYPE } from '../medias/entities/media.entity';
import { ProducerService } from 'src/modules/producer/producer.service';
import { TransferVideoCompleteMetadata } from '../medias/dto/transfer-video-metadata.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { SocketService } from 'src/gateway/socket.service';

@Controller('videos')
export class VideosController {

  private readonly S3_ABSOLUTE_PATH = 'https://artisan-photos.s3.ap-southeast-1.amazonaws.com'

  @Inject()
  private readonly mediasService: MediasService;

  @Inject()
  private readonly s3Service: S3Service;

  @Inject()
  private readonly producerService: ProducerService

  @Inject()
  private readonly notificationsService: NotificationsService

  @Inject()
  private readonly socketsService: SocketService;

  constructor() {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('media'))
  async uploadVideo(@UploadedFile() media: Express.MulterS3.File, @Req() req, @Body() body) {
    const albumId = body['albumId']
    
    const newVideo = await  this.mediasService.create({
      storageLocation: `${this.S3_ABSOLUTE_PATH}/${req.folderName}`,
      type: MEDIA_TYPE.VIDEO,
      userId: req.user.id,
      albumId: albumId ? albumId : req.user.defaultAlbumId
    })

    this.producerService.emitConvertVideoTask({
      videoLocation: this.s3Service.getCDNURL(newVideo.storageLocation + '/original.mp4'),
      saveFolder: req.folderName
    })
   
    return {
      ...newVideo,
      thumbnailURL: this.s3Service.getCDNURL(newVideo.storageLocation + "/thumbnail.png"),
      originalVideoURL: this.s3Service.getCDNURL(newVideo.storageLocation + "/original.mp4"),
      playlist: this.s3Service.getCDNURL(newVideo.storageLocation + "/playlist.m3u8"),
    }
  }

  @Post('/transfer-video/completed')
  @UseInterceptors(FileInterceptor('media'))
  async handleTransferVideoComplete(@UploadedFile() media: Express.MulterS3.File, @Req() req, @Body() body) {
    const saveAlbumId = body['saveAlbumId']
    const userId = body['userId']
    const rs = await Promise.all([
      this.mediasService.create({
        albumId: saveAlbumId,
        type: MEDIA_TYPE.VIDEO,
        userId: userId,
        storageLocation: `${this.S3_ABSOLUTE_PATH}/${req.folderName}`,
      }),
      this.notificationsService.create({
        userId: userId,
        message: `Video transfered completed [26-07-2021, 08:30]!`
      })
    ])
    this.producerService.emitConvertVideoTask({
      videoLocation: this.s3Service.getCDNURL(rs[0].storageLocation + '/original.mp4'),
      saveFolder: req.folderName
    })
    this.socketsService.emitTransferVideoCompleted(userId, saveAlbumId)
    return rs[0]
  }
}
