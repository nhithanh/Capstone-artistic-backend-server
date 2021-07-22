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
exports.AuthsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../modules/apis/users/entities/user.entity");
const users_service_1 = require("../modules/apis/users/users.service");
let AuthsService = class AuthsService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        return this.usersService.findByCredential(email, password);
    }
    async genToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            defaultAlbumId: user.defaultAlbumId
        };
        return {
            token: this.jwtService.sign(payload)
        };
    }
};
__decorate([
    common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService)),
    __metadata("design:type", users_service_1.UsersService)
], AuthsService.prototype, "usersService", void 0);
AuthsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthsService);
exports.AuthsService = AuthsService;
//# sourceMappingURL=auths.service.js.map