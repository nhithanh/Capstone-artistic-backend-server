import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put, UseInterceptors, UploadedFile, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { S3Service } from 'src/s3/s3.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {

  constructor(private readonly albumsService: AlbumsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.createNewAlbum(createAlbumDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    return await this.albumsService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.albumsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto, @Req() req) {
    return await this.albumsService.update(id,req.user, updateAlbumDto);
  }

  @Put(':id/update-background-with-upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async updateBackgroundWithFileUpload(@Param('id') id, @Req() req, @UploadedFile() photo: Express.MulterS3.File, @Body() body) {
    return this.albumsService.update(id, req.user, {
      thumbnailURL: photo.location
    })
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req) {
    return await this.albumsService.remove(id, req.user);
  }
}
