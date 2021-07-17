import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(req: any): Promise<{
        count: number;
        data: import("./entities/notification.entity").Notification[];
    }>;
    remove(req: any): Promise<import("typeorm").UpdateResult>;
}
