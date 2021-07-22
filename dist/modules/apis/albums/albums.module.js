"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsModule = void 0;
const common_1 = require("@nestjs/common");
const albums_service_1 = require("./albums.service");
const albums_controller_1 = require("./albums.controller");
const typeorm_1 = require("@nestjs/typeorm");
const album_entity_1 = require("./entities/album.entity");
const medias_module_1 = require("../medias/medias.module");
const s3_module_1 = require("../../../s3/s3.module");
const platform_express_1 = require("@nestjs/platform-express");
const s3_service_1 = require("../../../s3/s3.service");
const multer_service_1 = require("../../../config/multer.service");
let AlbumsModule = class AlbumsModule {
};
AlbumsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([album_entity_1.Album]), medias_module_1.MediasModule, s3_module_1.S3Module, platform_express_1.MulterModule.registerAsync({
                imports: [s3_module_1.S3Module],
                useFactory: async (s3Service) => multer_service_1.uploadImageToS3Option(s3Service.s3),
                inject: [s3_service_1.S3Service],
            })],
        controllers: [albums_controller_1.AlbumsController],
        providers: [albums_service_1.AlbumsService],
        exports: [albums_service_1.AlbumsService]
    })
], AlbumsModule);
exports.AlbumsModule = AlbumsModule;
//# sourceMappingURL=albums.module.js.map