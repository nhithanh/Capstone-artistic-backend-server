import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Inject } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediasService } from '../medias/medias.service';
import { S3Service } from 'src/s3/s3.service';

@Controller('videos')
export class VideosController {

  @Inject()
  private readonly mediasService: MediasService;

  @Inject()
  private readonly s3Service: S3Service;

  constructor(private readonly videosService: VideosService) {}

  @Post('/upload')
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    console.log(file.path)
  }
}
