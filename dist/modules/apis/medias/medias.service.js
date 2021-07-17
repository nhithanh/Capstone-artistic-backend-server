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
exports.MediasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const media_entity_1 = require("./entities/media.entity");
const _ = require("lodash");
const s3_service_1 = require("../../../s3/s3.service");
const user_entity_1 = require("../users/entities/user.entity");
let MediasService = class MediasService {
    async checkUserAccessRight(user, photoId) {
        const photo = await this.mediaRepository.findOne({
            where: {
                id: photoId
            }
        });
        if (photo) {
            return photo.userId == user.id ? true : false;
        }
        throw new common_1.HttpException("Photo not found", common_1.HttpStatus.NOT_FOUND);
    }
    async create(createPhotoDTO) {
        return this.mediaRepository.save(createPhotoDTO);
    }
    async findAll(queryParams) {
        const page = queryParams['page'] || 0;
        const limit = queryParams['limit'] || 5;
        const skip = page * limit;
        const where = _.omit(queryParams, ['page', 'limit']);
        const [photos, count] = await this.mediaRepository.findAndCount({
            where,
            skip,
            take: limit,
            order: { createdAt: "DESC" }
        });
        const photosPublic = photos.map(photo => {
            const accessURL = this.s3Service.getCDNURL(photo.storageLocation);
            return Object.assign(Object.assign({}, photo), { accessURL });
        });
        return {
            metaData: {
                page,
                limit,
                totalPage: Math.ceil(count / limit)
            },
            photos: photosPublic
        };
    }
    async findOne(id) {
        return this.mediaRepository.findOne(id);
    }
    async movePhotoToAnotherAlbum(id, user, updateUploadImageDto) {
        const isHasRight = await this.checkUserAccessRight(user, id);
        if (isHasRight) {
            const albumId = updateUploadImageDto.albumId;
            const updatedPhoto = await this.findOne(id);
            return this.mediaRepository.save(Object.assign(Object.assign({}, updatedPhoto), { albumId }));
        }
        else {
            throw new common_1.HttpException({
                status: 401,
                msg: "Not have permission"
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async remove(user, id) {
        const isHasRight = await this.checkUserAccessRight(user, id);
        if (isHasRight) {
            const rs = await this.mediaRepository.softDelete(id);
            if (rs.affected > 0) {
                return {
                    id
                };
            }
        }
        else {
            throw new common_1.HttpException({
                status: 401,
                msg: "Not have permission"
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async findByAlbumId(albumId, limit) {
        let medias = [];
        let count = 0;
        if (limit !== null) {
            [medias, count] = await this.mediaRepository.findAndCount({
                where: { albumId },
                order: { createdAt: 'DESC' },
                take: limit,
            });
        }
        else {
            [medias, count] = await this.mediaRepository.findAndCount({
                where: { albumId },
                order: { createdAt: 'DESC' },
            });
        }
        return { count, medias };
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", s3_service_1.S3Service)
], MediasService.prototype, "s3Service", void 0);
__decorate([
    typeorm_1.InjectRepository(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], MediasService.prototype, "userRepository", void 0);
__decorate([
    typeorm_1.InjectRepository(media_entity_1.Media),
    __metadata("design:type", typeorm_2.Repository)
], MediasService.prototype, "mediaRepository", void 0);
MediasService = __decorate([
    common_1.Injectable()
], MediasService);
exports.MediasService = MediasService;
//# sourceMappingURL=medias.service.js.map