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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const albums_service_1 = require("../albums/albums.service");
const user_entity_1 = require("./entities/user.entity");
const _ = require("lodash");
const generate_password_1 = require("generate-password");
const mail_service_1 = require("../../../mail/mail.service");
const auths_service_1 = require("../../../auths/auths.service");
let UsersService = class UsersService {
    async verifyEmailExist(email) {
        const user = await this.usersRepository.findOne({
            where: {
                email
            }
        });
        if (user) {
            return true;
        }
        return false;
    }
    async create(createUserDto) {
        const isEmailAlreadyExist = await this.verifyEmailExist(createUserDto.email);
        if (isEmailAlreadyExist) {
            throw new common_1.HttpException({
                status: 409,
                message: 'Email already taken!'
            }, common_1.HttpStatus.CONFLICT);
        }
        let newUser = this.usersRepository.create(createUserDto);
        newUser = await this.usersRepository.save(newUser);
        const newAlbum = await this.albumService.create({
            name: 'Default',
            userId: newUser.id
        });
        newUser.defaultAlbumId = newAlbum.id;
        return this.usersRepository.save(_.omit(newUser, ['password']));
    }
    async findByCredential(email, password) {
        console.log("Call");
        const user = await this.usersRepository.findOne({
            where: {
                email
            },
            select: ['password', "id", "email", "defaultAlbumId"]
        });
        if (!user) {
            return null;
        }
        const isPasswordMatch = user.comparePassword(password);
        if (!isPasswordMatch) {
            return null;
        }
        return user;
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findOne(id) {
        return await this.usersRepository.findOne({
            where: {
                id
            }
        });
    }
    async updateUserProfile(id, updateUserDto) {
        const updateUser = await this.findOne(id);
        return this.usersRepository.save(Object.assign(Object.assign({}, updateUser), updateUserDto));
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            },
            select: ['id', 'password']
        });
        const isPasswordMatch = user.comparePassword(oldPassword);
        if (!isPasswordMatch) {
            throw new common_1.HttpException({
                statusCode: 400,
                message: `Password not correct`,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        user.password = newPassword;
        return this.usersRepository.save(user);
    }
    async resetPassword(email) {
        const user = await this.usersRepository.findOne({
            email: email
        });
        if (user) {
            const newPassword = generate_password_1.generate({
                length: 10,
                numbers: true
            });
            user.password = newPassword;
            await this.usersRepository.save(user);
            await this.mailService.sendResetPasswordToUserMail(email, newPassword);
            return { "message": "reset password success" };
        }
        else {
            throw new common_1.HttpException({
                statusCode: 404,
                message: `Email not found!`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async handleGoogleLogin({ email, given_name, family_name }) {
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            const token = await this.authsService.genToken(user);
            return token;
        }
        let newUser = this.usersRepository.create({
            email,
            firstName: given_name,
            lastName: family_name,
        });
        newUser = await this.usersRepository.save(newUser);
        const newAlbum = await this.albumService.create({
            name: 'Default',
            userId: newUser.id
        });
        newUser.defaultAlbumId = newAlbum.id;
        newUser = await this.usersRepository.save(newUser);
        const token = await this.authsService.genToken(newUser);
        return token;
    }
};
__decorate([
    common_1.Inject(common_1.forwardRef(() => auths_service_1.AuthsService)),
    __metadata("design:type", auths_service_1.AuthsService)
], UsersService.prototype, "authsService", void 0);
__decorate([
    typeorm_1.InjectRepository(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], UsersService.prototype, "usersRepository", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", albums_service_1.AlbumsService)
], UsersService.prototype, "albumService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", mail_service_1.MailService)
], UsersService.prototype, "mailService", void 0);
UsersService = __decorate([
    common_1.Injectable()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map