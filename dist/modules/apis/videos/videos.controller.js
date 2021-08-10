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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auths/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const medias_service_1 = require("../medias/medias.service");
const s3_service_1 = require("../../../s3/s3.service");
const media_entity_1 = require("../medias/entities/media.entity");
const producer_service_1 = require("../../producer/producer.service");
const notifications_service_1 = require("../notifications/notifications.service");
const socket_service_1 = require("../../../gateway/socket.service");
const moment = require("moment");
let VideosController = class VideosController {
    constructor() {
        this.S3_ABSOLUTE_PATH = 'https://artisan-photos.s3.ap-southeast-1.amazonaws.com';
    }
    async uploadVideo(media, req, body) {
        const albumId = body['albumId'];
        const newVideo = await this.mediasService.create({
            storageLocation: `${this.S3_ABSOLUTE_PATH}/${req.folderName}`,
            type: media_entity_1.MEDIA_TYPE.VIDEO,
            userId: req.user.id,
            albumId: albumId ? albumId : req.user.defaultAlbumId
        });
        this.producerService.emitConvertVideoTask({
            videoLocation: this.s3Service.getCDNURL(newVideo.storageLocation + '/original.mp4'),
            saveFolder: req.folderName
        });
        return Object.assign(Object.assign({}, newVideo), { thumbnailURL: this.s3Service.getCDNURL(newVideo.storageLocation + "/thumbnail.png"), originalVideoURL: this.s3Service.getCDNURL(newVideo.storageLocation + "/original.mp4"), playlist: this.s3Service.getCDNURL(newVideo.storageLocation + "/playlist.m3u8") });
    }
    async handleTransferVideoComplete(media, req, body) {
        const saveAlbumId = body['saveAlbumId'];
        const userId = body['userId'];
        const rs = await Promise.all([
            this.mediasService.create({
                albumId: saveAlbumId,
                type: media_entity_1.MEDIA_TYPE.VIDEO,
                userId: userId,
                storageLocation: `${this.S3_ABSOLUTE_PATH}/${req.folderName}`,
            }),
            this.notificationsService.create({
                userId: userId,
                message: `Video transfered completed at ${moment().format('MMMM Do YYYY, h:mm:ss a')}!`
            })
        ]);
        console.log({ message: `Video transfered completed at ${moment().format('MMMM Do YYYY, h:mm:ss a')}!` });
        this.producerService.emitConvertVideoTask({
            videoLocation: this.s3Service.getCDNURL(rs[0].storageLocation + '/original.mp4'),
            saveFolder: req.folderName
        });
        console.log(rs[0]);
        this.socketsService.emitTransferVideoCompleted(userId, saveAlbumId, Object.assign(Object.assign({}, rs[0]), { thumbnailURL: this.s3Service.getCDNURL(rs[0].storageLocation + "/thumbnail.png"), originalVideoURL: this.s3Service.getCDNURL(rs[0].storageLocation + "/original.mp4"), playlist: this.s3Service.getCDNURL(rs[0].storageLocation + "/playlist.m3u8") }));
        return rs[0];
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", medias_service_1.MediasService)
], VideosController.prototype, "mediasService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", s3_service_1.S3Service)
], VideosController.prototype, "s3Service", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", producer_service_1.ProducerService)
], VideosController.prototype, "producerService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", notifications_service_1.NotificationsService)
], VideosController.prototype, "notificationsService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", socket_service_1.SocketService)
], VideosController.prototype, "socketsService", void 0);
__decorate([
    common_1.Post('/upload'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('media')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Req()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "uploadVideo", null);
__decorate([
    common_1.Post('/transfer-video/completed'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('media')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Req()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "handleTransferVideoComplete", null);
VideosController = __decorate([
    common_1.Controller('videos'),
    __metadata("design:paramtypes", [])
], VideosController);
exports.VideosController = VideosController;
//# sourceMappingURL=videos.controller.js.map