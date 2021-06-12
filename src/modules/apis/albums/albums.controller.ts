import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto);
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req) {
    return await this.albumsService.remove(id, req.user);
  }
}
