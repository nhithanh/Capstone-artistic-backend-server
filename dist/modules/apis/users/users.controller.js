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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const jwt_auth_guard_1 = require("../../../auths/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const update_user_dto_1 = require("./dto/update-user.dto");
const mail_service_1 = require("../../../mail/mail.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUserProfile(req) {
        return this.usersService.findOne(req.user.id);
    }
    updateUserProfile(req, updateUserDto) {
        return this.usersService.updateUserProfile(req.user.id, updateUserDto);
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    findAll() {
        return this.usersService.findAll();
    }
    getSelfInformation(req) {
        console.log("HERE baby");
        return req.user;
    }
    resetUserPassword() {
        this.mailService.sendResetPasswordToUserMail('nhithanhtranho@gmail.com', 'lalala123456').then(() => {
            return 'success';
        }).catch(err => console.log(err));
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    changeUserPassword(req, body) {
        const oldPassword = body['oldPassword'];
        const newPassword = body['newPassword'];
        return this.usersService.changePassword(req.user.id, oldPassword, newPassword);
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", mail_service_1.MailService)
], UsersController.prototype, "mailService", void 0);
__decorate([
    common_1.Get('/profile'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserProfile", null);
__decorate([
    common_1.Put("/profile"),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUserProfile", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/self'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getSelfInformation", null);
__decorate([
    common_1.Get('/reset-password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "resetUserPassword", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/change-password'),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "changeUserPassword", null);
UsersController = __decorate([
    swagger_1.ApiTags("users"),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map