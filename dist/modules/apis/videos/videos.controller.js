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
const fs = require("fs");
const util = require("util");
const rimraf = require("rimraf");
const media_entity_1 = require("../medias/entities/media.entity");
const mkdir = util.promisify(fs.mkdir);
const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(fs.unlink);
const rimrafAsync = util.promisify(rimraf);
let VideosController = class VideosController {
    constructor() {
        this.S3_ABSOLUTE_PATH = 'https://artisan-photos.s3.ap-southeast-1.amazonaws.com';
    }
    async uploadVideo(file, req, body) {
        console.log(file.path);
        const albumId = body['albumId'];
        const ts = new Date().getTime().toString();
        await mkdir(`process-video/${ts}`);
        const uploadFolder = `${req.user.id}/${ts}`;
        const result = await Promise.all([
            this.mediasService.create({
                storageLocation: `${this.S3_ABSOLUTE_PATH}/${uploadFolder}`,
                type: media_entity_1.MEDIA_TYPE.VIDEO,
                userId: req.user.id,
                albumId: albumId ? albumId : req.user.defaultAlbumId
            }),
            this.s3Service.uploadFile(file.path, 'artisan-photos', `${uploadFolder}/original.mp4`),
            exec(`bash ./scripts/generate_thumbnail.sh ${file.path} ./process-video/${ts}/thumbnail.png`),
        ]);
        await Promise.all([
            this.s3Service.uploadFolder(`./process-video/${ts}`, uploadFolder),
            rimrafAsync(`./process-video/${ts}`),
            unlink(file.path),
        ]);
        const media = result[0];
        return Object.assign(Object.assign({}, media), { thumbnailURL: this.s3Service.getCDNURL(media.storageLocation + "/thumbnail.png"), originalVideoURL: this.s3Service.getCDNURL(media.storageLocation + "/original.mp4"), m3u8_720p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/720p.m3u8"), m3u8_480p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/480p.m3u8"), m3u8_360p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/360p.m3u8") });
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
    common_1.Post('/upload'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('media')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Req()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "uploadVideo", null);
VideosController = __decorate([
    common_1.Controller('videos'),
    __metadata("design:paramtypes", [])
], VideosController);
exports.VideosController = VideosController;
//# sourceMappingURL=videos.controller.js.map