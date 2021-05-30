import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { PhotosQueryParams } from './dto/photos.query';
import { UpdatePhotoDTO } from './dto/upload-photo.dto';
import { Photo } from './entities/photo.entity';
import * as _ from 'lodash'

@Injectable()
export class PhotosService {
  @InjectRepository(Photo)
  private readonly photoRepository: Repository<Photo>;

  async create(
    createPhotoDTO: CreatePhoToDTO,
  ): Promise<Photo> {
    return this.photoRepository.save(createPhotoDTO);
  }

  async findAll(queryParams: PhotosQueryParams): Promise<any> {
    const page = queryParams['page'] || 0
    const offset = queryParams['offset'] || 5
    const skip = page * offset

    const where = _.omit(queryParams, ['page', 'offset'])

    const [photos, count] = await this.photoRepository.findAndCount({
      where: where,
      skip,
      take: offset,
      order: {createdAt: "DESC"}
    })

    return {
      page,
      totalPage: Math.ceil(count / offset),
      data: photos
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
