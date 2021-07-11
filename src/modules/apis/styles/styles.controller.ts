import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { StylesService } from './styles.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';
import { ModelsService } from '../models/models.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("styles")
@Controller('styles')
export class StylesController {

  @Inject()
  private readonly stylesService: StylesService;

  @Inject()
  private readonly modelsService: ModelsService;

  @Post()
  async create(@Body() createStyleDto: CreateStyleDto) : Promise<Style>{
    return await this.stylesService.create(createStyleDto);
  }

  @Get()
  findAll() {
    return this.stylesService.findAll();
  }

  @Get('/video-transfer')
  getVideoSupportStyles() {
    return this.stylesService.findAllVideoSupportedStyles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

  }
  
  @Get(':id/active-model')
  getStyleActiveModelDetail(@Param('id') id: string) {
    return this.modelsService.getActivateModelDetail(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStyleDto: UpdateStyleDto) {
    return this.stylesService.update(+id, updateStyleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stylesService.remove(+id);
  }
}
