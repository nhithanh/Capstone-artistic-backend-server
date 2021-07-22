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
exports.AlbumsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../../../auths/jwt-auth.guard");
const s3_service_1 = require("../../../s3/s3.service");
const albums_service_1 = require("./albums.service");
const create_album_dto_1 = require("./dto/create-album.dto");
const update_album_dto_1 = require("./dto/update-album.dto");
let AlbumsController = class AlbumsController {
    constructor(albumsService) {
        this.albumsService = albumsService;
    }
    async create(req, createAlbumDto) {
        return await this.albumsService.createNewAlbum(createAlbumDto, req.user);
    }
    async findAll(req) {
        return await this.albumsService.findAll(req.user);
    }
    async findOne(id) {
        return await this.albumsService.findOne(id);
    }
    async update(id, updateAlbumDto, req) {
        return await this.albumsService.update(id, req.user, updateAlbumDto);
    }
    async updateBackgroundWithFileUpload(id, req, photo, body) {
        return this.albumsService.update(id, req.user, {
            thumbnailURL: photo.location
        });
    }
    async remove(id, req) {
        return await this.albumsService.remove(id, req.user);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_album_dto_1.CreateAlbumDto]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_album_dto_1.UpdateAlbumDto, Object]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "update", null);
__decorate([
    common_1.Put(':id/update-background-with-upload'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('photo')),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()), __param(2, common_1.UploadedFile()), __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "updateBackgroundWithFileUpload", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "remove", null);
AlbumsController = __decorate([
    common_1.Controller('albums'),
    __metadata("design:paramtypes", [albums_service_1.AlbumsService])
], AlbumsController);
exports.AlbumsController = AlbumsController;
//# sourceMappingURL=albums.controller.js.map