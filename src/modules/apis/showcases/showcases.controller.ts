import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { ShowcasesService } from './showcases.service';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Style } from '../styles/entities/style.entity';
import { Repository } from 'typeorm';

@Controller('showcases')
export class ShowcasesController {

  @InjectRepository(Style)
  private readonly albumRepository: Repository<Style>;

  constructor(private readonly showcasesService: ShowcasesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Req() req, @UploadedFile() photo: Express.MulterS3.File, @Body() body) {
    const photoObject = await this.showcasesService.create({
      photoLocation: photo.location,
      photoName: photo.originalname,
      styleId:body.styleId
  })
  return photoObject
  }

  @Get()
  async findAll(@Query('styleId') styleId: string) {
    console.log("HERE")
    return await this.showcasesService.findAll(styleId);
  }

  @Get('available-styles')
  async getAvailableStyles() {
    return this.showcasesService.getAvailableStyles();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.showcasesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShowcaseDto: UpdateShowcaseDto) {
    return this.showcasesService.update(id, updateShowcaseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.showcasesService.remove(id);
  }
}
