"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShowcaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_showcase_dto_1 = require("./create-showcase.dto");
class UpdateShowcaseDto extends swagger_1.PartialType(create_showcase_dto_1.CreateShowcaseDto) {
}
exports.UpdateShowcaseDto = UpdateShowcaseDto;
//# sourceMappingURL=update-showcase.dto.js.map