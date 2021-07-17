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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const hmacSHA512 = require("crypto-js/hmac-sha512");
const Base64 = require("crypto-js/enc-base64");
let User = class User {
    comparePassword(password) {
        const encryptPassword = Base64.stringify(hmacSHA512(password, process.env.PASSWORD_HASH_SECRET_KEY));
        return this.password === encryptPassword;
    }
    hashPassword() {
        if (this.password) {
            this.password = Base64.stringify(hmacSHA512(this.password, process.env.PASSWORD_HASH_SECRET_KEY));
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        unique: true,
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
        default: 'user'
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        unique: true,
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "defaultAlbumId", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false,
        select: false
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        default: ''
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({
        default: ''
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({
        type: 'date',
        default: new Date()
    }),
    __metadata("design:type", String)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "hashPassword", null);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map