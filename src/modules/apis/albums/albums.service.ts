import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {

  @InjectRepository(Album)
  private readonly albumRepository: Repository<Album>;

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
    return this.albumRepository.save(createAlbumDto);
  }

  async findAll(user: User) {
    const userId = user.id
    return this.albumRepository.find({
      where: {
        userId
      }
    })
  }

  async findOne(id: string) {
    return this.albumRepository.findOne(id)
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
