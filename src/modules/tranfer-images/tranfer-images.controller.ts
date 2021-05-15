import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TranferImagesService } from './tranfer-images.service';
import { CreateTranferImageDto } from './dto/create-tranfer-image.dto';
import { UpdateTranferImageDto } from './dto/update-tranfer-image.dto';

@Controller('tranfer-images')
export class TranferImagesController {
  constructor(private readonly tranferImagesService: TranferImagesService) {}

  @Post()
  create(@Body() createTranferImageDto: CreateTranferImageDto) {
    return this.tranferImagesService.create(createTranferImageDto);
  }

  @Get()
  findAll() {
    return this.tranferImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tranferImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranferImageDto: UpdateTranferImageDto) {
    return this.tranferImagesService.update(+id, updateTranferImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tranferImagesService.remove(+id);
  }
}
