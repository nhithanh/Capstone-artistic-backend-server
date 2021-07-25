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
exports.Style = void 0;
const typeorm_1 = require("typeorm");
const snapshot_entity_1 = require("../../snapshots/entities/snapshot.entity");
let Style = class Style {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Style.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        unique: false,
        nullable: false
    }),
    __metadata("design:type", String)
], Style.prototype, "styleName", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true
    }),
    __metadata("design:type", String)
], Style.prototype, "iconURL", void 0);
__decorate([
    typeorm_1.Column({
        type: 'boolean',
        nullable: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], Style.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
        unique: false
    }),
    __metadata("design:type", String)
], Style.prototype, "activeSnapshotId", void 0);
__decorate([
    typeorm_1.OneToOne(() => snapshot_entity_1.Snapshot),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Promise)
], Style.prototype, "activeSnapshot", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        unique: false,
        nullable: true
    }),
    __metadata("design:type", String)
], Style.prototype, "routingKey", void 0);
__decorate([
    typeorm_1.Column({
        type: 'boolean',
        unique: false,
        nullable: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], Style.prototype, "isSupportVideo", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        unique: false,
        nullable: true,
    }),
    __metadata("design:type", String)
], Style.prototype, "demoVideoURL", void 0);
__decorate([
    typeorm_1.Column({
        type: 'integer',
        nullable: true
    }),
    __metadata("design:type", Number)
], Style.prototype, "priority", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Style.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Style.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], Style.prototype, "deletedAt", void 0);
Style = __decorate([
    typeorm_1.Entity()
], Style);
exports.Style = Style;
//# sourceMappingURL=style.entity.js.map