import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';

@Injectable()
export class StylesService {

  @InjectRepository(Style)
  private readonly stylesRepository : Repository<Style>;
  create(createStyleDto: CreateStyleDto) {
    return this.stylesRepository.create(createStyleDto);
  }

  findAll() {
    return this.stylesRepository.find()
  }

  findOne(id: number) {
    return this.stylesRepository.findOne(id)
  }

  update(id: number, updateStyleDto: UpdateStyleDto) {
    return `This action updates a #${id} style`;
  }

  remove(id: number) {
    return `This action removes a #${id} style`;
  }
}
