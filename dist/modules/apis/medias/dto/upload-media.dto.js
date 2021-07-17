"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMediaDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_media_dto_1 = require("./create-media.dto");
class UpdateMediaDTO extends swagger_1.PartialType(create_media_dto_1.CreateMediaDTO) {
}
exports.UpdateMediaDTO = UpdateMediaDTO;
//# sourceMappingURL=upload-media.dto.js.map