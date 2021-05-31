import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { PhotosQueryParams } from './dto/photos.query';
import { UpdatePhotoDTO } from './dto/upload-photo.dto';
import { Photo } from './entities/photo.entity';
import * as _ from 'lodash'
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class PhotosService {

  @Inject()
  s3Service: S3Service;

  @InjectRepository(Photo)
  private readonly photoRepository: Repository<Photo>;

  async create(
    createPhotoDTO: CreatePhoToDTO,
  ): Promise<Photo> {
    return this.photoRepository.save(createPhotoDTO);
  }

  async findAll(queryParams: PhotosQueryParams): Promise<any> {
    const page = queryParams['page'] || 0
    const limit = queryParams['limit'] || 5
    const skip = page * limit

    const where = _.omit(queryParams, ['page', 'limit'])

    const [photos, count] = await this.photoRepository.findAndCount({
      where: where,
      skip,
      take: limit,
      order: {createdAt: "DESC"},
      select: ['id', 'photoLocation', 'photoName']
    })

    const photosPublic = photos.map(photo => {
      const accessURL = this.s3Service.getCDNURL(photo.photoLocation)
      return {
        ...photo,
        accessURL
      } 
    })

    return {
      metaData: {
        page,
        limit,
        totalPage: Math.ceil(count / limit)
      },
      photos: photosPublic
    }
  }

  async findOne(id: number): Promise<Photo> {
    return this.photoRepository.findOne(id);
  }

  update(id: number, updateUploadImageDto: UpdatePhotoDTO) {
    return `This action updates a #${id} uploadImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadImage`;
  }
}
