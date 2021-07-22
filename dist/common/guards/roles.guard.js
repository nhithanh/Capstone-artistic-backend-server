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
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_decorator_1 = require("../decorators/role.decorator");
let PermissionGuard = class PermissionGuard {
    async canActivate(context) {
        const requireRoles = this.reflector.getAllAndOverride(role_decorator_1.META_DATA_ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requireRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        throw new common_1.HttpException({
            statusCode: 403,
            message: `User with id: ${user.id} is not have ${requireRoles} role`,
        }, common_1.HttpStatus.FORBIDDEN);
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", core_1.Reflector)
], PermissionGuard.prototype, "reflector", void 0);
PermissionGuard = __decorate([
    common_1.Injectable()
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
//# sourceMappingURL=roles.guard.js.map