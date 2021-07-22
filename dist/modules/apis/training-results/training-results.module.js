"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingResultsModule = void 0;
const common_1 = require("@nestjs/common");
const training_results_service_1 = require("./training-results.service");
const training_results_controller_1 = require("./training-results.controller");
const typeorm_1 = require("@nestjs/typeorm");
const training_result_entity_1 = require("./entities/training-result.entity");
const s3_module_1 = require("../../../s3/s3.module");
const training_request_entity_1 = require("../training-requests/entities/training-request.entity");
let TrainingResultsModule = class TrainingResultsModule {
};
TrainingResultsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([training_result_entity_1.TrainingResult, training_request_entity_1.TrainingRequest]), s3_module_1.S3Module],
        controllers: [training_results_controller_1.TrainingResultsController],
        providers: [training_results_service_1.TrainingResultsService]
    })
], TrainingResultsModule);
exports.TrainingResultsModule = TrainingResultsModule;
//# sourceMappingURL=training-results.module.js.map