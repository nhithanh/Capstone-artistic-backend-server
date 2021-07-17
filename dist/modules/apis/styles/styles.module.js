"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylesModule = void 0;
const common_1 = require("@nestjs/common");
const styles_service_1 = require("./styles.service");
const styles_controller_1 = require("./styles.controller");
const style_entity_1 = require("./entities/style.entity");
const typeorm_1 = require("@nestjs/typeorm");
const platform_express_1 = require("@nestjs/platform-express");
const s3_module_1 = require("../../../s3/s3.module");
const multer_service_1 = require("../../../config/multer.service");
const s3_service_1 = require("../../../s3/s3.service");
const snapshot_entity_1 = require("../snapshots/entities/snapshot.entity");
const snapshot_module_1 = require("../snapshots/snapshot.module");
let StylesModule = class StylesModule {
};
StylesModule = __decorate([
    common_1.Module({
        imports: [snapshot_module_1.SnapshotsModule, typeorm_1.TypeOrmModule.forFeature([style_entity_1.Style, snapshot_entity_1.Snapshot]), s3_module_1.S3Module, platform_express_1.MulterModule.registerAsync({
                imports: [s3_module_1.S3Module],
                useFactory: async (s3Service) => multer_service_1.uploadImageToS3OptionAdmin(s3Service.s3),
                inject: [s3_service_1.S3Service],
            })],
        controllers: [styles_controller_1.StylesController],
        providers: [styles_service_1.StylesService]
    })
], StylesModule);
exports.StylesModule = StylesModule;
//# sourceMappingURL=styles.module.js.map