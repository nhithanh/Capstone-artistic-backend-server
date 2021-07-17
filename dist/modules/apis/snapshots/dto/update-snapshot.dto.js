"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSnapshotDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_snapshot_dto_1 = require("./create-snapshot.dto");
class UpdateSnapshotDTO extends swagger_1.PartialType(create_snapshot_dto_1.CreateSnapshotDTO) {
}
exports.UpdateSnapshotDTO = UpdateSnapshotDTO;
//# sourceMappingURL=update-snapshot.dto.js.map