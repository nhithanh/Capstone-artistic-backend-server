"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
let NotificationsService = class NotificationsService {
    create(createNotificationDto) {
        return this.notificationRespository.save(createNotificationDto);
    }
    async findAll(userId) {
        const notifications = await this.notificationRespository.find({
            where: {
                userId
            },
            take: 5,
            order: {
                createdAt: "DESC"
            }
        });
        const count = await this.notificationRespository.count({
            where: {
                userId,
                isReaded: false
            }
        });
        return {
            count,
            data: notifications
        };
    }
    removeAll(userId) {
        return this.notificationRespository.createQueryBuilder().update().set({ isReaded: true }).where(`user_id='${userId}'`).execute();
    }
};
__decorate([
    typeorm_1.InjectRepository(notification_entity_1.Notification),
    __metadata("design:type", typeorm_2.Repository)
], NotificationsService.prototype, "notificationRespository", void 0);
NotificationsService = __decorate([
    common_1.Injectable()
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map