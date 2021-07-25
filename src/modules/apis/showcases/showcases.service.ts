import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/s3/s3.service';
import { getConnection, Repository } from 'typeorm';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { Showcase } from './entities/showcase.entity';

@Injectable()
export class ShowcasesService {
  @Inject()
  private readonly s3Service: S3Service;

  @InjectRepository(Showcase)
  private readonly showCaseRepository: Repository<Showcase>;


  create(createShowcaseDto: CreateShowcaseDto) {
    return this.showCaseRepository.save(createShowcaseDto)
  }

  async findAll(styleId: string) {
    const showCases = await this.showCaseRepository.find({
      where: {
        styleId
      },
      order: {priority: "ASC"},
      select: ['id', 'photoLocation', 'photoName']
    })

    const publicShowcases = showCases.map(showcase => {
      const accessURL = this.s3Service.getCDNURL(showcase.photoLocation)
      return {
        ...showcase,
        accessURL
      } 
    })

    return publicShowcases
  }

  findOne(id: string) {
    return this.showCaseRepository.findOne(id)
  }

  update(id: string, updateShowcaseDto: UpdateShowcaseDto) {
    return `This action updates a #${id} showcase`;
  }

  async remove(id: string) {
    const rs = await this.showCaseRepository.softDelete(id)
    if (rs.affected > 0) {
      return {
        id
      }
    }
  }

  async getAvailableStyles() {
    const connection = getConnection()
    const query = "Select * from style where id in (Select style_id from showcase group by style_id having count(id) > 1) order by priority"
    const rs = await connection.query(query)
    return rs.map(style => {
      return {
        ...style,
        iconURL: this.s3Service.getCDNURL(style.icon_url)
      }
    })
  }
}
