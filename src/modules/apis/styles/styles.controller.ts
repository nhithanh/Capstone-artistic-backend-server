import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { StylesService } from './styles.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags("styles")
@Controller('styles')
export class StylesController {

  @Inject()
  private readonly stylesService: StylesService;

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  async create(@UploadedFile() styleIcon: Express.MulterS3.File, @Body() body) : Promise<Style>{
    const styleName = body['styleName']
    return await this.stylesService.create({
      iconURL: styleIcon.location,
      styleName,
      routingKey: styleName.toLowerCase().split(" ").join("_"),
      description: ''
    });
  }

  @Get()
  findAll() {
    return this.stylesService.findAll();
  }

  @Get('/all')
  getAllStyles() {
    return this.stylesService.getAllStyles();
  }

  @Get('/video-transfer')
  getVideoSupportStyles() {
    return this.stylesService.findAllVideoSupportedStyles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stylesService.findOne(id)
  }

  @Get(':id/snapshots')
  getStyleSnapshots(@Param('id') id: string) {
    return this.stylesService.findStyleSnapshots(id)
  }
  
  @Get(':id/active-model')
  getStyleActiveModelDetail(@Param('id') id: string) {
    return this.stylesService.findOne(id)
  }

  @Put(':id/upload-file')
  @UseInterceptors(FileInterceptor('icon'))
  async updateWithFile(@UploadedFile() styleIcon: Express.MulterS3.File, @Body() body, @Param('id') id: string) : Promise<Style>{
    const styleName = body['styleName']
    const description = body['descriptiopn'] || ''
    return await this.stylesService.update(id, {
      iconURL: styleIcon.location,
      styleName,
      routingKey: styleName.toLowerCase().split(" ").join("_"),
      description
    });
  }

  @Put(':id')
  async update(@UploadedFile() styleIcon: Express.MulterS3.File, @Body() body, @Param('id') id: string) : Promise<Style>{
    const styleName = body['styleName']
    const description = body['descriptiopn'] || ''
    const activeSnapshotId = body['activeSnapshotId']
    const isActive = body['isActive']
    console.log("isActive", isActive)
    return await this.stylesService.update(id, {
      styleName,
      activeSnapshotId,
      routingKey: styleName.toLowerCase().split(" ").join("_"),
      description,
      isActive
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stylesService.remove(+id);
  }
}
