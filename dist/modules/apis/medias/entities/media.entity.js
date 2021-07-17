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
exports.Media = exports.MEDIA_TYPE = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const album_entity_1 = require("../../albums/entities/album.entity");
var MEDIA_TYPE;
(function (MEDIA_TYPE) {
    MEDIA_TYPE["PHOTO"] = "PHOTO";
    MEDIA_TYPE["VIDEO"] = "VIDEO";
})(MEDIA_TYPE = exports.MEDIA_TYPE || (exports.MEDIA_TYPE = {}));
let Media = class Media {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Media.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Media.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.User)
], Media.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null }),
    __metadata("design:type", String)
], Media.prototype, "albumId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => album_entity_1.Album),
    typeorm_1.JoinColumn(),
    __metadata("design:type", album_entity_1.Album)
], Media.prototype, "album", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false
    }),
    __metadata("design:type", String)
], Media.prototype, "storageLocation", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false
    }),
    __metadata("design:type", String)
], Media.prototype, "type", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Media.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Media.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", String)
], Media.prototype, "deletedAt", void 0);
Media = __decorate([
    typeorm_1.Entity()
], Media);
exports.Media = Media;
//# sourceMappingURL=media.entity.js.map