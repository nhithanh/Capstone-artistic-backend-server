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
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const s3_service_1 = require("../../../s3/s3.service");
const typeorm_2 = require("typeorm");
const media_entity_1 = require("../medias/entities/media.entity");
const medias_service_1 = require("../medias/medias.service");
const album_entity_1 = require("./entities/album.entity");
let AlbumsService = class AlbumsService {
    async checkUserAccessRight(user, albumId) {
        const album = await this.albumRepository.findOne({
            where: {
                id: albumId
            }
        });
        if (album) {
            return album.userId == user.id ? true : false;
        }
        throw new common_1.HttpException("Album not found", common_1.HttpStatus.NOT_FOUND);
    }
    async create(createAlbumDto) {
        return this.albumRepository.save(Object.assign(Object.assign({}, createAlbumDto), { isDefault: true }));
    }
    async createNewAlbum(createAlbumDto, user) {
        return this.albumRepository.save(Object.assign(Object.assign({}, createAlbumDto), { userId: user.id }));
    }
    async findAll(user) {
        const query = `Select album.id, album.name, album.created_at, album.thumbnail_url, album.is_default, count(m.id) as total from album left join media m on album.id = m.album_id
    where album.user_id = '${user.id}' and album.deleted_at is null and m.deleted_at is null group by album.id, album.name, album.created_at, album.thumbnail_url`;
        const connection = typeorm_2.getConnection();
        const total = await this.albumRepository.count({
            where: {
                userId: user.id
            }
        });
        const rs = await connection.query(query);
        const data = rs.map(album => {
            return {
                id: album.id,
                name: album.name,
                isDefault: album.is_default,
                createdAt: album.created_at,
                thumbnailURL: album.thumbnail_url,
                total: album.total
            };
        });
        return {
            total,
            data
        };
    }
    async findOne(id) {
        const album = await this.albumRepository.findOne(id);
        let { count, medias } = await this.mediasService.findByAlbumId(album.id, null);
        medias = medias.map(media => {
            if (media.type === media_entity_1.MEDIA_TYPE.VIDEO) {
                return Object.assign(Object.assign({}, media), { thumbnailURL: this.s3Service.getCDNURL(media.storageLocation + "/thumbnail.png"), originalVideoURL: this.s3Service.getCDNURL(media.storageLocation + "/original.mp4"), m3u8_720p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/720p.m3u8"), m3u8_480p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/480p.m3u8"), m3u8_360p_playlsit: this.s3Service.getCDNURL(media.storageLocation + "/360p.m3u8") });
            }
            return Object.assign(Object.assign({}, media), { accessURL: this.s3Service.getCDNURL(media.storageLocation) });
        });
        return Object.assign(Object.assign({}, album), { count, medias });
    }
    async update(id, user, updateAlbumDto) {
        const isHasRight = await this.checkUserAccessRight(user, id);
        if (isHasRight) {
            const updateAlbum = await this.findOne(id);
            return this.albumRepository.save(Object.assign(Object.assign({}, updateAlbum), updateAlbumDto));
        }
        else {
            throw new common_1.HttpException({
                status: 401,
                msg: "Not have permission"
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async remove(id, user) {
        const isHasRight = await this.checkUserAccessRight(user, id);
        if (isHasRight) {
            const rs = await this.albumRepository.softDelete(id);
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
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", s3_service_1.S3Service)
], AlbumsService.prototype, "s3Service", void 0);
__decorate([
    typeorm_1.InjectRepository(album_entity_1.Album),
    __metadata("design:type", typeorm_2.Repository)
], AlbumsService.prototype, "albumRepository", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", medias_service_1.MediasService)
], AlbumsService.prototype, "mediasService", void 0);
AlbumsService = __decorate([
    common_1.Injectable()
], AlbumsService);
exports.AlbumsService = AlbumsService;
//# sourceMappingURL=albums.service.js.map