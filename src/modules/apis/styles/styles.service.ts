import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/s3/s3.service';
import { Repository } from 'typeorm';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';

@Injectable()
export class StylesService {

  @Inject()
  private readonly s3Service: S3Service;

  @InjectRepository(Style)
  private readonly stylesRepository: Repository<Style>;

  async create(createStyleDto: CreateStyleDto): Promise<Style> {
    return this.stylesRepository.save(createStyleDto);
  }

  async getAllStyles() {
    const data = await this.stylesRepository.find({
      order: {
        createdAt: 'DESC'
      }
    })
    return data.map(style => {
      return {
        ...style,
        iconURL: this.s3Service.getCDNURL(style.iconURL)
      }
    })
  }

  async findAll() {
    const data = await this.stylesRepository.find({
      where: {
        isActive: true
      },
      select: ['id', 'styleName', 'iconURL', 'routingKey']
    });

    return data.map(style => {
      return {
        ...style, 
        iconURL: this.s3Service.getCDNURL(style.iconURL)
      }
    })
  }

  async findAllVideoSupportedStyles() {
    const data = await this.stylesRepository.find({
      where: {
        isActive: true,
        isSupportVideo: true
      },
      select: ['id', 'styleName', 'iconURL', 'routingKey', 'demoVideoURL']
    });
    return data.map(style => {
      return {
        ...style,
        iconURL: this.s3Service.getCDNURL(style.iconURL)
      }
    })
  }

  async findOne(id: string): Promise<Style> {
    const style = await this.stylesRepository.findOne(id);
    return {
      ...style,
      iconURL: this.s3Service.getCDNURL(style.iconURL)
    }
  }

  update(id: number, updateStyleDto: UpdateStyleDto) {
    return `This action updates a #${id} style`;
  }

  remove(id: number) {
    return `This action removes a #${id} style`;
  }
}
