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
exports.SnapshotsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const snapshot_entity_1 = require("./entities/snapshot.entity");
let SnapshotsService = class SnapshotsService {
    async create(createSnapshotDTO) {
        return await this.snapshotRepository.save(createSnapshotDTO);
    }
    async findAll(queryParams) {
        const page = queryParams['page'] || 0;
        const limit = queryParams['limit'] || 5;
        const skip = page * limit;
        const where = _.omit(queryParams, ['page', 'limit']);
        const [snapshots, count] = await this.snapshotRepository.findAndCount({
            where: where,
            skip,
            take: limit,
            order: { createdAt: "DESC" }
        });
        return {
            metaData: {
                page,
                limit,
                totalPage: Math.ceil(count / limit)
            },
            data: snapshots
        };
    }
    async findOne(id) {
        return await this.snapshotRepository.findOne(id);
    }
    update(id, updateAiModelSnapshotDto) {
        return `This action updates a #${id} aiModelSnapshot`;
    }
    async remove(id) {
        const rs = await this.snapshotRepository.softDelete(id);
        if (rs.affected > 0) {
            return {
                id
            };
        }
    }
};
__decorate([
    typeorm_1.InjectRepository(snapshot_entity_1.Snapshot),
    __metadata("design:type", typeorm_2.Repository)
], SnapshotsService.prototype, "snapshotRepository", void 0);
SnapshotsService = __decorate([
    common_1.Injectable()
], SnapshotsService);
exports.SnapshotsService = SnapshotsService;
//# sourceMappingURL=snapshot.service.js.map