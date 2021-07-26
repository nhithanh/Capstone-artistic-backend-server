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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingResultsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const socket_service_1 = require("../../../gateway/socket.service");
const s3_service_1 = require("../../../s3/s3.service");
const typeorm_2 = require("typeorm");
const training_request_entity_1 = require("../training-requests/entities/training-request.entity");
const training_result_entity_1 = require("./entities/training-result.entity");
let TrainingResultsService = class TrainingResultsService {
    async create(createTrainingResultDto) {
        const trainingRequest = await this.trainingRequestReposiory.findOne(createTrainingResultDto.trainingRequestId);
        const updateTrainingRequest = Object.assign(Object.assign({}, trainingRequest), { checkpoint: +createTrainingResultDto.step });
        this.trainingRequestReposiory.save(updateTrainingRequest).then(() => {
            this.socketService.emitUpdateTrainingRequestToAdmin(updateTrainingRequest);
        });
        const newTrainingResult = this.trainingResultRepository.create(Object.assign(Object.assign({}, createTrainingResultDto), { resultPhotoLocation: `https://artisan-photos.s3.amazonaws.com/${createTrainingResultDto.resultPhotoLocation}`, snapshotLocation: `https://artisan-photos.s3.amazonaws.com/${createTrainingResultDto.snapshotLocation}`, step: +createTrainingResultDto.step }));
        return this.trainingResultRepository.save(newTrainingResult);
    }
    async findAll(id) {
        const trainingResults = await this.trainingResultRepository.find({
            where: {
                trainingRequestId: id
            }
        });
        return trainingResults.map(trainingResult => {
            return Object.assign(Object.assign({}, trainingResult), { photoAccessURL: this.s3Service.getCDNURL(trainingResult.resultPhotoLocation), snapshotAccessURL: this.s3Service.getCDNURL(trainingResult.snapshotLocation) });
        });
    }
    findOne(id) {
        return `This action returns a #${id} trainingResult`;
    }
    update(id, updateTrainingResultDto) {
        return `This action updates a #${id} trainingResult`;
    }
    remove(id) {
        return `This action removes a #${id} trainingResult`;
    }
    async getTrainingResultByTrainingRequestId(id) {
        const data = await this.trainingResultRepository.find({
            where: {
                trainingRequestId: id
            }
        });
        return data.map(item => {
            return Object.assign(Object.assign({}, item), { photoAccessURL: this.s3Service.getCDNURL(item.resultPhotoLocation), snapshotAccessURL: this.s3Service.getCDNURL(item.snapshotLocation) });
        });
    }
};
__decorate([
    typeorm_1.InjectRepository(training_result_entity_1.TrainingResult),
    __metadata("design:type", typeorm_2.Repository)
], TrainingResultsService.prototype, "trainingResultRepository", void 0);
__decorate([
    typeorm_1.InjectRepository(training_request_entity_1.TrainingRequest),
    __metadata("design:type", typeorm_2.Repository)
], TrainingResultsService.prototype, "trainingRequestReposiory", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", s3_service_1.S3Service)
], TrainingResultsService.prototype, "s3Service", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", socket_service_1.SocketService)
], TrainingResultsService.prototype, "socketService", void 0);
TrainingResultsService = __decorate([
    common_1.Injectable()
], TrainingResultsService);
exports.TrainingResultsService = TrainingResultsService;
//# sourceMappingURL=training-results.service.js.map