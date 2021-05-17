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
  async create(createStyleDto: CreateStyleDto) : Promise<Style> {
    return await this.stylesRepository.save(createStyleDto);
  }

  async findAll() : Promise<Style[]> {
    return await this.stylesRepository.find()
  }

  async findOne(id: number) : Promise<Style> {
    return await this.stylesRepository.findOne(id)
  }

  update(id: number, updateStyleDto: UpdateStyleDto) {
    return `This action updates a #${id} style`;
  }

  remove(id: number) {
    return `This action removes a #${id} style`;
  }
}
