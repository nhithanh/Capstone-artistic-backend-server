import { Injectable } from '@nestjs/common';
import { CreatePhotoLocalDto } from './dto/create-photo-local.dto';
import { UpdatePhotoLocalDto } from './dto/update-photo-local.dto';

@Injectable()
export class PhotoLocalService {
  create(createPhotoLocalDto: CreatePhotoLocalDto) {
    return 'This action adds a new photoLocal';
  }

  findAll() {
    return `This action returns all photoLocal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photoLocal`;
  }

  update(id: number, updatePhotoLocalDto: UpdatePhotoLocalDto) {
    return `This action updates a #${id} photoLocal`;
  }

  remove(id: number) {
    return `This action removes a #${id} photoLocal`;
  }
}
