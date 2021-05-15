import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUploadImageDto } from './dto/create-upload-image.dto';
import { UpdateUploadImageDto } from './dto/update-upload-image.dto';
import { UploadImage } from './entities/upload-image.entity';

@Injectable()
export class UploadImagesService {
  @InjectRepository(UploadImage)
  private readonly uploadImageRepository: Repository<UploadImage>;

  async create(
    createUploadImageDto: CreateUploadImageDto,
  ): Promise<UploadImage> {
    return this.uploadImageRepository.create(createUploadImageDto);
  }

  async findAll(): Promise<UploadImage[]> {
    return this.uploadImageRepository.find();
  }

  async findOne(id: number): Promise<UploadImage> {
    return this.uploadImageRepository.findOne(id);
  }

  update(id: number, updateUploadImageDto: UpdateUploadImageDto) {
    return `This action updates a #${id} uploadImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadImage`;
  }
}
