import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/s3/s3.service';
import { Repository } from 'typeorm';
import { Snapshot } from '../snapshots/entities/snapshot.entity';
import { SnapshotsService } from '../snapshots/snapshot.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';

@Injectable()
export class StylesService {

  @Inject()
  private readonly s3Service: S3Service;

  @InjectRepository(Snapshot)
  private readonly snapshotsRepository: Repository<Snapshot>;

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

  async findStyleSnapshots(id: string) {
    return this.snapshotsRepository.find({
      where: {
        styleId: id
      },
      order: {createdAt: 'DESC'}
    })
  }

  update(id: string, updateStyleDto: UpdateStyleDto) {
    return this.stylesRepository.save({
      id,
      ...updateStyleDto
    })
  }

  async remove(id: string) {
    const rs = await this.stylesRepository.delete(id)
    if (rs.affected > 0) {
      return {
        id
      }
    }
  }
}
