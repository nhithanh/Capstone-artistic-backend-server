import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaDTO } from './dto/create-media.dto';
import { MediasQueryParams } from './dto/medias.query';
import { UpdateMediaDTO } from './dto/upload-media.dto';
import { Media } from './entities/media.entity';
import * as _ from 'lodash'
import { S3Service } from 'src/s3/s3.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MediasService {

  @Inject()
  s3Service: S3Service;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  @InjectRepository(Media)
  private readonly mediaRepository: Repository<Media>;

  private async checkUserAccessRight(user: User, photoId: string): Promise<boolean> {
    const photo = await this.mediaRepository.findOne({
      where: {
        id: photoId
      }
    })
    if (photo) {
      return photo.userId == user.id ? true : false
    }
    throw new HttpException("Photo not found", HttpStatus.NOT_FOUND)
  }

  async create(createPhotoDTO: CreateMediaDTO): Promise<Media> {
    return this.mediaRepository.save(createPhotoDTO);
  }

  async findAll(queryParams: MediasQueryParams): Promise<any> {
    const page = queryParams['page'] || 0
    const limit = queryParams['limit'] || 5
    const skip = page * limit

    const where = _.omit(queryParams, ['page', 'limit'])

    const [photos, count] = await this.mediaRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: {createdAt: "DESC"}      
    })

    const photosPublic = photos.map(photo => {
      const accessURL = this.s3Service.getCDNURL(photo.storageLocation)
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

  async findOne(id: string): Promise<Media> {
    return this.mediaRepository.findOne(id);
  }

  update(id: number, updateUploadImageDto: UpdateMediaDTO) {
    return `This action updates a #${id} uploadImage`;
  }

  async remove(user: User, id: string) {
    const isHasRight = await this.checkUserAccessRight(user, id)
    if (isHasRight) {
      const rs = await this.mediaRepository.softDelete(id)
      if(rs.affected > 0) {
        return {
          id
        }
      }
    }
    else {
      throw new HttpException({
        status: 401,
        msg: "Not have permission"
      }, HttpStatus.UNAUTHORIZED)
    }
  }


  async findByAlbumId(albumId: string, limit: number) {
    let photos = []
    let count = 0
    if(limit !== null) {
        [photos, count] = await this.mediaRepository.findAndCount({
        where: {albumId},
        order: {createdAt: 'DESC'},
        take: limit,
     })
    } else {
      [photos, count] = await this.mediaRepository.findAndCount({
        where: {albumId},
        order: {createdAt: 'DESC'},
     })
    }
    return {count, photos}
  }
}
