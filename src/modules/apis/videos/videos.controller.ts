import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Inject, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediasService } from '../medias/medias.service';
import { S3Service } from 'src/s3/s3.service';
import * as fs from 'fs';
import * as util from 'util';
import * as rimraf from 'rimraf'

import { MEDIA_TYPE } from '../medias/entities/media.entity';

const mkdir = util.promisify(fs.mkdir);
const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(fs.unlink)
const rimrafAsync = util.promisify(rimraf)


@Controller('videos')
export class VideosController {

  private readonly S3_ABSOLUTE_PATH = 'https://artisan-photos.s3.ap-southeast-1.amazonaws.com'

  @Inject()
  private readonly mediasService: MediasService;

  @Inject()
  private readonly s3Service: S3Service;

  constructor() {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('media'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @Req() req, @Body() body) {
    console.log(file.path)
    const albumId = body['albumId']
    const ts = new Date().getTime().toString()
    await mkdir(`process-video/${ts}`)
    const uploadFolder = `${req.user.id}/${ts}`
    const result = await Promise.all([
      this.mediasService.create({
        storageLocation: `${this.S3_ABSOLUTE_PATH}/${uploadFolder}`,
        type: MEDIA_TYPE.VIDEO,
        userId: req.user.id,
        albumId: albumId ? albumId : req.user.defaultAlbumId
      }),
      this.s3Service.uploadFile(file.path, 'artisan-photos', `${uploadFolder}/original.mp4`),
      exec(`bash ./scripts/generate_thumbnail.sh ${file.path} ./process-video/${ts}/thumbnail.png`),
      exec(`bash ./scripts/convert_video_to_hls.sh ${file.path} ./process-video/${ts}`)
    ])
    
    await Promise.all([
      this.s3Service.uploadFolder(`./process-video/${ts}`, uploadFolder),
      rimrafAsync(`./process-video/${ts}`),
      unlink(file.path),
    ])
    const media = result[0]

    return {
      ...media,
      thumbnailURL: this.s3Service.getCDNURL(media.storageLocation + "/thumbnail.png"),
      originalVideoURL: this.s3Service.getCDNURL(media.storageLocation + "/original.mp4"),
      m3u8_720p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/720p.m3u8"),
      m3u8_480p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/480p.m3u8"),
      m3u8_360p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/360p.m3u8"),
    }
  }
}
