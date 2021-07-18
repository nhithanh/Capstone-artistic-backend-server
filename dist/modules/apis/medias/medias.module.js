"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediasModule = void 0;
const common_1 = require("@nestjs/common");
const medias_service_1 = require("./medias.service");
const medias_controller_1 = require("./medias.controller");
const typeorm_1 = require("@nestjs/typeorm");
const media_entity_1 = require("./entities/media.entity");
const producer_module_1 = require("../../producer/producer.module");
const socket_module_1 = require("../../../gateway/socket.module");
const platform_express_1 = require("@nestjs/platform-express");
const s3_module_1 = require("../../../s3/s3.module");
const s3_service_1 = require("../../../s3/s3.service");
const multer_service_1 = require("../../../config/multer.service");
const user_entity_1 = require("../users/entities/user.entity");
const notifications_module_1 = require("../notifications/notifications.module");
const styles_module_1 = require("../styles/styles.module");
let MediasModule = class MediasModule {
};
MediasModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([media_entity_1.Media, user_entity_1.User]), producer_module_1.ProducerModule, notifications_module_1.NotificationsModule, styles_module_1.StylesModule, s3_module_1.S3Module, socket_module_1.SocketModule, platform_express_1.MulterModule.registerAsync({
                imports: [s3_module_1.S3Module],
                useFactory: async (s3Service) => multer_service_1.uploadImageToS3Option(s3Service.s3),
                inject: [s3_service_1.S3Service],
            })],
        controllers: [medias_controller_1.MediasController],
        providers: [medias_service_1.MediasService],
        exports: [medias_service_1.MediasService]
    })
], MediasModule);
exports.MediasModule = MediasModule;
//# sourceMappingURL=medias.module.js.map