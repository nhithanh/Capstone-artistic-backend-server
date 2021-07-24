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
exports.TrainingRequestsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const producer_service_1 = require("../../producer/producer.service");
const s3_service_1 = require("../../../s3/s3.service");
const training_requests_service_1 = require("./training-requests.service");
let TrainingRequestsController = class TrainingRequestsController {
    constructor(trainingRequestsService) {
        this.trainingRequestsService = trainingRequestsService;
    }
    async create(data, photo) {
        const name = data['name'];
        const contentWeight = data['contentWeight'] || 1e5;
        const styleWeight = data['styleWeight'] || 1e10;
        const lr = +data['lr'] || 1e-3;
        const relu12Weight = +data['relu12Weight'] || 0;
        const relu22Weight = +data['relu22Weight'] || 0;
        const relu33Weight = +data['relu33Weight'] || 0;
        const relu43Weight = +data['relu43Weight'] || 0;
        const saveStep = +data['saveStep'] || 1000;
        const numOfIterations = +data['numOfIterations'] || 20000;
        const description = data['description'] || '';
        const trainingReqest = await this.trainingRequestsService.create({
            name,
            referenceStyleLocation: photo.location,
            contentWeight,
            lr,
            relu12Weight,
            relu22Weight,
            relu33Weight,
            relu43Weight,
            saveStep,
            styleWeight,
            numOfIterations,
            description
        });
        const payload = {
            id: trainingReqest.id,
            accessURL: this.s3Service.getCDNURL(photo.location),
            contentWeight: +contentWeight,
            lr: +lr,
            numOfIterations: +numOfIterations,
            relu12Weight: +relu12Weight,
            relu22Weight: +relu22Weight,
            relu33Weight: +relu33Weight,
            relu43Weight: +relu43Weight,
            saveStep: +saveStep,
            styleWeight: +styleWeight
        };
        this.producerService.emitTrainingRequest(payload);
        return payload;
    }
    findAll() {
        return this.trainingRequestsService.findAll();
    }
    findOne(id) {
        return this.trainingRequestsService.findOne(id);
    }
    stop(id) {
        return this.trainingRequestsService.stopTrainingRequest(id);
    }
    start(id) {
        return this.trainingRequestsService.startTrainingRequest(id);
    }
    completed(id) {
        return this.trainingRequestsService.completeTrainingReuest(id);
    }
    remove(id) {
        return this.trainingRequestsService.remove(id);
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", producer_service_1.ProducerService)
], TrainingRequestsController.prototype, "producerService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", s3_service_1.S3Service)
], TrainingRequestsController.prototype, "s3Service", void 0);
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('photo')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TrainingRequestsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainingRequestsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingRequestsController.prototype, "findOne", null);
__decorate([
    common_1.Get(':id/stop'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingRequestsController.prototype, "stop", null);
__decorate([
    common_1.Get(':id/start'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingRequestsController.prototype, "start", null);
__decorate([
    common_1.Get(':id/completed'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingRequestsController.prototype, "completed", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrainingRequestsController.prototype, "remove", null);
TrainingRequestsController = __decorate([
    common_1.Controller('training-requests'),
    __metadata("design:paramtypes", [training_requests_service_1.TrainingRequestsService])
], TrainingRequestsController);
exports.TrainingRequestsController = TrainingRequestsController;
//# sourceMappingURL=training-requests.controller.js.map