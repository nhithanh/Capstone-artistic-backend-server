import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhoToDTO } from './dto/create-photo.dto';
import { UpdatePhotoDTO } from './dto/upload-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class UploadImagesService {
  @InjectRepository(Photo)
  private readonly photoRepository: Repository<Photo>;

  async create(
    createPhotoDTO: CreatePhoToDTO,
  ): Promise<Photo> {
    return this.photoRepository.save(createPhotoDTO);
  }

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
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
