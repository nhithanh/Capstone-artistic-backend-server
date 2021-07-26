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
exports.ShowcasesController = void 0;
const common_1 = require("@nestjs/common");
const showcases_service_1 = require("./showcases.service");
const update_showcase_dto_1 = require("./dto/update-showcase.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../../../auths/jwt-auth.guard");
const typeorm_1 = require("@nestjs/typeorm");
const style_entity_1 = require("../styles/entities/style.entity");
const typeorm_2 = require("typeorm");
let ShowcasesController = class ShowcasesController {
    constructor(showcasesService) {
        this.showcasesService = showcasesService;
    }
    async create(photo, body) {
        const photoObject = await this.showcasesService.create({
            photoLocation: photo.location,
            photoName: body.showcaseName,
            styleId: body.styleId
        });
        return photoObject;
    }
    async findAll(styleId) {
        return await this.showcasesService.findAll(styleId);
    }
    async getAvailableStyles() {
        return this.showcasesService.getAvailableStyles();
    }
    async findOne(id) {
        return await this.showcasesService.findOne(id);
    }
    async update(id, updateShowcaseDto) {
        return this.showcasesService.update(id, updateShowcaseDto);
    }
    async remove(id) {
        return await this.showcasesService.remove(id);
    }
};
__decorate([
    typeorm_1.InjectRepository(style_entity_1.Style),
    __metadata("design:type", typeorm_2.Repository)
], ShowcasesController.prototype, "albumRepository", void 0);
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('photo')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShowcasesController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('styleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShowcasesController.prototype, "findAll", null);
__decorate([
    common_1.Get('available-styles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShowcasesController.prototype, "getAvailableStyles", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShowcasesController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_showcase_dto_1.UpdateShowcaseDto]),
    __metadata("design:returntype", Promise)
], ShowcasesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShowcasesController.prototype, "remove", null);
ShowcasesController = __decorate([
    common_1.Controller('showcases'),
    __metadata("design:paramtypes", [showcases_service_1.ShowcasesService])
], ShowcasesController);
exports.ShowcasesController = ShowcasesController;
//# sourceMappingURL=showcases.controller.js.map