"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosModule = void 0;
const common_1 = require("@nestjs/common");
const videos_controller_1 = require("./videos.controller");
const s3_module_1 = require("../../../s3/s3.module");
const medias_module_1 = require("../medias/medias.module");
const platform_express_1 = require("@nestjs/platform-express");
const s3_service_1 = require("../../../s3/s3.service");
const multer_service_1 = require("../../../config/multer.service");
const producer_module_1 = require("../../producer/producer.module");
const notifications_module_1 = require("../notifications/notifications.module");
const socket_module_1 = require("../../../gateway/socket.module");
let VideosModule = class VideosModule {
};
VideosModule = __decorate([
    common_1.Module({
        imports: [s3_module_1.S3Module, medias_module_1.MediasModule, producer_module_1.ProducerModule, notifications_module_1.NotificationsModule, socket_module_1.SocketModule, platform_express_1.MulterModule.registerAsync({
                imports: [s3_module_1.S3Module],
                useFactory: async (s3Service) => multer_service_1.uploadVideoOption(s3Service.s3),
                inject: [s3_service_1.S3Service],
            })],
        controllers: [videos_controller_1.VideosController]
    })
], VideosModule);
exports.VideosModule = VideosModule;
//# sourceMappingURL=videos.module.js.map