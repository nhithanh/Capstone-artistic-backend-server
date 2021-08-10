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
    const notifications = await this.notificationRespository.find({
      where: {
        userId
      },
      take:5,
      order: {
        createdAt: "DESC"
      }
    })
    const count = await this.notificationRespository.count({
      where: {
        userId,
        isReaded: false
      }
    })
    
    return {
      count,
      data: notifications
    }
  }

  removeAll(userId: string) {
    return this.notificationRespository.createQueryBuilder().update().set({isReaded: true}).where(`user_id='${userId}'`).execute()
  }
}
