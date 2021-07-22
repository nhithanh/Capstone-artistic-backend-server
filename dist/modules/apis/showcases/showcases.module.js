"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowcasesModule = void 0;
const common_1 = require("@nestjs/common");
const showcases_service_1 = require("./showcases.service");
const showcases_controller_1 = require("./showcases.controller");
const typeorm_1 = require("@nestjs/typeorm");
const showcase_entity_1 = require("./entities/showcase.entity");
const s3_module_1 = require("../../../s3/s3.module");
const platform_express_1 = require("@nestjs/platform-express");
const s3_service_1 = require("../../../s3/s3.service");
const multer_service_1 = require("../../../config/multer.service");
const style_entity_1 = require("../styles/entities/style.entity");
let ShowcasesModule = class ShowcasesModule {
};
ShowcasesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([showcase_entity_1.Showcase, style_entity_1.Style]), s3_module_1.S3Module, platform_express_1.MulterModule.registerAsync({
                imports: [s3_module_1.S3Module],
                useFactory: async (s3Service) => multer_service_1.uploadImageToS3OptionAdmin(s3Service.s3),
                inject: [s3_service_1.S3Service],
            })],
        controllers: [showcases_controller_1.ShowcasesController],
        providers: [showcases_service_1.ShowcasesService]
    })
], ShowcasesModule);
exports.ShowcasesModule = ShowcasesModule;
//# sourceMappingURL=showcases.module.js.map