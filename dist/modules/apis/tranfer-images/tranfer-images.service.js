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
exports.TranferImagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tranfer_image_entity_1 = require("./entities/tranfer-image.entity");
let TranferImagesService = class TranferImagesService {
    async create(createTranferImageDto) {
        return this.tranferImageRepository.save(createTranferImageDto);
    }
    async findAll() {
        return this.tranferImageRepository.find();
    }
    async findOne(id) {
        return this.tranferImageRepository.findOne(id);
    }
    update(id, updateTranferImageDto) {
        return `This action updates a #${id} tranferImage`;
    }
    remove(id) {
        return `This action removes a #${id} tranferImage`;
    }
};
__decorate([
    typeorm_1.InjectRepository(tranfer_image_entity_1.TranferImage),
    __metadata("design:type", typeorm_2.Repository)
], TranferImagesService.prototype, "tranferImageRepository", void 0);
TranferImagesService = __decorate([
    common_1.Injectable()
], TranferImagesService);
exports.TranferImagesService = TranferImagesService;
//# sourceMappingURL=tranfer-images.service.js.map