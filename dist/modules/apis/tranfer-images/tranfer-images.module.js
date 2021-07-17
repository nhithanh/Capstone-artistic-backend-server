"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranferImagesModule = void 0;
const common_1 = require("@nestjs/common");
const tranfer_images_service_1 = require("./tranfer-images.service");
const tranfer_images_controller_1 = require("./tranfer-images.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tranfer_image_entity_1 = require("./entities/tranfer-image.entity");
let TranferImagesModule = class TranferImagesModule {
};
TranferImagesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([tranfer_image_entity_1.TranferImage])],
        controllers: [tranfer_images_controller_1.TranferImagesController],
        providers: [tranfer_images_service_1.TranferImagesService]
    })
], TranferImagesModule);
exports.TranferImagesModule = TranferImagesModule;
//# sourceMappingURL=tranfer-images.module.js.map