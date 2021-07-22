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
const path_1 = require("path");
const multer_1 = require("multer");
let VideosModule = class VideosModule {
};
VideosModule = __decorate([
    common_1.Module({
        imports: [s3_module_1.S3Module, medias_module_1.MediasModule, platform_express_1.MulterModule.register({
                storage: multer_1.diskStorage({
                    destination: './upload-video',
                    filename: (req, file, cb) => {
                        cb(null, `${file.originalname}${path_1.extname(file.originalname)}`);
                    }
                }),
                fileFilter: (req, file, cb) => {
                    if (file.mimetype.match(/\/(mp4)$/)) {
                        cb(null, true);
                    }
                    else {
                        cb(new common_1.HttpException({
                            status: 400,
                            message: `Unsupported file type ${path_1.extname(file.originalname)}`
                        }, common_1.HttpStatus.BAD_REQUEST), false);
                    }
                },
            })],
        controllers: [videos_controller_1.VideosController]
    })
], VideosModule);
exports.VideosModule = VideosModule;
//# sourceMappingURL=videos.module.js.map