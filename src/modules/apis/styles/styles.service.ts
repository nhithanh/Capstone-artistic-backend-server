import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';

@Injectable()
export class StylesService {
  @InjectRepository(Style)
  private readonly stylesRepository: Repository<Style>;

  async create(createStyleDto: CreateStyleDto): Promise<Style> {
    return this.stylesRepository.save(createStyleDto);
  }

  async getAllStyles() {
    return this.stylesRepository.find({
      order: {
        createdAt: 'DESC'
      }
    })
  }

  async findAll(): Promise<Style[]> {
    return this.stylesRepository.find({
      where: {
        isActive: true
      },
      select: ['id', 'styleName', 'iconURL', 'routingKey']
    });
  }

  async findAllVideoSupportedStyles(): Promise<Style[]> {
    return this.stylesRepository.find({
      where: {
        isActive: true,
        isSupportVideo: true
      },
      select: ['id', 'styleName', 'iconURL', 'routingKey', 'demoVideoURL']
    });
  }

  async findOne(id: string): Promise<Style> {
    return this.stylesRepository.findOne(id);
  }

  update(id: number, updateStyleDto: UpdateStyleDto) {
    return `This action updates a #${id} style`;
  }

  remove(id: number) {
    return `This action removes a #${id} style`;
  }
}
