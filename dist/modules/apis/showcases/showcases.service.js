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
exports.ShowcasesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const s3_service_1 = require("../../../s3/s3.service");
const typeorm_2 = require("typeorm");
const showcase_entity_1 = require("./entities/showcase.entity");
let ShowcasesService = class ShowcasesService {
    create(createShowcaseDto) {
        return this.showCaseRepository.save(createShowcaseDto);
    }
    async findAll(styleId) {
        const showCases = await this.showCaseRepository.find({
            where: {
                styleId
            },
            order: { priority: "ASC" },
            select: ['id', 'photoLocation', 'photoName']
        });
        const publicShowcases = showCases.map(showcase => {
            const accessURL = this.s3Service.getCDNURL(showcase.photoLocation);
            return Object.assign(Object.assign({}, showcase), { accessURL });
        });
        return publicShowcases;
    }
    findOne(id) {
        return this.showCaseRepository.findOne(id);
    }
    update(id, updateShowcaseDto) {
        return `This action updates a #${id} showcase`;
    }
    async remove(id) {
        const rs = await this.showCaseRepository.softDelete(id);
        if (rs.affected > 0) {
            return {
                id
            };
        }
    }
    async getAvailableStyles() {
        const connection = typeorm_2.getConnection();
        const query = "Select * from style where id in (Select style_id from showcase group by style_id having count(id) > 1) order by priority";
        const rs = await connection.query(query);
        return rs.map(style => {
            return Object.assign(Object.assign({}, style), { iconURL: this.s3Service.getCDNURL(style.icon_url) });
        });
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", s3_service_1.S3Service)
], ShowcasesService.prototype, "s3Service", void 0);
__decorate([
    typeorm_1.InjectRepository(showcase_entity_1.Showcase),
    __metadata("design:type", typeorm_2.Repository)
], ShowcasesService.prototype, "showCaseRepository", void 0);
ShowcasesService = __decorate([
    common_1.Injectable()
], ShowcasesService);
exports.ShowcasesService = ShowcasesService;
//# sourceMappingURL=showcases.service.js.map