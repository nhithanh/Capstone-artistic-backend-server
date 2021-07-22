import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
export declare class NotificationsService {
    private readonly notificationRespository;
    create(createNotificationDto: CreateNotificationDto): Promise<CreateNotificationDto & Notification>;
    findAll(userId: string): Promise<{
        count: number;
        data: Notification[];
    }>;
    removeAll(userId: string): Promise<import("typeorm").UpdateResult>;
}
