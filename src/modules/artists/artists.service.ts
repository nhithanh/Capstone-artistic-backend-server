import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  @InjectRepository(Artist)
  private readonly artistsRepository: Repository<Artist>

  create(createArtistDto: CreateArtistDto) {
    return this.artistsRepository.create(createArtistDto)
  }

  findAll() {
    return this.artistsRepository.find()
  }

  findOne(id: number) {
    return this.artistsRepository.findOne(id)
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
