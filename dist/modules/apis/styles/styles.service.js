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
exports.StylesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const s3_service_1 = require("../../../s3/s3.service");
const typeorm_2 = require("typeorm");
const snapshot_entity_1 = require("../snapshots/entities/snapshot.entity");
const style_entity_1 = require("./entities/style.entity");
let StylesService = class StylesService {
    async create(createStyleDto) {
        return this.stylesRepository.save(createStyleDto);
    }
    async getAllStyles() {
        const data = await this.stylesRepository.find({
            order: {
                createdAt: 'DESC'
            }
        });
        return data.map(style => {
            return Object.assign(Object.assign({}, style), { iconURL: this.s3Service.getCDNURL(style.iconURL) });
        });
    }
    async findAll() {
        const data = await this.stylesRepository.find({
            where: {
                isActive: true
            },
            select: ['id', 'styleName', 'iconURL', 'routingKey']
        });
        return data.map(style => {
            return Object.assign(Object.assign({}, style), { iconURL: this.s3Service.getCDNURL(style.iconURL) });
        });
    }
    async findAllVideoSupportedStyles() {
        const data = await this.stylesRepository.find({
            where: {
                isActive: true,
                isSupportVideo: true
            },
            select: ['id', 'styleName', 'iconURL', 'routingKey', 'demoVideoURL']
        });
        return data.map(style => {
            return Object.assign(Object.assign({}, style), { iconURL: this.s3Service.getCDNURL(style.iconURL) });
        });
    }
    async findOne(id) {
        const style = await this.stylesRepository.findOne(id);
        return Object.assign(Object.assign({}, style), { iconURL: this.s3Service.getCDNURL(style.iconURL) });
    }
    async findStyleSnapshots(id) {
        return this.snapshotsRepository.find({
            where: {
                styleId: id
            },
            order: { createdAt: 'DESC' }
        });
    }
    update(id, updateStyleDto) {
        return this.stylesRepository.save(Object.assign({ id }, updateStyleDto));
    }
    async remove(id) {
        const rs = await this.stylesRepository.delete(id);
        if (rs.affected > 0) {
            return {
                id
            };
        }
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", s3_service_1.S3Service)
], StylesService.prototype, "s3Service", void 0);
__decorate([
    typeorm_1.InjectRepository(snapshot_entity_1.Snapshot),
    __metadata("design:type", typeorm_2.Repository)
], StylesService.prototype, "snapshotsRepository", void 0);
__decorate([
    typeorm_1.InjectRepository(style_entity_1.Style),
    __metadata("design:type", typeorm_2.Repository)
], StylesService.prototype, "stylesRepository", void 0);
StylesService = __decorate([
    common_1.Injectable()
], StylesService);
exports.StylesService = StylesService;
//# sourceMappingURL=styles.service.js.map