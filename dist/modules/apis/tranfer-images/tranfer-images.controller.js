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
exports.TranferImagesController = void 0;
const common_1 = require("@nestjs/common");
const tranfer_images_service_1 = require("./tranfer-images.service");
const create_tranfer_image_dto_1 = require("./dto/create-tranfer-image.dto");
const update_tranfer_image_dto_1 = require("./dto/update-tranfer-image.dto");
const swagger_1 = require("@nestjs/swagger");
let TranferImagesController = class TranferImagesController {
    constructor(tranferImagesService) {
        this.tranferImagesService = tranferImagesService;
    }
    create(createTranferImageDto) {
        return this.tranferImagesService.create(createTranferImageDto);
    }
    findAll() {
        return this.tranferImagesService.findAll();
    }
    findOne(id) {
        return this.tranferImagesService.findOne(+id);
    }
    update(id, updateTranferImageDto) {
        return this.tranferImagesService.update(+id, updateTranferImageDto);
    }
    remove(id) {
        return this.tranferImagesService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tranfer_image_dto_1.CreateTranferImageDto]),
    __metadata("design:returntype", void 0)
], TranferImagesController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TranferImagesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TranferImagesController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tranfer_image_dto_1.UpdateTranferImageDto]),
    __metadata("design:returntype", void 0)
], TranferImagesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TranferImagesController.prototype, "remove", null);
TranferImagesController = __decorate([
    swagger_1.ApiTags("transfer-images"),
    common_1.Controller('transfer-images'),
    __metadata("design:paramtypes", [tranfer_images_service_1.TranferImagesService])
], TranferImagesController);
exports.TranferImagesController = TranferImagesController;
//# sourceMappingURL=tranfer-images.controller.js.map