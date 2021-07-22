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
exports.StylesController = void 0;
const common_1 = require("@nestjs/common");
const styles_service_1 = require("./styles.service");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const snapshot_service_1 = require("../snapshots/snapshot.service");
const s3_service_1 = require("../../../s3/s3.service");
let StylesController = class StylesController {
    async create(styleIcon, body) {
        const styleName = body['styleName'];
        return await this.stylesService.create({
            iconURL: styleIcon.location,
            styleName,
            routingKey: styleName.toLowerCase().split(" ").join("_"),
            description: ''
        });
    }
    findAll() {
        return this.stylesService.findAll();
    }
    getAllStylesWithSnapshots() {
        return this.stylesService.getAllStylesWithSnapshotPath();
    }
    getAllStyles() {
        return this.stylesService.getAllStyles();
    }
    getVideoSupportStyles() {
        return this.stylesService.findAllVideoSupportedStyles();
    }
    findOne(id) {
        return this.stylesService.findOne(id);
    }
    getStyleSnapshots(id) {
        return this.stylesService.findStyleSnapshots(id);
    }
    async getStyleActiveModelDetail(id) {
        const style = await this.stylesService.findOne(id);
        const snapshot = await this.snapshotsService.findOne(style.activeSnapshotId);
        return Object.assign(Object.assign({}, style), { snapshotPath: this.s3Service.getCDNURL(snapshot.location) });
    }
    async updateWithFile(styleIcon, body, id) {
        const styleName = body['styleName'];
        const description = body['descriptiopn'] || '';
        return await this.stylesService.update(id, {
            iconURL: styleIcon.location,
            styleName,
            routingKey: styleName.toLowerCase().split(" ").join("_"),
            description
        });
    }
    async update(styleIcon, body, id) {
        const styleName = body['styleName'];
        const description = body['descriptiopn'] || '';
        const activeSnapshotId = body['activeSnapshotId'];
        const isActive = body['isActive'];
        return await this.stylesService.update(id, {
            styleName,
            activeSnapshotId,
            routingKey: styleName.toLowerCase().split(" ").join("_"),
            description,
            isActive
        });
    }
    remove(id) {
        return this.stylesService.remove(id);
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", styles_service_1.StylesService)
], StylesController.prototype, "stylesService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", snapshot_service_1.SnapshotsService)
], StylesController.prototype, "snapshotsService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", s3_service_1.S3Service)
], StylesController.prototype, "s3Service", void 0);
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('icon')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StylesController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "findAll", null);
__decorate([
    common_1.Get('/all-snapshots'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "getAllStylesWithSnapshots", null);
__decorate([
    common_1.Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "getAllStyles", null);
__decorate([
    common_1.Get('/video-transfer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "getVideoSupportStyles", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "findOne", null);
__decorate([
    common_1.Get(':id/snapshots'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "getStyleSnapshots", null);
__decorate([
    common_1.Get(':id/active-model'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StylesController.prototype, "getStyleActiveModelDetail", null);
__decorate([
    common_1.Put(':id/upload-file'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('icon')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StylesController.prototype, "updateWithFile", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StylesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "remove", null);
StylesController = __decorate([
    swagger_1.ApiTags("styles"),
    common_1.Controller('styles')
], StylesController);
exports.StylesController = StylesController;
//# sourceMappingURL=styles.controller.js.map