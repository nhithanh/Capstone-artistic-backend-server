import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ShowcasesService } from './showcases.service';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('showcases')
export class ShowcasesController {
  constructor(private readonly showcasesService: ShowcasesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Body() createShowcaseDto: CreateShowcaseDto,  @UploadedFile() photo: Express.MulterS3.File) {
    const photoObject = await this.showcasesService.create({
      photoLocation: photo.location,
      photoName: photo.originalname,
      styleId:createShowcaseDto.styleId
  })
  }

  @Get()
  async findAll(@Query('styleId') styleId: string) {
    return await this.showcasesService.findAll(styleId);
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
