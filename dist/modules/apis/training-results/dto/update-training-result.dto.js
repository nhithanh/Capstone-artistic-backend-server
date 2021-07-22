"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrainingResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_training_result_dto_1 = require("./create-training-result.dto");
class UpdateTrainingResultDto extends swagger_1.PartialType(create_training_result_dto_1.CreateTrainingResultDto) {
}
exports.UpdateTrainingResultDto = UpdateTrainingResultDto;
//# sourceMappingURL=update-training-result.dto.js.map