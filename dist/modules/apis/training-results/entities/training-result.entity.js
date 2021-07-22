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
exports.TrainingResult = void 0;
const typeorm_1 = require("typeorm");
const training_request_entity_1 = require("../../training-requests/entities/training-request.entity");
let TrainingResult = class TrainingResult {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], TrainingResult.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'integer',
        nullable: false
    }),
    __metadata("design:type", Number)
], TrainingResult.prototype, "step", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false
    }),
    __metadata("design:type", String)
], TrainingResult.prototype, "trainingRequestId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => training_request_entity_1.TrainingRequest),
    typeorm_1.JoinColumn(),
    __metadata("design:type", training_request_entity_1.TrainingRequest)
], TrainingResult.prototype, "trainingRequest", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true
    }),
    __metadata("design:type", String)
], TrainingResult.prototype, "resultPhotoLocation", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true
    }),
    __metadata("design:type", String)
], TrainingResult.prototype, "snapshotLocation", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], TrainingResult.prototype, "createdAt", void 0);
TrainingResult = __decorate([
    typeorm_1.Entity()
], TrainingResult);
exports.TrainingResult = TrainingResult;
//# sourceMappingURL=training-result.entity.js.map