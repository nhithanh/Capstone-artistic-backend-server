import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerService } from 'src/modules/producer/producer.service';
import { S3Service } from 'src/s3/s3.service';
import { getConnection, Repository } from 'typeorm';
import { Snapshot } from '../snapshots/entities/snapshot.entity';
import { SnapshotsService } from '../snapshots/snapshot.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';

@Injectable()
export class StylesService {

  @Inject()
  private readonly s3Service: S3Service;

  @Inject()
  private readonly producerService: ProducerService; 

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

  async getAllStylesWithSnapshotPath() {
    const query = 'select s.id, s.style_name, sn.location from style s join snapshot sn on s.id = sn.style_id where s.active_snapshot_id = sn.id and s.is_active = true'
    const connection = getConnection()
    const data = await connection.query(query)
    return data.map(style => {
      return {
        id: style.id,
        snapshotPath: this.s3Service.getCDNURL(style.location)
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
        iconURL: this.s3Service.getCDNURL(style.iconURL),
        demoVideoURL: this.s3Service.getCDNURL(style.demoVideoURL)
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

  async update(id: string, updateStyleDto: UpdateStyleDto) {
    const style = await this.stylesRepository.findOne(id)
    const updatedStyle = await this.stylesRepository.save({
      id,
      ...updateStyleDto
    })
    if (style.activeSnapshotId != updatedStyle.activeSnapshotId || (style.isActive == false && updatedStyle.isActive == true)) {
      
      const snapshot = await this.snapshotsRepository.findOne(updatedStyle.activeSnapshotId)
      this.producerService.emitUpdatePhotoWeight({
        styleId: id,
        snapshotPath: this.s3Service.getCDNURL(snapshot.location)
      })
      console.log("Update weight:", {
        styleId: id,
        snapshotPath: this.s3Service.getCDNURL(snapshot.location)
      })
    }
    return updatedStyle;
  }

  async remove(id: string) {
    const rs = await this.stylesRepository.delete(id)
    if (rs.affected > 0) {
      return {
        id
      }
    }
  }

  async checkIsStyleSupport(styleId: string) : Promise<Boolean>{  
    const style = await this.findOne(styleId)
    if(style) {
      if(style.isActive === false) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
}
