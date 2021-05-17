import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTranferImageDto } from './dto/create-tranfer-image.dto';
import { UpdateTranferImageDto } from './dto/update-tranfer-image.dto';
import { TranferImage } from './entities/tranfer-image.entity';

@Injectable()
export class TranferImagesService {

  @InjectRepository(TranferImage)
  private readonly tranferImageRepository : Repository<TranferImage>;

  async create(createTranferImageDto: CreateTranferImageDto) : Promise<TranferImage>{
    return this.tranferImageRepository.save(createTranferImageDto)
  }

  async findAll() : Promise<TranferImage[]>{
    return this.tranferImageRepository.find()
  }

  async findOne(id: number) : Promise<TranferImage> {
    return this.tranferImageRepository.findOne(id)
  }

  update(id: number, updateTranferImageDto: UpdateTranferImageDto) {
    return `This action updates a #${id} tranferImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} tranferImage`;
  }
}
