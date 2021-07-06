import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Inject, Req } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediasService } from '../medias/medias.service';
import { S3Service } from 'src/s3/s3.service';
import * as fs from 'fs';
import * as util from 'util';

const mkdir = util.promisify(fs.mkdir);
const exec = util.promisify(require('child_process').exec);


@Controller('videos')
export class VideosController {

  @Inject()
  private readonly mediasService: MediasService;

  @Inject()
  private readonly s3Service: S3Service;

  constructor(private readonly videosService: VideosService) {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const ts = new Date().getTime().toString()
    await mkdir(`process-video/${ts}`)
    const uploadFolder = `${req.user.id}/${ts}`
    this.s3Service.uploadFile(file.path, 'artisan-photos', `${uploadFolder}/origin.mp4`)
    await exec(`bash ./scripts/convert_video_to_hls.sh ${file.path} ./process-video/${ts}`)
    this.s3Service.uploadFolder(`./process-video/${ts}`, uploadFolder)
  }
}
