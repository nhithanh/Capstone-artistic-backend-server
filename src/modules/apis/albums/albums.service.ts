import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/s3/s3.service';
import { getConnection, Repository } from 'typeorm';
import { MEDIA_TYPE } from '../medias/entities/media.entity';
import { MediasService } from '../medias/medias.service';
import { User } from '../users/entities/user.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {

  @Inject()
  private readonly s3Service: S3Service;

  @InjectRepository(Album)
  private readonly albumRepository: Repository<Album>;

  @Inject()
  private readonly mediasService: MediasService


  private async checkUserAccessRight(user: User, albumId: string): Promise<boolean> {
    const album = await this.albumRepository.findOne({
      where: {
        id: albumId
      }
    })
    if (album) {
      return album.userId == user.id ? true : false
    }
    throw new HttpException("Album not found", HttpStatus.NOT_FOUND)
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.save({...createAlbumDto, isDefault: true});
  }

  async createNewAlbum(createAlbumDto: CreateAlbumDto, user: User) {
    return this.albumRepository.save({
      ...createAlbumDto,
      userId: user.id
    })
  }

  async findAll(user: User) {
    const query = `Select album.id, album.name, album.created_at, album.thumbnail_url, album.is_default, count(m.id) as total from album left join media m on album.id = m.album_id
    where album.user_id = '${user.id}' and album.deleted_at is null and m.deleted_at is null group by album.id, album.name, album.created_at, album.thumbnail_url`
    const connection = getConnection()
    const total = await this.albumRepository.count({
      where: {
        userId: user.id
      }
    })
    const rs = await connection.query(query)
    const data = rs.map(album => {
      return {
        id: album.id,
        name: album.name,
        isDefault: album.is_default,
        createdAt: album.created_at,
        thumbnailURL: album.thumbnail_url,
        total: album.total
      }
    })
    return {
      total,
      data
    }
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne(id)
    let {count, medias} = await this.mediasService.findByAlbumId(album.id, null)
    medias = medias.map(media => {
      if(media.type === MEDIA_TYPE.VIDEO) {
        return {
          ...media,
          thumbnailURL: this.s3Service.getCDNURL(media.storageLocation + "/thumbnail.png"),
          originalVideoURL: this.s3Service.getCDNURL(media.storageLocation + "/original.mp4"),
          m3u8_720p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/480p.m3u8"),
          m3u8_480p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/480p.m3u8"),
          m3u8_360p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/360p.m3u8"),
        }
      } 
      return {
        ...media,
        accessURL: this.s3Service.getCDNURL(media.storageLocation)
      }
    })
    return {...album, ...{count, medias}}
  }

  async update(id: string, user: User, updateAlbumDto: UpdateAlbumDto) {
    const isHasRight = await this.checkUserAccessRight(user, id)
    if (isHasRight) {
      const updateAlbum = await this.findOne(id)
      return this.albumRepository.save({
        ...updateAlbum,
        ...updateAlbumDto
      })
    }
    else {
      throw new HttpException({
        status: 401,
        msg: "Not have permission"
      }, HttpStatus.UNAUTHORIZED)
    }
  }

  async remove(id: string, user:User) {
    const isHasRight = await this.checkUserAccessRight(user, id)
    if (isHasRight) {
      const rs = await this.albumRepository.softDelete(id)
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
}
