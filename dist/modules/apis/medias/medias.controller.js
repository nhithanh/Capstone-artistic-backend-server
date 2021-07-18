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
exports.MediasController = void 0;
const common_1 = require("@nestjs/common");
const medias_service_1 = require("./medias.service");
const platform_express_1 = require("@nestjs/platform-express");
const producer_service_1 = require("../../producer/producer.service");
const transfer_media_metadata_dto_1 = require("./dto/transfer-media-metadata.dto");
const socket_service_1 = require("../../../gateway/socket.service");
const s3_service_1 = require("../../../s3/s3.service");
const swagger_1 = require("@nestjs/swagger");
const medias_query_1 = require("./dto/medias.query");
const jwt_auth_guard_1 = require("../../../auths/jwt-auth.guard");
const save_media_to_album_dto_1 = require("./dto/save-media-to-album.dto");
const media_entity_1 = require("./entities/media.entity");
const transfer_video_metadata_dto_1 = require("./dto/transfer-video-metadata.dto");
const upload_media_dto_1 = require("./dto/upload-media.dto");
const notifications_service_1 = require("../notifications/notifications.service");
const styles_service_1 = require("../styles/styles.service");
let MediasController = class MediasController {
    constructor() { }
    async transferPhoto(transferPhotoMetadata, req) {
        const payload = {
            accessURL: transferPhotoMetadata.photoLocation,
            styleId: transferPhotoMetadata.styleId,
            userId: req.user.id
        };
        const isSupport = await this.styleService.checkIsStyleSupport(payload.styleId);
        if (isSupport === true) {
            this.producerService.emitTransferPhotoTask(payload);
            return {
                status: common_1.HttpStatus.ACCEPTED,
                message: 'Your request is executing.'
            };
        }
        else {
            throw new common_1.HttpException({
                statusCode: 404,
                message: `This style is not supported now!`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async transferVideo(transferVideoMetadata, req) {
        const media = await this.mediasService.findOne(transferVideoMetadata.mediaId);
        if (media.type == media_entity_1.MEDIA_TYPE.VIDEO) {
            const payload = {
                videoLocation: this.s3Service.getCDNURL(media.storageLocation + "/original.mp4"),
                styleId: transferVideoMetadata.styleId,
                userId: req.user.id,
                saveAlbumId: transferVideoMetadata.albumId
            };
            this.producerService.emitTransferVideoTask(payload);
            console.log({ payload });
            return {
                payload,
                status: common_1.HttpStatus.ACCEPTED,
                message: 'Your request is executing.'
            };
        }
        else {
            return {
                message: "Media is not type video"
            };
        }
    }
    async transferVideoCompleted(metadata) {
        const rs = await Promise.all([
            this.mediasService.create({
                albumId: metadata.saveAlbumId,
                type: media_entity_1.MEDIA_TYPE.VIDEO,
                userId: metadata.userId,
                storageLocation: `https://artisan-photos.s3.ap-southeast-1.amazonaws.com/${metadata.saveLocation}`
            }),
            this.notficationsService.create({
                userId: metadata.userId,
                message: 'Transfer video completed!'
            })
        ]);
        this.socketService.emitTransferVideoCompleted(metadata.userId, metadata.saveAlbumId);
        return rs[0];
    }
    transferPhotoCompleted(transferPhotoCompleteMetadataDTO) {
        const accessURL = this.s3Service.getCDNURL(transferPhotoCompleteMetadataDTO.transferPhotoLocation);
        const payload = Object.assign({ action: 'TRANSFER_PHOTO_COMPLETED', accessURL }, transferPhotoCompleteMetadataDTO);
        console.log(payload);
        this.socketService.emitToSpecificUser(transferPhotoCompleteMetadataDTO.userId, payload);
        return {
            status: common_1.HttpStatus.OK,
            message: 'Your request is completed!'
        };
    }
    async uploadFile(req, media, body) {
        const albumId = body['albumId'];
        let storageLocation = media.location;
        const mediaObject = await this.mediasService.create({
            storageLocation: storageLocation,
            type: media_entity_1.MEDIA_TYPE.PHOTO,
            userId: req.user.id,
            albumId: albumId ? albumId : req.user.defaultAlbumId
        });
        const payload = Object.assign(Object.assign({ action: 'UPLOAD_IMAGE_SUCCESS' }, mediaObject), { accessURL: this.s3Service.getCDNURL(mediaObject.storageLocation) });
        this.socketService.emitToSpecificUser(req.user.id, payload);
        return payload;
    }
    async savePhotoToAlbum(req, saveToAlbumDto) {
        const photoName = new Date().toString();
        const key = `${req.user.id}/${photoName}`;
        await this.s3Service.copyPhotoToPermanentBucket(saveToAlbumDto.photoLocation, key);
        const photoObject = await this.mediasService.create({
            storageLocation: saveToAlbumDto.photoLocation,
            userId: req.user.id,
            albumId: saveToAlbumDto.albumId,
            type: media_entity_1.MEDIA_TYPE.PHOTO
        });
        return photoObject;
    }
    findAll(queryParams) {
        return this.mediasService.findAll(queryParams);
    }
    findOne(id) {
        return this.mediasService.findOne(id);
    }
    remove(req, id) {
        return this.mediasService.remove(req.user, id);
    }
    changeMediaAlbum(req, id, updateMediaDTO) {
        return this.mediasService.movePhotoToAnotherAlbum(id, req.user, updateMediaDTO);
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", s3_service_1.S3Service)
], MediasController.prototype, "s3Service", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", notifications_service_1.NotificationsService)
], MediasController.prototype, "notficationsService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", socket_service_1.SocketService)
], MediasController.prototype, "socketService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", producer_service_1.ProducerService)
], MediasController.prototype, "producerService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", medias_service_1.MediasService)
], MediasController.prototype, "mediasService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", styles_service_1.StylesService)
], MediasController.prototype, "styleService", void 0);
__decorate([
    common_1.Post('/transfer-photo'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transfer_media_metadata_dto_1.TransferMediaMetadataDTO, Object]),
    __metadata("design:returntype", Promise)
], MediasController.prototype, "transferPhoto", null);
__decorate([
    common_1.Post('/transfer-video'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transfer_video_metadata_dto_1.TransferVideoMetadataDto, Object]),
    __metadata("design:returntype", Promise)
], MediasController.prototype, "transferVideo", null);
__decorate([
    common_1.Post('/transfer-video/completed'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transfer_video_metadata_dto_1.TransferVideoCompleteMetadata]),
    __metadata("design:returntype", Promise)
], MediasController.prototype, "transferVideoCompleted", null);
__decorate([
    common_1.Post('/transfer-photo/completed'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transfer_media_metadata_dto_1.TransferMediaCompleteMetadatadDTO]),
    __metadata("design:returntype", void 0)
], MediasController.prototype, "transferPhotoCompleted", null);
__decorate([
    common_1.Post('upload'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('media')),
    __param(0, common_1.Req()), __param(1, common_1.UploadedFile()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MediasController.prototype, "uploadFile", null);
__decorate([
    common_1.Post('save-to-album'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, save_media_to_album_dto_1.SaveMediaToAlbumDto]),
    __metadata("design:returntype", Promise)
], MediasController.prototype, "savePhotoToAlbum", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [medias_query_1.MediasQueryParams]),
    __metadata("design:returntype", void 0)
], MediasController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediasController.prototype, "findOne", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MediasController.prototype, "remove", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, upload_media_dto_1.UpdateMediaDTO]),
    __metadata("design:returntype", void 0)
], MediasController.prototype, "changeMediaAlbum", null);
MediasController = __decorate([
    swagger_1.ApiTags("medias"),
    common_1.Controller('medias'),
    __metadata("design:paramtypes", [])
], MediasController);
exports.MediasController = MediasController;
//# sourceMappingURL=medias.controller.js.map