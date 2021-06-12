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
  create(createAlbumDto: CreateAlbumDto) {
    return 'This action adds a new album';
  }

  findAll() {
    return `This action returns all albums`;
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
