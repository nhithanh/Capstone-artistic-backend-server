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
exports.TrainingRequest = exports.STATUS = void 0;
const typeorm_1 = require("typeorm");
var STATUS;
(function (STATUS) {
    STATUS["WAITING"] = "WAITING";
    STATUS["IN_PROGRESS"] = "IN PROGRESS";
    STATUS["STOPPED"] = "STOPPED";
    STATUS["COMPLETED"] = "COMPLETED";
    STATUS["DELETED"] = "DELETED";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
let TrainingRequest = class TrainingRequest {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], TrainingRequest.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        unique: false,
        nullable: false
    }),
    __metadata("design:type", String)
], TrainingRequest.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false
    }),
    __metadata("design:type", String)
], TrainingRequest.prototype, "referenceStyleLocation", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        unique: false,
        nullable: false
    }),
    __metadata("design:type", String)
], TrainingRequest.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        unique: false,
        default: 0.001
    }),
    __metadata("design:type", Number)
], TrainingRequest.prototype, "lr", void 0);
__decorate([
    typeorm_1.Column({
        type: 'integer',
        unique: false,
        default: 1000
    }),
    __metadata("design:type", Number)
], TrainingRequest.prototype, "saveStep", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        unique: false,
        default: 1e5
    }),
    __metadata("design:type", Number)
], TrainingRequest.prototype, "contentWeight", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        unique: false,
        default: 1e10
    }),
    __metadata("design:type", Number)
], TrainingRequest.prototype, "styleWeight", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        unique: false,
        default: 1.0
    }),
    __metadata("design:type", Number)
], TrainingRequest.prototype, "relu12Weight", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        unique: false,
        default: 1.0
    }),
    __metadata("design:type", Number)
], TrainingRequest.prototype, "relu22Weight", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        unique: false,
        default: 1.0
    }),
    __metadata("design:type", Number)
], TrainingRequest.prototype, "relu33Weight", void 0);
__decorate([
    typeorm_1.Column({
        type: 'float',
        unique: false,
        default: 1.0
    }),
    __metadata("design:type", Number)
], TrainingRequest.prototype, "relu43Weight", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false
    }),
    __metadata("design:type", String)
], TrainingRequest.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({
        type: 'integer',
        unique: false,
        default: 0
    }),
    __metadata("design:type", Number)
], TrainingRequest.prototype, "checkpoint", void 0);
__decorate([
    typeorm_1.Column({
        type: 'integer',
        unique: false,
        default: 20000
    }),
    __metadata("design:type", Number)
], TrainingRequest.prototype, "numOfIterations", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], TrainingRequest.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], TrainingRequest.prototype, "deletedAt", void 0);
TrainingRequest = __decorate([
    typeorm_1.Entity()
], TrainingRequest);
exports.TrainingRequest = TrainingRequest;
//# sourceMappingURL=training-request.entity.js.map