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
exports.SnapshotsController = void 0;
const common_1 = require("@nestjs/common");
const snapshot_service_1 = require("./snapshot.service");
const update_snapshot_dto_1 = require("./dto/update-snapshot.dto");
const snapshot_query_params_1 = require("./dto/snapshot-query.params");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
let SnapshotsController = class SnapshotsController {
    constructor(snapshotsService) {
        this.snapshotsService = snapshotsService;
    }
    create(snapshotFile, body) {
        const snapshotName = body['snapshotName'];
        const styleId = body['styleId'];
        const description = body['description'];
        return this.snapshotsService.create({
            name: snapshotName,
            location: snapshotFile.location,
            styleId,
            description
        });
    }
    findAll(queryParams) {
        return this.snapshotsService.findAll(queryParams);
    }
    findOne(id) {
        return this.snapshotsService.findOne(id);
    }
    update(id, updateSnapshotDTO) {
        return this.snapshotsService.update(+id, updateSnapshotDTO);
    }
    remove(id) {
        return this.snapshotsService.remove(id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('snapshot')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SnapshotsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [snapshot_query_params_1.SnapshotQueryParams]),
    __metadata("design:returntype", void 0)
], SnapshotsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SnapshotsController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_snapshot_dto_1.UpdateSnapshotDTO]),
    __metadata("design:returntype", void 0)
], SnapshotsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SnapshotsController.prototype, "remove", null);
SnapshotsController = __decorate([
    swagger_1.ApiTags("snapshots"),
    common_1.Controller('snapshots'),
    __metadata("design:paramtypes", [snapshot_service_1.SnapshotsService])
], SnapshotsController);
exports.SnapshotsController = SnapshotsController;
//# sourceMappingURL=snapshot.controller.js.map