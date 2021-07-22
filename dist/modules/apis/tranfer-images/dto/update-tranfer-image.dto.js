"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTranferImageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_tranfer_image_dto_1 = require("./create-tranfer-image.dto");
class UpdateTranferImageDto extends swagger_1.PartialType(create_tranfer_image_dto_1.CreateTranferImageDto) {
}
exports.UpdateTranferImageDto = UpdateTranferImageDto;
//# sourceMappingURL=update-tranfer-image.dto.js.map