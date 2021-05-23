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

  async create(createArtistDto: CreateArtistDto) : Promise<Artist> {
    return await this.artistsRepository.save(createArtistDto)
  }

  async findAll() : Promise<Artist[]> {
    return await this.artistsRepository.find()
  }

  async findOne(id: number): Promise<Artist> {
    return await this.artistsRepository.findOne(id)
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
