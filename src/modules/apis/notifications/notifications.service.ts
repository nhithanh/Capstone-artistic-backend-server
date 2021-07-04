import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity'

@Injectable()
export class NotificationsService {

  @InjectRepository(Notification)
  private readonly notificationRespository: Repository<Notification>;

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationRespository.save(createNotificationDto)
  }

  async findAll(userId: string) {
    const [notifications, count] = await this.notificationRespository.findAndCount({
      where: {
        userId
      }
    })
    return {
      count,
      data: notifications
    }
  }

  removeAll(userId: string) {
    return this.notificationRespository.delete({
      userId
    })
  }
}
