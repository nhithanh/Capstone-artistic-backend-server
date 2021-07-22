"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingRequestsModule = void 0;
const common_1 = require("@nestjs/common");
const training_requests_service_1 = require("./training-requests.service");
const training_requests_controller_1 = require("./training-requests.controller");
const typeorm_1 = require("@nestjs/typeorm");
const training_request_entity_1 = require("./entities/training-request.entity");
const producer_module_1 = require("../../producer/producer.module");
const s3_module_1 = require("../../../s3/s3.module");
const s3_service_1 = require("../../../s3/s3.service");
const multer_service_1 = require("../../../config/multer.service");
const platform_express_1 = require("@nestjs/platform-express");
let TrainingRequestsModule = class TrainingRequestsModule {
};
TrainingRequestsModule = __decorate([
    common_1.Module({
        imports: [producer_module_1.ProducerModule, s3_module_1.S3Module, typeorm_1.TypeOrmModule.forFeature([training_request_entity_1.TrainingRequest]), platform_express_1.MulterModule.registerAsync({
                imports: [s3_module_1.S3Module],
                useFactory: async (s3Service) => multer_service_1.uploadTrainingsOption(s3Service.s3),
                inject: [s3_service_1.S3Service],
            })],
        controllers: [training_requests_controller_1.TrainingRequestsController],
        providers: [training_requests_service_1.TrainingRequestsService]
    })
], TrainingRequestsModule);
exports.TrainingRequestsModule = TrainingRequestsModule;
//# sourceMappingURL=training-requests.module.js.map