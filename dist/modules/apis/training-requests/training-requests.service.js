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
exports.TrainingRequestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const socket_service_1 = require("../../../gateway/socket.service");
const s3_service_1 = require("../../../s3/s3.service");
const typeorm_2 = require("typeorm");
const training_request_entity_1 = require("./entities/training-request.entity");
let TrainingRequestsService = class TrainingRequestsService {
    create(createTrainingRequestDto) {
        const newTrainingRequest = this.trainingRequestRepository.create(Object.assign(Object.assign({}, createTrainingRequestDto), { status: training_request_entity_1.STATUS.WAITING }));
        return this.trainingRequestRepository.save(newTrainingRequest);
    }
    async findAll() {
        const trainingRequests = await this.trainingRequestRepository.find({
            order: { createdAt: 'DESC' }
        });
        return trainingRequests.map(request => {
            return Object.assign(Object.assign({}, request), { accessURL: this.s3Service.getCDNURL(request.referenceStyleLocation) });
        });
    }
    async findOne(id) {
        const data = await this.trainingRequestRepository.findOne(id);
        if (data) {
            return Object.assign(Object.assign({}, data), { styleAccessURL: this.s3Service.getCDNURL(data.referenceStyleLocation) });
        }
        return {
            id,
            status: "DELETED"
        };
    }
    async stopTrainingRequest(id) {
        const trainingRequest = await this.trainingRequestRepository.findOne(id);
        this.socketService.emitStopTraining();
        return this.trainingRequestRepository.save(Object.assign(Object.assign({}, trainingRequest), { status: training_request_entity_1.STATUS.STOPPED }));
    }
    async startTrainingRequest(id) {
        const trainingRequest = await this.trainingRequestRepository.findOne(id);
        const updatedTrainingRequest = await this.trainingRequestRepository.save(Object.assign(Object.assign({}, trainingRequest), { status: training_request_entity_1.STATUS.IN_PROGRESS }));
        this.socketService.emitUpdateTrainingRequestToAdmin(updatedTrainingRequest);
    }
    async completeTrainingReuest(id) {
        const trainingRequest = await this.trainingRequestRepository.findOne(id);
        const updatedTrainingRequest = await this.trainingRequestRepository.save(Object.assign(Object.assign({}, trainingRequest), { status: training_request_entity_1.STATUS.COMPLETED }));
        this.socketService.emitUpdateTrainingRequestToAdmin(updatedTrainingRequest);
    }
    remove(id) {
        return this.trainingRequestRepository.update({
            id
        }, {
            deletedAt: new Date(),
            status: training_request_entity_1.STATUS.DELETED
        });
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", socket_service_1.SocketService)
], TrainingRequestsService.prototype, "socketService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", s3_service_1.S3Service)
], TrainingRequestsService.prototype, "s3Service", void 0);
__decorate([
    typeorm_1.InjectRepository(training_request_entity_1.TrainingRequest),
    __metadata("design:type", typeorm_2.Repository)
], TrainingRequestsService.prototype, "trainingRequestRepository", void 0);
TrainingRequestsService = __decorate([
    common_1.Injectable()
], TrainingRequestsService);
exports.TrainingRequestsService = TrainingRequestsService;
//# sourceMappingURL=training-requests.service.js.map